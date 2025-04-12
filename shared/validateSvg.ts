export const validateSvg = (content: string, silent: boolean = false) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, "image/svg+xml")

  // Check for parsing errors
  const parseError = doc.getElementsByTagName("parsererror")
  if (parseError.length > 0) {
    if (!silent) {
      throw new Error("Invalid SVG: " + parseError[0].textContent)
    }
    return false
  }

  // Check for SVG namespace
  const svgElement = doc.documentElement
  if (svgElement.tagName !== "svg" || svgElement.namespaceURI !== "http://www.w3.org/2000/svg") {
    if (!silent) {
      throw new Error("Invalid SVG: Root element is not an SVG")
    }
    return false
  }

  return true
}
