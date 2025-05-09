import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number
}
const IconInfoCircleSolid = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    id="Information-Circle--Streamline-Ultimate"
    height={height || size}
    width={width || size}
    fill="currentColor"
    className={props.className}
    {...props}
  >
    <desc>{"Information Circle Streamline Icon: https://streamlinehq.com"}</desc>
    <g>
      <path
        d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm0.25 5a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5Zm2.25 13.5h-4a1 1 0 0 1 0 -2h0.75a0.25 0.25 0 0 0 0.25 -0.25v-4.5a0.25 0.25 0 0 0 -0.25 -0.25h-0.75a1 1 0 0 1 0 -2h1a2 2 0 0 1 2 2v4.75a0.25 0.25 0 0 0 0.25 0.25h0.75a1 1 0 0 1 0 2Z"
        fill="currentColor"
        strokeWidth={1}
      />
    </g>
  </svg>
)
export default IconInfoCircleSolid
