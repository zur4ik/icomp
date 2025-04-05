import { useIconStore } from "@store/iconStore"
import { useCallback, useEffect, useMemo, useState } from "react"
import cx from "classnames"
import { IconAlertTriangleSolid, IconEditField, IconInfoCircleSolid } from "@com/icons"
import { Tooltip } from "react-tooltip"
import { cleanFileName, cleanKeywords, getIconName } from "@root/shared"

interface SectionState {
  name: string
  initName: string
  keywords: string
  initKeywords: string
  placeholder: string
  disabled: boolean
}

export const IconSection = () => {
  const selectedIcons = useIconStore((st) => st.selectedIcons)
  const renameIcon = useIconStore((st) => st.renameIcon)
  const icons = useIconStore((st) => st.icons)

  const [state, setState] = useState<SectionState>({
    name: "",
    initName: "",
    keywords: "",
    initKeywords: "",
    placeholder: "Select icon to edit",
    disabled: true,
  })

  const changed = useMemo(() => {
    return (
      selectedIcons.size === 1 &&
      (state.name !== state.initName || cleanKeywords(state.keywords) !== state.initKeywords)
    )
  }, [selectedIcons.size, state.initKeywords, state.initName, state.keywords, state.name])

  const wrongName = useMemo(() => {
    const fileName = state.name + ".svg"
    const iconName = getIconName(state.name)

    if (state.name === state.initName) {
      return false
    }
    return icons.some((icon) => icon.file === fileName || icon.name === iconName)
  }, [icons, state.initName, state.name])

  const saveDisabled = useMemo(() => {
    if (!changed || state.name === "") return true
    if (wrongName) return true
    return cleanKeywords(state.keywords) === state.initKeywords && state.initKeywords !== ""
  }, [changed, state.initKeywords, state.keywords, state.name, wrongName])

  const handleSave = useCallback(() => {
    renameIcon(state.initName, state.name, state.keywords).catch((err) => {
      console.error("Error renaming icon:", err)
    })
  }, [renameIcon, state.initName, state.keywords, state.name])

  useEffect(() => {
    const updateState = () => {
      const size = selectedIcons.size

      switch (size) {
        case 0:
          setState({
            name: "",
            initName: "",
            keywords: "",
            initKeywords: "",
            placeholder: "Select icon to edit",
            disabled: true,
          })
          break
        case 1:
          const iconName = Array.from(selectedIcons)[0]
          const icon = useIconStore.getState().getIcon(iconName)

          if (!icon) {
            setState({
              name: "",
              initName: "",
              keywords: "",
              initKeywords: "",
              placeholder: "Select icon to edit",
              disabled: true,
            })
            return
          }

          const name = icon.file.replace(/\.svg$/, "")
          const keywords = icon.keywords || ""

          setState({
            name: name,
            initName: name,
            keywords: keywords,
            initKeywords: keywords,
            placeholder: "Enter icon name",
            disabled: false,
          })
          break
        default:
          setState({
            name: "",
            initName: "",
            keywords: "",
            initKeywords: "",
            placeholder: "Multiple icons selected",
            disabled: true,
          })
          break
      }
    }
    updateState()
  }, [selectedIcons])

  return (
    <section className={"flex flex-col gap-20 border-b-1 border-b-gray-200 p-10"}>
      <div className={"field-group"}>
        <Tooltip id={"file-name-info"}>
          <p className={"text-xs"}>
            <span className={"font-bold"}>File Name</span> will be used as the component name.
          </p>
        </Tooltip>
        <div className={"section-title flex items-center gap-5 pb-3 pl-2"}>
          File Name
          <IconInfoCircleSolid
            size={10}
            tabIndex={-1}
            className={"-mt-1 focus:outline-none"}
            data-tooltip-id={"file-name-info"}
          />
        </div>
        <div
          className={cx("input-outer flex items-center gap-5 rounded-md bg-gray-100 px-10 py-8", {
            disabled: state.disabled,
            error: wrongName,
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
                name: cleanFileName(ev.target.value),
              }))
            }}
          />
          {!state.disabled && <div className={"font-mono text-xs text-gray-600"}>.svg</div>}
        </div>
        <div
          className={cx("mt-5 items-center gap-3 p-3 text-xs text-red-500", {
            hidden: !wrongName,
            flex: wrongName,
          })}
        >
          <IconAlertTriangleSolid size={10} className={"-mt-1"} />
          <span className={"font-bold"}>File</span> or
          <span className={"font-bold"}>Component</span> name must be unique.
        </div>
      </div>
      <div className={"field-group"}>
        <Tooltip id={"keywords-info"}>
          <p className={"text-xs"}>
            <span className={"font-bold"}>Keywords</span> will be used for searching.
          </p>
        </Tooltip>
        <div className={"section-title flex items-center gap-5 pb-3 pl-2"}>
          Keywords
          <IconInfoCircleSolid
            size={10}
            tabIndex={-1}
            className={"-mt-1 focus:outline-none"}
            data-tooltip-id={"keywords-info"}
          />
        </div>
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
        <div
          className={cx("prop-status invisible", {
            visible: changed,
          })}
        >
          <IconEditField size={16} />
          <span>Edited *</span>
        </div>
        <div className={"flex justify-end gap-8"}>
          <button
            className={"btn btn-secondary"}
            disabled={!changed}
            onClick={() => {
              setState((prev) => ({
                ...prev,
                name: prev.initName,
                keywords: prev.initKeywords,
              }))
            }}
          >
            Reset
          </button>
          <button className={"btn btn-primary"} disabled={saveDisabled} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </section>
  )
}
