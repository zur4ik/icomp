import cx from "classnames"
import { IconAlertTriangleSolid } from "@com/icons"
import type { FC, ReactNode } from "react"

interface InputFieldErrorsProps {
  visible: boolean
  children?: ReactNode
}
export const InputFieldErrors: FC<InputFieldErrorsProps> = ({ visible, children }) => {
  return (
    <div
      className={cx("mt-5 items-center gap-3 p-3 text-xs text-red-500", {
        hidden: !visible,
        flex: visible,
      })}
    >
      <IconAlertTriangleSolid size={10} className={"-mt-1"} />
      {children}
    </div>
  )
}
