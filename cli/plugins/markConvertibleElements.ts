const convertibleElements = ["rect", "circle", "ellipse", "line", "polygon", "polyline"]

export const markConvertibleElements = {
  name: "markConvertibleElements",
  description: "Mark elements that can be converted to paths",
  fn: () => {
    return {
      element: {
        enter: (node: any) => {
          if (node.type === "element" && convertibleElements.includes(node.name)) {
            node.attributes ||= {}
            node.attributes["data-pre-convert"] = "true"
          }
        },
      },
    }
  },
}
