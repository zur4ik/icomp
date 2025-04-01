// Utility to convert filename to PascalCase
export const toPascalCase = (name: string) => {
  return name.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase())
}

// Utility to get component name
export const getComponentName = (fileName: string): string => {
  let name = fileName.replace(/\.svg$/, "")

  // remove "icon" word and all dashes and digits
  name = name.replace(/icon|[\d\W_]/gi, "")

  // convert to PascalCase
  return "Icon" + toPascalCase(name)
}

export const checkSvgFile = (file: string) => {
  if (!file.endsWith(".svg")) {
    console.log(` - ❌ [Skip] Not an SVG file: ${file}`)
    return false
  }
}

export { transformSvg } from "./transformSvg.ts"
export { createComponent } from "./createComponent.ts"
export { generateIndex } from "./generateIndex.ts"
