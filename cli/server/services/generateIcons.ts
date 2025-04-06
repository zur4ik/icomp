import fs from "node:fs"
import path from "node:path"
import { checkSvgFile } from "@services/utils"
import { processFile } from "@services/fileProcessor"
import { generateIndex } from "@services/indexGenerator"

const generateIcons = async (inputPath: string, outputPath: string, files: string[]) => {
  // check if outputPath exists and is directory or create
  if (!(fs.existsSync(outputPath) && fs.lstatSync(outputPath).isDirectory())) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // check inputPath exists and is directory
  if (!(fs.existsSync(inputPath) && fs.lstatSync(inputPath).isDirectory())) {
    throw new Error(`Input path ${inputPath} is not a directory`)
  }

  for (const file of files) {
    const filePath = path.join(inputPath, file)
    // check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`File ${filePath} does not exist`)
      continue
    }
    // check if file is svg
    if (!checkSvgFile(filePath)) continue

    console.log(` - 🏞️ Generating: ${file}`)
    await processFile(filePath, outputPath, true)
  }

  // generate index at the end
  generateIndex(outputPath)
}

export default generateIcons
