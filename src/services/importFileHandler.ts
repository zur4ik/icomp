import { cleanFileName, cleanKeywords, validateSvg } from "@root/shared"
import type { ModalData } from "@com/modals"

const importFileHandler = async (file: File | undefined): Promise<ModalData | undefined> => {
  if (file && file.type === "image/svg+xml") {
    const content = await file.text()
    try {
      // Validate the SVG content
      validateSvg(content)

      const name = cleanFileName(file.name.replace(/\.svg$/, ""))
      const rawKeywords = content.match(/<desc>(.*?)<\/desc>/)?.[1] || ""
      const keywords = cleanKeywords(rawKeywords)
      // open file handler modal
      return {
        name: name,
        keywords: keywords,
        svg: content,
      }
    } catch (error) {
      console.error("Invalid SVG file:", error)
    }
  }
}

export default importFileHandler
