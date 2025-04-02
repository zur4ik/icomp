import { CONVERTIBLE_ELEMENTS } from "@services/constants"
import type { CustomPlugin } from "svgo"

export const markConvertibleElements: CustomPlugin = {
  name: "markConvertibleElements",
  fn: () => {
    return {
      element: {
        enter: (node) => {
          if (node.type === "element" && CONVERTIBLE_ELEMENTS.includes(node.name)) {
            node.attributes ||= {}
            node.attributes["data-pre-convert"] = "true"
          }
        },
      },
    }
  },
}
