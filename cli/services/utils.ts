export const checkSvgFile = (file: string) => {
  if (!file.endsWith(".svg")) {
    console.log(` - ❌ [Skip] Not an SVG file: ${file}`)
    return false
  }
  return true
}
