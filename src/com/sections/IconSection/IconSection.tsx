import { useIconStore } from "@store/iconStore"
import { useEffect, useState } from "react"
import cx from "classnames"
import { IconEditField } from "@com/icons"

interface SectionState {
  name: string
  keywords: string
  placeholder: string
  disabled: boolean
  changed: boolean
}

export const IconSection = () => {
  const selectedIcons = useIconStore((st) => st.selectedIcons)

  const [state, setState] = useState<SectionState>({
    name: "",
    keywords: "",
    placeholder: "Select icon to edit",
    disabled: true,
    changed: false,
  })

  useEffect(() => {
    const updateState = () => {
      const size = selectedIcons.size

      switch (size) {
        case 0:
          setState({
            name: "",
            keywords: "",
            placeholder: "Select icon to edit",
            disabled: true,
            changed: false,
          })
          break
        case 1:
          const iconName = Array.from(selectedIcons)[0]
          const icon = useIconStore.getState().getIcon(iconName)
          if (!icon) {
            setState({
              name: "",
              keywords: "",
              placeholder: "Select icon to edit",
              disabled: true,
              changed: false,
            })
            return
          }
          setState({
            name: icon.file.replace(/\.svg$/, ""),
            keywords: icon.keywords || "",
            placeholder: "Enter icon name",
            disabled: false,
            changed: false,
          })
          break
        default:
          setState({
            name: "",
            keywords: "",
            placeholder: "Multiple icons selected",
            disabled: true,
            changed: false,
          })
          break
      }
    }

    updateState()
  }, [selectedIcons])

  return (
    <section className={"flex flex-col gap-20 border-b-1 border-b-gray-200 p-10"}>
      <div className={"field-group"}>
        <div className={"section-title pb-3 pl-2"}>File Name</div>
        <div
          className={cx("input-outer flex items-center gap-5 rounded-md bg-gray-100 px-10 py-8", {
            disabled: state.disabled,
          })}
        >
          <input
            type="text"
            className={cx("input grow font-mono text-xs text-gray-600 focus:outline-none", {
              disabled: !state.disabled,
            })}
            disabled={state.disabled}
            value={state.name}
            placeholder={state.placeholder}
            onChange={(ev) => {
              setState((prev) => ({
                ...prev,
                name: ev.target.value,
              }))
            }}
          />
          {!state.disabled && <div className={"font-mono text-xs text-gray-600"}>.svg</div>}
        </div>
      </div>
      <div className={"field-group"}>
        <div className={"section-title pb-3 pl-2"}>Keywords</div>
        <div
          className={cx("input-outer flex items-center gap-5 rounded-md bg-gray-100 px-10 py-8", {
            disabled: state.disabled,
          })}
        >
          <textarea
            className={cx(
              "input grow resize-none font-mono text-xs text-gray-600 focus:outline-none",
              {
                disabled: !state.disabled,
              },
            )}
            rows={3}
            disabled={state.disabled}
            value={state.keywords}
            placeholder={"N/A"}
            onChange={(ev) => {
              setState((prev) => ({
                ...prev,
                keywords: ev.target.value,
              }))
            }}
          />
        </div>
      </div>
      <div className={"field-group flex items-center justify-between"}>
        <div className={cx("prop-status invisible")}>
          <IconEditField size={16} />
          <span>Not saved</span>
        </div>
        <div className={"flex justify-end gap-8"}>
          <button className={"btn btn-secondary"} disabled={!state.changed}>
            Reset
          </button>
          <button className={"btn btn-primary"} disabled={!state.changed}>
            Save
          </button>
        </div>
      </div>
    </section>
  )
}
