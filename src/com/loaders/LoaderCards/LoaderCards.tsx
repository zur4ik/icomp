import cl from "./loader-cards.module.css"
import type { ComponentProps, FC } from "react"

type LoaderCardsProps = ComponentProps<"div"> & {
  size?: number
  show?: boolean
}
const LoaderCards: FC<LoaderCardsProps> = ({ show = true, size = 24, style, ...props }) => {
  if (!show) {
    return null
  }
  return (
    <div className={cl.loader} style={{ ...style, fontSize: size }} {...props}>
      <div />
      <div />
      <div />
    </div>
  )
}

export default LoaderCards
