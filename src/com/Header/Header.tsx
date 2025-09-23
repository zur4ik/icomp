import type { ChangeEvent, FC } from "react"
import { version } from "@root/package.json"
import { useAppStore } from "@store/appStore"

export const Header: FC = () => {
  const search = useAppStore((s) => s.search)
  const setSearch = useAppStore((s) => s.setSearch)

  return (
    <header className={"flex items-center justify-between gap-92 border-b border-b-gray-200 p-16"}>
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

      <div className={"flex-1"}>
        <input
          type="text"
          className={
            "h-35 w-full rounded-[6px] bg-gray-50 px-10 text-sm ring-1 ring-gray-200 focus:ring-gray-400 focus:outline-none"
          }
          placeholder={"Search"}
          value={search}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => {
            setSearch(ev.target.value)
          }}
        />
      </div>
    </header>
  )
}
