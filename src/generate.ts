import * as fs from "node:fs"
import path from "node:path"
import { createComponent, generateIndex } from "./utils"
import startWatch from "./watcher.ts"
import * as pkg from "../package.json"

export const generateIcons = async (
  inputPath: string,
  outputPath: string,
  watch: boolean = false,
) => {
  // display current version off package
  console.log(`📦 Package (icomp) v${pkg.version}`)

  // Check if the input path exists
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input path does not exist: ${inputPath}`)
    return
  }

  // Check if the output path exists, if not create it
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // read svg files
  const files = fs.readdirSync(inputPath).filter((file) => file.endsWith(".svg"))

  if (files.length > 0) {
    console.log("⚙️ Creating React components from SVG files...")
  }

  // Loop through each file and convert to component
  for (const file of files) {
    const inputFile = path.join(inputPath, file)
    await createComponent(inputFile, outputPath)
  }

  // Generate index.ts file for all components
  generateIndex(outputPath)

  if (watch) {
    startWatch(inputPath, outputPath)
  }
}
