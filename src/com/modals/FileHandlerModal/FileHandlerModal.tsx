import { InputFieldGroup } from "@com/sections/IconNameSection/InputFieldGroup"
import { SectionActions } from "@com/sections/IconNameSection/SectionActions"
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cleanFileName, cleanKeywords, getIconName } from "@root/shared"
import { useIconStore } from "@store/iconStore"
import { InputFieldErrors } from "@com/sections/IconNameSection/InputFieldErrors"
import { useAppStore } from "@store/appStore"
import { FILE_HANDLER_MODAL, type ModalCommonProps } from "@com/modals"
import Modal from "@ui/Modal/Modal"

const FileHandlerModal: FC<ModalCommonProps> = ({ show = false }) => {
  const icons = useIconStore((state) => state.icons)
  const importIcons = useIconStore((state) => state.importIcons)
  const closeModal = useAppStore((state) => state.closeModal)
  const modalData = useAppStore((state) => state.modalData?.[FILE_HANDLER_MODAL])

  const [state, setState] = useState({
    name: "",
    initName: "",
    keywords: "",
    initKeywords: "",
  })
  const listenerRef = useRef<((ev: KeyboardEvent) => void) | null>(null)

  const changed = useMemo(
    () => state.name !== state.initName || cleanKeywords(state.keywords) !== state.initKeywords,
    [state.initKeywords, state.initName, state.keywords, state.name],
  )

  const handleName = useCallback((value: string) => {
    setState((prev) => ({ ...prev, name: cleanFileName(value) }))
  }, [])

  const handleKeywords = useCallback((value: string) => {
    setState((prev) => ({ ...prev, keywords: value }))
  }, [])

  const handleReset = useCallback(() => {
    setState((prev) => ({ ...prev, name: state.initName, keywords: state.initKeywords }))
  }, [state.initKeywords, state.initName])

  const handleClose = useCallback(() => {
    closeModal(FILE_HANDLER_MODAL)
  }, [closeModal])

  const handleSave = useCallback(async () => {
    if (modalData?.svg) {
      await importIcons([{ name: state.name, keywords: state.keywords, content: modalData.svg }])
    }
    handleClose()
  }, [handleClose, importIcons, modalData, state.keywords, state.name])

  const error = useMemo(() => {
    // check if file name or icon name already exists
    const fileName = state.name + ".svg"
    const iconName = getIconName(state.name)
    if (state.name === state.initName) {
      return false
    }
    return icons.some((icon) => icon.file === fileName || icon.name === iconName)
  }, [icons, state.initName, state.name])

  const disabled = useMemo(() => {
    return !changed || error || state.name.length < 3
  }, [changed, error, state.name.length])

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      name: modalData?.name || "",
      keywords: modalData?.keywords || "",
    }))
  }, [modalData?.keywords, modalData?.name])

  useEffect(() => {
    listenerRef.current = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        handleClose()
      }
    }

    // add event listener for esc key
    document.addEventListener("keydown", listenerRef.current)

    // cleanup
    return () => {
      if (listenerRef.current) {
        document.removeEventListener("keydown", listenerRef.current)
      }
    }
  }, [handleClose])

  if (!modalData?.svg || !show) {
    return null
  }

  return (
    <Modal name={FILE_HANDLER_MODAL}>
      <Modal.Title>Import SVG</Modal.Title>
      <Modal.Content>
        <div className={"flex flex-col gap-20"}>
          <div className={"flex items-center justify-center pt-20 pb-10"}>
            <div className={"icon inline-flex !size-72 items-center justify-center"}>
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(modalData.svg || "")}`}
                alt={"Icon"}
                className={"size-48"}
              />
            </div>
          </div>
          <div>
            <InputFieldGroup
              label={"Icon Name"}
              value={state.name}
              placeholder={"Enter icon name"}
              error={error}
              onChange={handleName}
              inputProps={{
                type: "text",
              }}
              suffix={<div className={"font-mono text-xs text-gray-600"}>.svg</div>}
            />
            <InputFieldErrors visible={error}>
              <b>File</b> or <b>Component</b> with name <b>{getIconName(state.name)}</b> already
              exists.
            </InputFieldErrors>
          </div>
          <InputFieldGroup
            label={"Keywords"}
            value={state.keywords}
            placeholder={"Enter space separated keywords"}
            onChange={handleKeywords}
            inputProps={{
              as: "textarea",
              resize: "none",
              rows: 3,
            }}
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <SectionActions
          changed={changed}
          disabled={disabled}
          onSave={handleSave}
          onReset={handleReset}
          onCancel={handleClose}
        />
      </Modal.Footer>
    </Modal>
  )
}
export default FileHandlerModal
