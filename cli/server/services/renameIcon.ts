import path from "node:path"
import fs from "node:fs"
import { getComponentName, getIconName } from "@shared"
import { CACHE_PATH } from "../../paths"

export const renameIcon = (
  inputPath: string,
  outputPath: string,
  fileName: string,
  newName: string,
  keywords: string,
) => {
  const filePath = path.join(inputPath, fileName + ".svg")
  const iconName = getIconName(fileName)
  const componentName = getComponentName(fileName)
  const newFileName = newName + ".svg"
  const newFilePath = path.join(inputPath, newFileName)

  // rename icon file
  if (fileName !== newFileName) {
    fs.renameSync(filePath, newFilePath)
  }

  // add <desc> with keywords in svg file
  const svgContent = fs.readFileSync(newFilePath, "utf-8")
  const descTag = `<desc>${keywords}</desc>`
  const newSvgContent = svgContent.replace(/<svg([^>]*)>/, `<svg$1>${descTag}`)
  fs.writeFileSync(newFilePath, newSvgContent)

  // remove old component file
  const oldComponentPath = path.join(outputPath, componentName + ".tsx")
  if (fs.existsSync(oldComponentPath)) {
    fs.rmSync(oldComponentPath)
  }

  // remove old cache file
  const oldCachePath = path.join(CACHE_PATH, componentName + ".js")
  if (fs.existsSync(oldCachePath)) {
    fs.rmSync(oldCachePath)
  }

  // remove from index
  const indexPath = path.join(outputPath, "index.ts")
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, "utf-8")
    const newIndexContent = indexContent.replace(
      new RegExp(`import { ${iconName} } from "./${iconName}"`, "g"),
      "",
    )
    fs.writeFileSync(indexPath, newIndexContent)
  }
}
