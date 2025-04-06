import type { FC, PropsWithChildren } from "react"

const Section: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className={"flex flex-col gap-20 border-b-1 border-b-gray-200 p-10"}>
      {children}
    </section>
  )
}

export default Section
