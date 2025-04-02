import type { CustomPlugin } from "svgo"
import type { XastElement } from "svgo/lib/types"

export const groupAllPaths: CustomPlugin = {
  name: "groupAllPaths",
  fn: () => ({
    element: {
      exit(node) {
        if (node.name === "g" || !node.children || node.children.length === 0) return

        const newChildren = []
        let buffer: XastElement[] = []

        const flushGroup = () => {
          if (buffer.length > 0) {
            newChildren.push({
              type: "element",
              name: "g",
              attributes: {},
              children: buffer,
            })
            buffer = []
          }
        }

        for (const child of node.children) {
          // Only collect <path> elements if the parent is NOT a <g>
          if (child.type === "element" && child.name === "path") {
            buffer.push(child)
          } else {
            flushGroup()
            newChildren.push(child)
          }
        }

        flushGroup()
        node.children = newChildren
      },
    },
  }),
}
