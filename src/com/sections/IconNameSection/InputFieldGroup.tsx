import { Tooltip } from "react-tooltip"
import { IconAlertTriangleSolid, IconInfoCircleSolid } from "@com/icons"
import cx from "classnames"
import type { FC, InputHTMLAttributes, ReactNode } from "react"

interface InputFieldGroupProps {
  label: string
  tooltip: string | ReactNode
  value: string
  disabled: boolean
  placeholder: string
  onChange: (val: string) => void
  error?: boolean
  suffix?: ReactNode
  inputProps: InputHTMLAttributes<unknown> & {
    as?: "textarea"
    rows?: number
    resize?: "none" | "both" | "horizontal" | "vertical"
  }
}

export const InputFieldGroup: FC<InputFieldGroupProps> = ({
  label,
  tooltip,
  value,
  disabled,
  placeholder,
  onChange,
  error,
  suffix,
  inputProps,
}) => {
  const Input = inputProps.as === "textarea" ? "textarea" : "input"
  return (
    <div className={"field-group"}>
      <Tooltip id={label}>
        <p className={"text-xs"}>
          <span className={"font-bold"}>{label}</span> {tooltip}
        </p>
      </Tooltip>
      <div className={"section-title flex items-center gap-5 pb-3 pl-2"}>
        {label}
        <IconInfoCircleSolid
          size={10}
          tabIndex={-1}
          className={"-mt-1 focus:outline-none"}
          data-tooltip-id={label}
        />
      </div>
      <div
        className={cx("input-outer flex items-center gap-5 rounded-md bg-gray-100 px-10 py-8", {
          disabled: disabled,
          error: error,
        })}
      >
        <Input
          {...inputProps}
          className={cx("input grow font-mono text-xs text-gray-600 focus:outline-none", {
            disabled,
            "resize-none": inputProps.resize === "none",
          })}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={(ev) => onChange(ev.target.value)}
        />
        {suffix}
      </div>
    </div>
  )
}
