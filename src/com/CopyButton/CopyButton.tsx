import { type FC, useId, useState } from "react"
import { IconCopy } from "@com/icons"
import cx from "classnames"
import { Tooltip } from "react-tooltip"

interface CopyButtonProps {
  value: string
  size?: number
  className?: string
}
const CopyButton: FC<CopyButtonProps> = ({ value, size = 16, className }) => {
  const tooltipId = useId()
  const [tipText, setTipText] = useState("Copy")
  return (
    <div>
      <Tooltip
        id={tooltipId}
        place={"left"}
        className={"tooltip tooltip-sm"}
        afterHide={() => setTipText("Copy")}
      >
        {tipText}
      </Tooltip>
      <div
        data-tooltip-id={tooltipId}
        className={cx("text-gray-500 hover:text-gray-700", className)}
        onClick={async () => {
          await navigator.clipboard.writeText(value)
          setTipText("Copied")
        }}
      >
        <IconCopy size={size} />
      </div>
    </div>
  )
}
export default CopyButton
