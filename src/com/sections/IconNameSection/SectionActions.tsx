import cx from "classnames"
import { IconEditField } from "@com/icons"
import type { FC } from "react"
import { REMOVE_FILE_MODAL } from "@com/modals"
import { useAppStore } from "@store/appStore"

interface SectionActionsProps {
  changed: boolean
  disabled: boolean
  onSave: () => void
  onReset: () => void
  onCancel?: () => void
  removeEnabled?: boolean
  onRemove?: () => void
}
export const SectionActions: FC<SectionActionsProps> = ({
  changed,
  disabled,
  onSave,
  onReset,
  onCancel,
  removeEnabled = false,
  onRemove,
}) => {
  const openModal = useAppStore((state) => state.openModal)
  return (
    <div className={"field-group flex w-full items-center justify-between"}>
      {!!onRemove && (
        <div>
          <button
            className={"btn btn-danger"}
            onClick={() => {
              openModal(REMOVE_FILE_MODAL)
            }}
            disabled={!removeEnabled}
          >
            Remove
          </button>
        </div>
      )}
      {!onCancel && (
        <div
          className={cx("prop-status invisible justify-self-start", {
            visible: changed,
          })}
        >
          <IconEditField size={16} />
          <span>Edited *</span>
        </div>
      )}

      {!!onCancel && (
        <div>
          <button className={"btn btn-secondary"} onClick={onCancel}>
            Cancel
          </button>
        </div>
      )}
      <div className={"flex justify-end gap-8"}>
        <button className={"btn btn-secondary"} disabled={!changed} onClick={onReset}>
          Reset
        </button>
        <button className={"btn btn-primary"} disabled={disabled} onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  )
}
