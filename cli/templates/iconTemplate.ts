import type { Template } from "@svgr/babel-plugin-transform-svg-component"

const ICON_PROPS = `
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number,
}`

export const iconTemplate: Template = (
  { imports, interfaces, componentName, exports, jsx },
  { tpl },
) => {
  return tpl`
  ${imports}
  ${interfaces}
  ${ICON_PROPS}
  
  const ${componentName} = ({ size = 24, width, height, ...props }: IconProps) => (
    ${jsx} 
  )
  
  ${exports}`
}
