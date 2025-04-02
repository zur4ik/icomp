// Utility to convert filename to PascalCase
export const toPascalCase = (name: string) => {
  return name.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase())
}

// Utility to get component name
export const getComponentName = (fileName: string): string => {
  let name = fileName.replace(/\.svg$/, "")

  // Remove 'icon' word (optional, if your files have icon-gear.svg etc.)
  name = name.replace(/icon[-_]?/i, "")

  // replace whitespace with '-'
  name = name.replace(/\s+/g, "-")

  // Split by non-alphanumeric separators like '-', '_', etc.
  const parts = name.split(/[-_]+/)

  // Convert to PascalCase
  const pascal = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")

  // convert to PascalCase
  return "Icon" + pascal
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
