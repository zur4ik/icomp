import type { CustomPlugin } from "svgo"

export const adjustPathStroke: CustomPlugin = {
  name: "adjustPathStroke",
  fn: () => ({
    element: {
      enter(node) {
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
