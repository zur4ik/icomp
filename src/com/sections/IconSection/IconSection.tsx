import { useIconStore } from "@store/iconStore"
import { useEffect, useState } from "react"
import cx from "classnames"
import { NA } from "@root/cli/services/constants"

export const IconSection = () => {
  const selectedIcons = useIconStore((st) => st.selectedIcons)

  const [value, setValue] = useState<string>("")
  const [keyWords, setKeyWords] = useState("")
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    setDisabled(selectedIcons.size === 0)

    if (selectedIcons.size === 1) {
      const iconName = Array.from(selectedIcons)[0]
      const icon = useIconStore.getState().getIcon(iconName)
      if (!icon) {
        setValue(NA)
        setDisabled(true)
        return
      }
      setValue(icon.file.replace(/\.svg$/, ""))
      setKeyWords(icon.keywords?.join(" ") || "")
    }

    if (selectedIcons.size === 0) {
      setValue("Select icon to edit")
      setKeyWords(NA)
      setDisabled(true)
    }

    if (selectedIcons.size > 1) {
      setValue("Multiple icons selected")
      setKeyWords(NA)
      setDisabled(true)
      return
    }
  }, [selectedIcons])

  return (
    <section className={"flex flex-col gap-20 border-b-1 border-b-gray-200 p-10"}>
      <div className={"field-group"}>
        <div className={"section-title pb-3 pl-2"}>File Name</div>
        <div
          className={cx("input-outer flex items-center gap-5 rounded-md bg-gray-100 px-10 py-8", {
            disabled: disabled,
          })}
        >
          <input
            type="text"
            className={cx("input grow font-mono text-xs text-gray-600 focus:outline-none", {
              disabled: !disabled,
            })}
            disabled={disabled}
            value={value}
            onChange={(ev) => {
              setValue(ev.target.value)
            }}
          />
          {!disabled && <div className={"font-mono text-xs text-gray-600"}>.svg</div>}
        </div>
      </div>
      <div className={"field-group"}>
        <div className={"section-title pb-3 pl-2"}>Keywords</div>
        <div
          className={cx("input-outer flex items-center gap-5 rounded-md bg-gray-100 px-10 py-8", {
            disabled: disabled,
          })}
        >
          <textarea
            className={cx(
              "input grow resize-none font-mono text-xs text-gray-600 focus:outline-none",
              {
                disabled: !disabled,
              },
            )}
            rows={3}
            disabled={disabled}
            value={keyWords}
            onChange={(ev) => {
              setKeyWords(ev.target.value)
            }}
          />
        </div>
      </div>
    </section>
  )
}
