import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number
}
const IconEditField = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    id="Cash-Payment-Sign-1--Streamline-Ultimate"
    height={height || size}
    width={width || size}
    fill="currentColor"
    className={props.className}
    {...props}
  >
    <desc>{"Cash Payment Sign 1 Streamline Icon: https://streamlinehq.com"}</desc>
    <g>
      <path
        d="M9.61 16.53a1 1 0 0 0 1 1h7.16a1 1 0 0 0 0 -1.91h-7.2a1 1 0 0 0 -0.96 0.91Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M22 7.46h-3.8a1 1 0 0 0 0 1.91H21a1 1 0 0 1 1 1v8.5a1 1 0 0 1 -1 1H3a1 1 0 0 1 -1 -1v-8.5a1 1 0 0 1 1 -1h1.36a1 1 0 1 0 0 -1.91H2A1.91 1.91 0 0 0 0.07 9.37v10.5A1.9 1.9 0 0 0 2 21.78h20a1.9 1.9 0 0 0 1.91 -1.91V9.37A1.91 1.91 0 0 0 22 7.46Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M7 10.83a0.24 0.24 0 0 0 -0.25 -0.06 0.25 0.25 0 0 0 -0.15 0.23l-0.33 1.68a0.5 0.5 0 0 0 0.13 0.43 0.48 0.48 0 0 0 0.34 0.14c0.1 0 1.87 -0.37 1.77 -0.35a0.25 0.25 0 0 0 0.19 -0.17 0.28 0.28 0 0 0 -0.06 -0.25Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M13.4 3.84a0.24 0.24 0 0 0 -0.36 0L7.39 9.49a0.24 0.24 0 0 0 0 0.35l2.23 2.23a0.24 0.24 0 0 0 0.35 0l5.66 -5.65a0.24 0.24 0 0 0 0 -0.35Z"
        fill="currentColor"
        strokeWidth={1}
      />
      <path
        d="M16.3 5.39a0.24 0.24 0 0 0 0.36 0l0.06 -0.06a1.83 1.83 0 0 0 -2.59 -2.58l-0.06 0.06a0.24 0.24 0 0 0 0 0.35Z"
        fill="currentColor"
        strokeWidth={1}
      />
    </g>
  </svg>
)
export default IconEditField
