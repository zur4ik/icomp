import type { CustomPlugin } from "svgo"
import type { XastElement } from "svgo/lib/types"

export const adjustColors: CustomPlugin = {
  name: "addFillColor",
  fn: () => ({
    element: {
      enter: (node: XastElement) => {
        if (node.type === "element") {
          const fillAttr = node.attributes?.fill
          const strokeAttr = node.attributes?.stroke

          // deal with stroke
          if (strokeAttr && strokeAttr !== "none") {
            node.attributes.stroke = "currentColor"
          }

          // deal with fill
          if (node.name === "svg") {
            // only parent svg elements
            if (!fillAttr || fillAttr !== "none") {
              node.attributes.fill = "currentColor"
            }
          } else {
            // child elements
            if (!!fillAttr && fillAttr !== "none") {
              node.attributes.fill = "currentColor"
            }
          }
        }
      },
    },
  }),
}
