import cx from "classnames"
import { IconEditField } from "@com/icons"
import type { FC } from "react"

interface SectionActionsProps {
  changed: boolean
  disabled: boolean
  onSave: () => void
  onReset: () => void
  onCancel?: () => void
}
export const SectionActions: FC<SectionActionsProps> = ({
  changed,
  disabled,
  onSave,
  onReset,
  onCancel,
}) => {
  return (
    <div className={"field-group flex items-center justify-between"}>
      {!onCancel && (
        <div
          className={cx("prop-status invisible", {
            visible: changed,
          })}
        >
          <IconEditField size={16} />
          <span>Edited *</span>
        </div>
      )}
      <div>
        <button className={"btn btn-secondary"} onClick={onCancel}>
          Cancel
        </button>
      </div>
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
