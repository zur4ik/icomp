import { transform } from "@svgr/core"
import { adjustColors, adjustPathStroke, groupAllPaths, cleanSvg } from "@plugins"
import prettier from "prettier"
import { iconTemplate } from "../templates/iconTemplate"

export const transformSvg = async (name: string, data: string) => {
  const code = await transform(
    data,
    {
      icon: true,
      typescript: true,
      exportType: "default",
      jsxRuntime: "automatic",
      svgProps: {
        width: "{width || size}",
        height: "{height || size}",
        className: "{props.className}",
      },
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      svgoConfig: {
        plugins: [
          {
            name: "inlineStyles",
            params: {
              onlyMatchedOnce: false,
              removeMatchedSelectors: true,
            },
          },
          "convertStyleToAttrs",
          {
            name: "convertShapeToPath",
            params: {
              convertArcs: true,
            },
          },
          {
            name: "removeOffCanvasPaths",
          },
          cleanSvg,
          adjustColors,
          groupAllPaths,
          adjustPathStroke,
        ],
      },

      // template for the component
      template: iconTemplate,
    },
    // state to pass to the template
    { componentName: name },
  )

  return prettier.format(code, {
    parser: "typescript",
    semi: false,
    singleQuote: false,
    tabWidth: 2,
    useTabs: false,
  })
}
