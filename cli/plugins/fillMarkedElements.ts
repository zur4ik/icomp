import type { CustomPlugin } from "svgo"

export const fillMarkedElements: CustomPlugin = {
  name: "addFillToPreConverted",
  fn: () => ({
    element: {
      enter(node) {
        if (node.type !== "element") return

        if (node.attributes?.["data-pre-convert"]) {
          if (!("fill" in node.attributes)) {
            node.attributes.fill = "none"
          }

          // remove data-pre-convert attribute
          delete node.attributes["data-pre-convert"]
        }
      },
    },
  }),
}
