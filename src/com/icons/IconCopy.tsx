import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number
}
const IconCopy = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    id="Duplicate-File--Streamline-Ultimate"
    height={height || size}
    width={width || size}
    className={props.className}
    {...props}
  >
    <desc>{"Duplicate File Streamline Icon: https://streamlinehq.com"}</desc>
    <g>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.5 2a0.5 0.5 0 0 0 -0.5 0.5v14a0.5 0.5 0 0 0 0.5 0.5L7 17V7.5A2.5 2.5 0 0 1 9.5 5h5.336l-2.854 -2.854A0.5 0.5 0 0 0 11.63 2H3.5Zm13.472 3a2.501 2.501 0 0 0 -0.704 -1.396L13.396 0.732A2.5 2.5 0 0 0 11.629 0H3.5A2.5 2.5 0 0 0 1 2.5v14A2.5 2.5 0 0 0 3.5 19L7 19v2.5A2.5 2.5 0 0 0 9.5 24h11a2.5 2.5 0 0 0 2.5 -2.5V10.37a2.5 2.5 0 0 0 -0.732 -1.766l-2.872 -2.872A2.5 2.5 0 0 0 17.629 5h-0.657ZM16 7H9.5a0.5 0.5 0 0 0 -0.5 0.5v14a0.5 0.5 0 0 0 0.5 0.5h11a0.5 0.5 0 0 0 0.5 -0.5V10.371a0.5 0.5 0 0 0 -0.146 -0.353l-2.872 -2.872A0.5 0.5 0 0 0 17.63 7H16Z"
        clipRule="evenodd"
        strokeWidth={1}
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11 11a1 1 0 0 1 1 -1h3.5a1 1 0 1 1 0 2H12a1 1 0 0 1 -1 -1Z"
        clipRule="evenodd"
        strokeWidth={1}
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11 15a1 1 0 0 1 1 -1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1 -1 -1Z"
        clipRule="evenodd"
        strokeWidth={1}
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11 19a1 1 0 0 1 1 -1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1 -1 -1Z"
        clipRule="evenodd"
        strokeWidth={1}
      />
    </g>
  </svg>
)
export default IconCopy
