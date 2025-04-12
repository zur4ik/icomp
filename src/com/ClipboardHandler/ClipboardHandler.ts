import { useEffect } from "react"
import { cleanKeywords, validateSvg } from "@root/shared"
import { useAppStore } from "@store/appStore"
import { FILE_HANDLER_MODAL } from "@com/modals"
import importFileHandler from "@services/importFileHandler"

const ClipboardHandler = () => {
  const openModal = useAppStore((state) => state.openModal)
  useEffect(() => {
    const pasteHandler = async (ev: ClipboardEvent) => {
      const textPlain = ev.clipboardData?.getData("text/plain")?.trim()
      const textHtml = ev.clipboardData?.getData("text/html")?.trim()
      const textSvg = ev.clipboardData?.getData("image/svg+xml")?.trim()
      const file = ev.clipboardData?.files?.[0]

      const content = textPlain || textHtml || textSvg || ""

      // if content is empty and file is pasted
      if (!content && file) {
        const fileData = await importFileHandler(file)
        if (fileData) {
          openModal(FILE_HANDLER_MODAL, fileData)
        }
        return
      }

      // check if pasted content is svg
      if (!validateSvg(content, true)) {
        return false
      }

      // check if svg has desc tag
      const descTag = content.match(/<desc>(.*?)<\/desc>/)
      let keywords = ""
      if (descTag) {
        keywords = cleanKeywords(descTag[1])
      }

      // open file handler modal
      openModal(FILE_HANDLER_MODAL, {
        name: "",
        keywords: keywords,
        svg: content,
      })
    }

    // add event listener
    window.addEventListener("paste", pasteHandler)

    // clean
    return () => {
      window.removeEventListener("paste", pasteHandler)
    }
  }, [openModal])
  return null
}

export default ClipboardHandler
