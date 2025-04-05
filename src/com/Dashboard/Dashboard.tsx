import { type FC, type SyntheticEvent, useEffect } from "react"
import { Icon } from "@com/Icon"
import { useIconStore } from "@store/iconStore"
import { IconSection } from "@com/sections/IconSection"

export const Dashboard: FC = () => {
  const size = 24
  const fetchIcons = useIconStore((s) => s.fetchIcons)
  const icons = useIconStore((state) => state.icons)
  const clearSelection = useIconStore((state) => state.clearSelection)

  const deselectHandler = (ev: SyntheticEvent) => {
    // clear selection if clicked outside the icon
    const target = ev.target as HTMLElement
    if (target.tagName === "MAIN") {
      clearSelection()
    }
  }

  // Fetch icons from the server
  useEffect(() => {
    fetchIcons().then()
  }, [fetchIcons])

  return (
    <div className={"flex grow"}>
      <main
        className={"grid-cols-auto-60 grid grow content-start gap-10 p-10"}
        onClick={deselectHandler}
      >
        {icons.map((icon) => (
          <Icon icon={icon} size={size} key={icon.name} />
        ))}
      </main>
      <aside className={"w-300 border-l-1 border-l-gray-200"}>
        <div className={"panel-head"}>Properties</div>
        <div>
          <IconSection />
        </div>
      </aside>
    </div>
  )
}
