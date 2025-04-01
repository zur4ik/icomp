import * as fs from "node:fs"
import chokidar from "chokidar"
import { checkSvgFile, createComponent, generateIndex } from "./utils"

const processChange = async (file: string, outputPath: string, type: "add" | "change") => {
  console.log(` - 🏞️ ${type === "add" ? "Added" : "Changed"}: ${file}`)
  await createComponent(file, outputPath)

  // regenerate index.ts
  generateIndex(outputPath)
}

const startWatch = (inputPath: string, outputPath: string) => {
  // Make output dir if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // register watcher
  const watcher = chokidar.watch(inputPath, {
    ignoreInitial: true,
  })
  console.log("👀 Watching for icon changes...")

  watcher
    .on("add", async (file) => {
      // check if file is svg
      checkSvgFile(file)
      await processChange(file, outputPath, "add")
    })
    .on("change", async (file) => {
      checkSvgFile(file)
      await processChange(file, outputPath, "change")
    })
}

export default startWatch
