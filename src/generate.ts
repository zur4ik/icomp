import * as fs from "node:fs"
import path from "node:path"
import { generateReactComponent, getComponentName } from "./utils"

export const generateIcons = async (
  inputPath: string,
  outputPath: string,
  watch: boolean = false,
) => {
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
  const exports: string[] = []

  // Loop through each file and convert to component
  for (const file of files) {
    const svgPath = path.join(inputPath, file)
    const svgContent = fs.readFileSync(svgPath, "utf-8")

    // generate react components
    if (svgContent) {
      const componentName = getComponentName(path.basename(file, ".svg"))
      const componentContent = await generateReactComponent(componentName, svgContent)
      const componentPath = path.join(outputPath, `${componentName}.tsx`)

      fs.writeFileSync(componentPath, componentContent)
      exports.push(`export { default as ${componentName} } from "./${componentName}"`)
      console.log(` - 🧩 Generated: ${componentName}`)
    }
  }

  // Generate index.ts file for all components
  const indexPath = path.join(outputPath, "index.ts")
  fs.writeFileSync(indexPath, exports.join("\n"))
  console.log(` ▶︎ 🔗 Created unified export file for components`)

  if (watch) {
    console.log("👀 Watch mode is not yet implemented")
  }
}
