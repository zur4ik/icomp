import type { FC, PropsWithChildren } from "react"

export const FieldTitle: FC<PropsWithChildren> = ({ children }) => (
  <div className={"section-title flex items-center gap-5 pb-3 pl-2"}>{children}</div>
)
