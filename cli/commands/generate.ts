import fs from "node:fs"
import path from "node:path"
import { version } from "../../package.json"
import { createComponent } from "@services/componentGenerator"
import { generateIndex } from "@services/indexGenerator"
import { startWatcher } from "@services/fileWatcher"

export const generate = async (inputPath: string, outputPath: string, watch: boolean = false) => {
  // display current version off package
  console.log(`📦 icomp (cli mode) v${version}`)

  // Check if the input path exists
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input path does not exist: ${inputPath}`)
    return
  }

  // Check if the output path exists, if not create it
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  } else {
    // re-create empty output path
    fs.rmSync(outputPath, { recursive: true, force: true })
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

  // Generate index file for all components
  generateIndex(outputPath)

  // start watcher if watch flag provided
  if (watch) {
    startWatcher(inputPath, outputPath)
  }
}
