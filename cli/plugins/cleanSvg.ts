import type { CustomPlugin } from "svgo"

export const cleanSvg: CustomPlugin = {
  name: "cleanSvg",
  fn: () => ({
    element: {
      enter: (node, parentNode) => {
        // remove text nodes
        if (node.name === "text") {
          parentNode.children = parentNode.children.filter((child) => child !== node)
          return
        }

        // Remove xmlns attributes
        if (!node.attributes) return
        for (const attr in node.attributes) {
          if (attr.startsWith("xmlns:")) {
            delete node.attributes[attr]
          }
        }
      },
    },
  }),
}
