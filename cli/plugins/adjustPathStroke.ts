export const adjustPathStroke = {
  name: "adjustPathStroke",
  description: "Change stroke to currentColor and add fill='none' on paths with stroke",

  fn: () => ({
    element: {
      enter(node: any) {
        if (node.type !== "element" || node.name !== "path") return

        if (node.attributes?.stroke) {
          // Change stroke to currentColor
          node.attributes.stroke = "currentColor"

          // Add fill="none" if not already set
          if (!("fill" in node.attributes)) {
            node.attributes.fill = "none"
          }
        }
      },
    },
  }),
}
