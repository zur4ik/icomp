import path from "node:path"
import { getComponentName } from "@shared"
import { CACHE_PATH } from "../../paths"
import fs from "node:fs"

export const removeIcon = (inputPath: string, outputPath: string, fileName: string) => {
  const componentName = getComponentName(fileName)

  // define files to remove
  const svgFile = path.join(inputPath, fileName)
  const componentFile = path.join(outputPath, componentName + ".tsx")
  const cacheFile = path.join(CACHE_PATH, componentName + ".js")

  // remove svg file
  fs.unlinkSync(svgFile)

  // remove cache file
  fs.unlinkSync(cacheFile)

  // remove component
  fs.unlinkSync(componentFile)

  // remove export from index
  const indexFile = path.join(outputPath, "index.ts")
  const indexContent = fs.readFileSync(indexFile, "utf-8")
  const newIndexContent = indexContent
    .split("\n")
    .filter((line) => !line.includes(componentName))
    .join("\n")
  fs.writeFileSync(indexFile, newIndexContent)
}
