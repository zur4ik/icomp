export const getIconName = (fileName: string): string => {
  let name = fileName.replace(/\.svg$/, "")

  // Remove 'icon' word (optional, if your files have icon-gear.svg etc.)
  name = name.replace(/icon[-_]?/i, "")

  // replace whitespace with '-'
  name = name.replace(/\s+/g, "-")

  // Split by non-alphanumeric separators like '-', '_', etc.
  const parts = name.split(/[-_]+/)

  // Convert to PascalCase
  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")
}

export const getComponentName = (fileName: string): string => {
  const iconName = getIconName(fileName)

  // convert to PascalCase
  return "Icon" + iconName
}
