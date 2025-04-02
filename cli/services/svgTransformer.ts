import { transform } from "@svgr/core"
import {
  adjustPathStroke,
  fillMarkedElements,
  groupAllPaths,
  markConvertibleElements,
} from "@plugins"
import prettier from "prettier"

export const transformSvg = async (name: string, data: string) => {
  const code = await transform(
    data,
    {
      icon: true,
      typescript: true,
      exportType: "default",
      jsxRuntime: "automatic",
      svgProps: { fill: "currentColor", width: "{width || size}", height: "{height || size}" },
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],

      // svgo plugin for fill replacements
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
          markConvertibleElements,
          {
            name: "convertShapeToPath",
            params: {
              convertArcs: true,
            },
          },
          {
            name: "removeAttrs",
            params: {
              attrs: "(fill)",
            },
          },
          {
            name: "addAttributesToSVGElement",
            params: {
              attributes: [{ fill: "currentColor" }],
            },
          },
          groupAllPaths,
          adjustPathStroke,
          fillMarkedElements,
        ],
      },

      // template for the component
      template: ({ imports, interfaces, componentName, exports, jsx }, { tpl }) => {
        // console.log("variables: ", variables)
        // console.log("template: ", template)

        return tpl`
          ${imports}
          ${interfaces}
          
          interface IconProps extends SVGProps<SVGSVGElement> {
            size?: number
            width?: number
            height?: number,
          } 
          
          const ${componentName} = ({ size = 24, width, height, ...props }: IconProps) => (
            ${jsx} 
          )
          
          ${exports}
        `
      },
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
