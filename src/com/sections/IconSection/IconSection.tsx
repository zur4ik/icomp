import { useIconStore } from "@store/iconStore"
import { useEffect, useState } from "react"
import cx from "classnames"
import { NA } from "@root/cli/services/constants"
import { IconEditField } from "@com/icons"

export const IconSection = () => {
  const selectedIcons = useIconStore((st) => st.selectedIcons)

  const [value, setValue] = useState<string>("")
  const [keywords, setKeywords] = useState<string>("")
  const [valuePl, setValuePl] = useState("")

  const [disabled, setDisabled] = useState<boolean>(false)
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    setDisabled(selectedIcons.size === 0)

    switch (selectedIcons.size) {
      case 0:
        // No icon selected
        setValue("")
        setValuePl("Select icon to edit")
        setKeywords("")
        setDisabled(true)
        break
      case 1:
        // get selected icon data
        const iconName = Array.from(selectedIcons)[0]
        const icon = useIconStore.getState().getIcon(iconName)
        if (!icon) {
          setValue("")
          setValuePl("Select icon to edit")
          setDisabled(true)
          return
        }
        setValue(icon.file.replace(/\.svg$/, ""))
        setKeywords(icon.keywords || "")
        setDisabled(false)
        break
      default:
        setValuePl("Multiple icons selected")
        setValue("")
        setKeywords("")
        setDisabled(true)
        break
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
            placeholder={valuePl}
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
            value={keywords}
            placeholder={"N/A"}
            onChange={(ev) => {
              setKeywords(ev.target.value)
            }}
          />
        </div>
      </div>
      <div className={"field-group flex items-center justify-between"}>
        <div
          className={cx("prop-status invisible", {
            visible: changed,
          })}
        >
          <IconEditField size={16} />
          <span>Not saved</span>
        </div>
        <div className={"flex justify-end gap-8"}>
          <button className={"btn btn-secondary"} disabled={!changed}>
            Reset
          </button>
          <button className={"btn btn-primary"} disabled={!changed}>
            Save
          </button>
        </div>
      </div>
    </section>
  )
}
