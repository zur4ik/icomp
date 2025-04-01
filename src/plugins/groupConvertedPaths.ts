const groupConvertedPaths = {
  name: "wrapConvertedPaths",
  description: "Wrap converted paths into a <g> element",

  fn: () => ({
    element: {
      exit(node: any) {
        if (!node.children || node.children.length === 0) return

        const newChildren = []
        let buffer: any[] = []

        const flushGroup = () => {
          if (buffer.length > 0) {
            // Create <g> with buffered paths
            newChildren.push({
              type: "element",
              name: "g",
              attributes: {},
              children: buffer.map((pathNode) => {
                delete pathNode.attributes["data-pre-convert"]
                return pathNode
              }),
            })
            buffer = []
          }
        }

        for (const child of node.children) {
          if (
            child.type === "element" &&
            child.name === "path" &&
            child.attributes?.["data-pre-convert"]
          ) {
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

export default groupConvertedPaths
