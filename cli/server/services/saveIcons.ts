import type { ImportFileInfo } from "@shared/types"
import fs from "node:fs"
import path from "node:path"
import { processFile } from "@services/fileProcessor"

export const saveIcons = async (inputPath: string, outputPath: string, files: ImportFileInfo[]) => {
  // check if outputPath exists and is directory or create
  if (!(fs.existsSync(outputPath) && fs.lstatSync(outputPath).isDirectory())) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // check inputPath exists and is directory
  if (!(fs.existsSync(inputPath) && fs.lstatSync(inputPath).isDirectory())) {
    throw new Error(`Input path ${inputPath} is not a directory`)
  }

  for (const file of files) {
    const fileName = file.name + ".svg"
    const filePath = path.join(inputPath, fileName)

    // check if file exists
    if (fs.existsSync(filePath)) {
      console.warn(`File ${filePath} already exists`)
      continue
    }

    // remove desc from svg content
    const svgContent = file.content.replace(/<desc>.*?<\/desc>/, "")

    // add new desc tag with keywords in svg content
    const descTag = `<desc>${file.keywords}</desc>`
    const updatedSvgContent = svgContent.replace(/<svg([^>]*)>/, `<svg$1>${descTag}`)

    // save svg in input path
    fs.writeFileSync(filePath, updatedSvgContent, "utf8")

    // generate icon
    console.log(` - 🏞️ Generating: ${file.name}`)
    await processFile(filePath, outputPath, true)
  }
}
