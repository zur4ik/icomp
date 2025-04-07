import { useState, useEffect, useRef } from "react"
import { cleanFileName, cleanKeywords, validateSvg } from "@root/shared"
import { useAppStore } from "@store/appStore"
import { FILE_HANDLER_MODAL } from "@com/modals"

export function DropZone({ onDropFile }: { onDropFile: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const dragCounter = useRef(0)
  const openModal = useAppStore((state) => state.openModal)

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      dragCounter.current++
      setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      dragCounter.current--
      if (dragCounter.current === 0) setIsDragging(false)
    }

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault()
      dragCounter.current = 0
      setIsDragging(false)
      const file = e.dataTransfer?.files?.[0]
      if (file && file.type === "image/svg+xml") {
        const content = await file.text()
        try {
          // Validate the SVG content
          validateSvg(content)

          const name = cleanFileName(file.name.replace(/\.svg$/, ""))
          const rawKeywords = content.match(/<desc>(.*?)<\/desc>/)?.[1] || ""
          const keywords = cleanKeywords(rawKeywords)
          // open file handler modal
          openModal(FILE_HANDLER_MODAL, {
            name: name,
            keywords: keywords,
            svg: content,
          })
        } catch (error) {
          console.error("Invalid SVG file:", error)
        }
      }
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault() // Required to allow drop
    }

    window.addEventListener("dragenter", handleDragEnter)
    window.addEventListener("dragleave", handleDragLeave)
    window.addEventListener("drop", handleDrop)
    window.addEventListener("dragover", handleDragOver)

    return () => {
      window.removeEventListener("dragenter", handleDragEnter)
      window.removeEventListener("dragleave", handleDragLeave)
      window.removeEventListener("drop", handleDrop)
      window.removeEventListener("dragover", handleDragOver)
    }
  }, [onDropFile, openModal])

  if (!isDragging) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-5 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <div className="pointer-events-auto p-8 text-center">
        <p className="text-lg font-semibold">Drop your SVG here to import</p>
      </div>
    </div>
  )
}
