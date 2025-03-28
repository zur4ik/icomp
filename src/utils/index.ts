// Utility to convert filename to PascalCase
export const toPascalCase = (name: string) => {
  return name.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase())
}

// Utility to get component name
export const getComponentName = (fileName: string): string => {
  const name = fileName.replace(/\.svg$/, "")
  if (name.toLowerCase().endsWith("icon")) {
    return toPascalCase(name)
  }
  return toPascalCase(name + "Icon")
}

export { transformSvg } from "./transformSvg.ts"
export { createComponent } from "./createComponent.ts"
export { generateIndex } from "./generateIndex.ts"
