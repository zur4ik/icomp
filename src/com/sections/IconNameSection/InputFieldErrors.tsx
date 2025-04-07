import cx from "classnames"
import { IconAlertTriangleSolid } from "@com/icons"
import type { ComponentProps, FC, ReactNode } from "react"

type InputFieldErrorsProps = ComponentProps<"div"> & {
  visible: boolean
  children?: ReactNode
  className?: string
}
export const InputFieldErrors: FC<InputFieldErrorsProps> = ({
  visible,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cx(`mt-5 items-center gap-5 p-3 text-xs text-red-500 ${className ?? ""}`, {
        hidden: !visible,
        flex: visible,
      })}
      {...props}
    >
      <IconAlertTriangleSolid size={10} className={"-mt-1"} />
      <div>{children}</div>
    </div>
  )
}
