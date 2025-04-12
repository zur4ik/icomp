import { type FC, type SyntheticEvent, useEffect } from "react"
import { Icon } from "@com/Icon"
import { useIconStore } from "@store/iconStore"
import { IconNameSection } from "@com/sections"
import { IconInfoSection } from "@com/sections/IconInfoSection/IconInfoSection"
import GenerateButton from "@com/GenerateButton/GenerateButton"
import { DropZone } from "@com/DropZone/DropZone"
import Modals from "@com/modals/Modals"
import { IconMascot } from "@com/icons"
import ClipboardHandler from "@com/ClipboardHandler/ClipboardHandler"

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
      {icons.length === 0 && (
        <div className={"flex w-full flex-col items-center justify-center"}>
          <div className={"text-slate-600"}>
            <IconMascot size={64} />
          </div>
          <h2 className={"mt-20 text-xl text-slate-600"}>You have not imported any icon yet</h2>
          <h3 className={"text-md mt-5 text-slate-400"}>
            Drag&Drop svg files here or paste them into input folder
          </h3>
        </div>
      )}
      {icons.length > 0 && (
        <main
          className={"grid-cols-auto-60 grid grow content-start gap-10 p-10"}
          onClick={deselectHandler}
        >
          {icons.map((icon) => (
            <Icon icon={icon} size={size} key={icon.name} />
          ))}
        </main>
      )}
      <aside className={"mini-scroll flex w-300 flex-col border-l-1 border-l-gray-200"}>
        <div className={"panel-head"}>Properties</div>
        <div className={"h-0 min-h-200 shrink grow overflow-y-auto"}>
          <IconNameSection />
          <IconInfoSection />
        </div>
        <GenerateButton />
      </aside>
      <DropZone onDropFile={() => {}} />
      <ClipboardHandler />
      <Modals />
    </div>
  )
}
