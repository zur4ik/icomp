import fs from "node:fs"
import path from "node:path"
import { cleanKeywords } from "@shared"

export const getIconKeywords = (inputPath: string, file: string): string => {
  // get desc tag from svg file
  const filePath = path.join(inputPath, file)
  if (!fs.existsSync(filePath)) {
    return ""
  }
  const svgContent = fs.readFileSync(filePath, "utf-8")
  const descTag = svgContent.match(/<desc>(.*?)<\/desc>/)
  const desc = descTag ? descTag[1] : ""

  return cleanKeywords(desc)
}
