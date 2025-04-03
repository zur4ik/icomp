import path from "node:path"
import fs from "node:fs"
import { getComponentName } from "@shared"
import { transformSvg } from "@services/svgTransformer"
import { transformSync } from "esbuild"
import { CACHE_PATH } from "../paths"

export const createComponent = async (inputFile: string, outputPath: string): Promise<string> => {
  const fileName = path.basename(inputFile, ".svg")
  const svgContent = fs.readFileSync(inputFile, "utf-8")

  if (svgContent) {
    const componentName = getComponentName(fileName)
    const componentContent = await transformSvg(componentName, svgContent)
    const componentPath = path.join(outputPath, `${componentName}.tsx`)

    // publish component
    fs.writeFileSync(componentPath, componentContent)

    // check/create cache dir
    if (!fs.existsSync(CACHE_PATH)) {
      fs.mkdirSync(CACHE_PATH, { recursive: true })
    }

    // compile to ESM JS:
    const cachedComponent = transformSync(componentContent, {
      loader: "tsx",
      format: "esm",
      target: "esnext",
    })

    // cache compiled js component
    fs.writeFileSync(path.resolve(CACHE_PATH, `${componentName}.js`), cachedComponent.code)

    console.log(` - 🧩 Created: ${componentName}`)
    return componentName
  }

  // fallback: if no svg content, return empty string
  return ""
}
