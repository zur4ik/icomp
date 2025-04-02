import fs from "node:fs"
import { transformSvg } from "./index.ts"
import path from "node:path"
import { getComponentName } from "../shared"

export const createComponent = async (inputFile: string, outputPath: string): Promise<string> => {
  const svgContent = fs.readFileSync(inputFile, "utf-8")

  // generate react components
  if (svgContent) {
    const componentName = getComponentName(path.basename(inputFile, ".svg"))
    const componentContent = await transformSvg(componentName, svgContent)
    const componentPath = path.join(outputPath, `${componentName}.tsx`)

    fs.writeFileSync(componentPath, componentContent)

    console.log(` - 🧩 Created: ${componentName}`)
    return componentName
  }
  return ""
}

export default createComponent
