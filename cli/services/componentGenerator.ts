import path from "node:path"
import fs from "node:fs"
import { getComponentName } from "@shared"

export const createComponent = async (inputFile: string, outputPath: string): Promise<string> => {
  const fileName = path.basename(inputFile, ".svg")
  const svgContent = fs.readFileSync(inputFile, "utf-8")
  const cachePath = path.resolve(__dirname, ".cache")

  if (svgContent) {
    const componentName = getComponentName(fileName)
    console.log(` - 🧩 Creating component: ${componentName}`)
  }

  // const componentName = getComponentName(fileName)
  // const outputFile = path.join(outputPath, `${componentName}.tsx`)

  // Read SVG content
  // const svgContent = fs.readFileSync(inputFile, "utf-8")

  return ""
}
