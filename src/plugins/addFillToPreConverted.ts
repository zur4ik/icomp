const addFillToPreConverted = {
  name: "addFillToPreConverted",
  description: "Add fill='none' to elements marked with data-pre-convert",

  fn: () => ({
    element: {
      enter(node: any) {
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

export default addFillToPreConverted
