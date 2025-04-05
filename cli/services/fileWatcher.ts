import fs from "node:fs"
import chokidar from "chokidar"
import { checkSvgFile } from "@services/utils"
import { processFile } from "@services/fileProcessor"

export const startWatcher = (inputPath: string, outputPath: string) => {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // register watcher
  const watcher = chokidar.watch(inputPath, {
    ignoreInitial: true,
  })

  // check if watcher is created
  if (watcher) {
    console.log("👀 Watching for icon changes...")
  }

  watcher
    .on("add", async (file) => {
      if (!checkSvgFile(file)) return
      console.log(` - 🏞️ Added: ${file}`)
      await processFile(file, outputPath)
    })
    .on("change", async (file) => {
      if (!checkSvgFile(file)) return
      console.log(` - 🏞️ Changed: ${file}`)
      await processFile(file, outputPath)
    })
}
