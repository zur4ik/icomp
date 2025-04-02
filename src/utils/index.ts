// Utility to convert filename to PascalCase
export const toPascalCase = (name: string) => {
  return name.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase())
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
