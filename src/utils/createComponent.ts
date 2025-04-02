import fs from "node:fs"
import { transformSvg } from "./index.ts"
import path from "node:path"
import { getComponentName } from "../shared"
import { transformSync } from "esbuild"
import { fileURLToPath } from "node:url"

// TODO: clean svg: remove xlink, title, desc, etc.
// example:
// xmlns="http://www.w3.org/2000/svg"
// xmlns:cc="http://creativecommons.org/ns#"
// xmlns:dc="http://purl.org/dc/elements/1.1/"
// xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
// xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
// xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
// xmlns:svg="http://www.w3.org/2000/svg"

export const createComponent = async (inputFile: string, outputPath: string): Promise<string> => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const svgContent = fs.readFileSync(inputFile, "utf-8")
  const cacheFolder = "explorer/components"

  const isDevMode = process.env.NODE_ENV === "development"
  const cachePath = isDevMode ? `../../dist/${cacheFolder}` : cacheFolder
  const cacheDir = path.resolve(__dirname, cachePath)

  // generate react components
  if (svgContent) {
    const componentName = getComponentName(path.basename(inputFile, ".svg"))
    const componentContent = await transformSvg(componentName, svgContent)
    const componentPath = path.join(outputPath, `${componentName}.tsx`)

    // publish component
    fs.writeFileSync(componentPath, componentContent)

    // check/create cache dir
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true })
    }

    // compile to ESM JS:
    const result = transformSync(componentContent, {
      loader: "tsx",
      format: "esm",
      target: "esnext",
    })

    // result.code is now valid browser-loadable JS module
    fs.writeFileSync(path.resolve(cacheDir, `${componentName}.js`), result.code)

    console.log(` - 🧩 Created: ${componentName}`)
    return componentName
  }
  return ""
}

export default createComponent
