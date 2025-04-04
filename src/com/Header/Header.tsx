import type { FC } from "react"
import { version } from "@root/package.json"

export const Header: FC = () => {
  return (
    <header className={"flex items-center justify-between border-b border-b-gray-200 p-16"}>
      <div className={"mt-2 flex items-center gap-10"}>
        <h1 className="group cursor-pointer text-2xl font-bold">
          <span className={"text-gray-400 group-hover:text-red-500"}>{"<"}</span>
          icomp
          <span className={"text-gray-400 group-hover:text-red-500"}>{"/>"}</span>
        </h1>
        <a
          href={"https://github.com/zur4ik/icomp/releases/tag/v" + version}
          target={"_blank"}
          className={
            "text-xxs mt-3 inline-block rounded-full bg-gray-200 px-6 py-2 font-mono hover:bg-gray-300"
          }
        >
          {version}
        </a>
      </div>

      <div>(tools)</div>
    </header>
  )
}
