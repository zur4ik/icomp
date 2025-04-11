import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number
}
const IconAlertTriangleSolid = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    id="Alert-Triangle--Streamline-Ultimate"
    height={height || size}
    width={width || size}
    fill="currentColor"
    className={props.className}
    {...props}
  >
    <desc>{"Alert Triangle Streamline Icon: https://streamlinehq.com"}</desc>
    <g>
      <path
        d="m23.77 20.57 -10 -19A2 2 0 0 0 12 0.5a2 2 0 0 0 -1.77 1.07l-10 19a2 2 0 0 0 0.06 2A2 2 0 0 0 2 23.5h20a2 2 0 0 0 1.77 -2.93ZM11 8.5a1 1 0 0 1 2 0v6a1 1 0 0 1 -2 0ZM12.05 20a1.53 1.53 0 0 1 -1.52 -1.47A1.48 1.48 0 0 1 12 17a1.53 1.53 0 0 1 1.52 1.47A1.48 1.48 0 0 1 12.05 20Z"
        fill="currentColor"
        strokeWidth={1}
      />
    </g>
  </svg>
)
export default IconAlertTriangleSolid
