import type { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number
}
const IconMascot = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    id="Kawaii-Manga-Full-Metal-Alchemist-Alphonse-Elric-Empty-Awrmor--Streamline-Ultimate"
    height={height || size}
    width={width || size}
    className={props.className}
    {...props}
  >
    <desc />
    <g>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16 13.5 -0.5 1.5c-1.1006 -0.4944 -2.2935 -0.75 -3.5 -0.75 -1.2065 0 -2.39939 0.2556 -3.5 0.75L8 13.5"
        strokeWidth={1.5}
        fill="none"
      />
      <path
        stroke="currentColor"
        d="M9.31201 10.313c-0.27614 0 -0.5 -0.2239 -0.5 -0.50001 0 -0.27614 0.22386 -0.5 0.5 -0.5"
        strokeWidth={1.5}
        fill="none"
      />
      <path
        stroke="currentColor"
        d="M9.31201 10.313c0.27614 0 0.5 -0.2239 0.5 -0.50001 0 -0.27614 -0.22386 -0.5 -0.5 -0.5"
        strokeWidth={1.5}
        fill="none"
      />
      <path
        stroke="currentColor"
        d="M14.687 10.313c-0.2761 0 -0.5 -0.2239 -0.5 -0.50001 0 -0.27614 0.2239 -0.5 0.5 -0.5"
        strokeWidth={1.5}
        fill="none"
      />
      <path
        stroke="currentColor"
        d="M14.687 10.313c0.2762 0 0.5 -0.2239 0.5 -0.50001 0 -0.27614 -0.2238 -0.5 -0.5 -0.5"
        strokeWidth={1.5}
        fill="none"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18h2v-6.429c-0.0009 -1.81994 -0.6223 -3.58517 -1.7617 -5.00433 -1.1394 -1.41916 -2.7286 -2.40743 -4.5053 -2.80167L12 1l-1.733 2.765c-1.77672 0.39424 -3.36592 1.38251 -4.50529 2.80167C4.62235 7.98583 4.00092 9.75106 4 11.571V18h2v5h2.571l0.572 -1.786h5.714L15.429 23H18v-5Z"
        strokeWidth={1.5}
        fill="none"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 18H2.754c-0.21718 0.0001 -0.42843 0.0709 -0.60181 0.2017 -0.17338 0.1308 -0.29946 0.3145 -0.35919 0.5233L1 21.5"
        strokeWidth={1.5}
        fill="none"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 18h1.746c0.2172 0.0001 0.4284 0.0709 0.6018 0.2017 0.1734 0.1308 0.2995 0.3145 0.3592 0.5233L23 21.5"
        strokeWidth={1.5}
        fill="none"
      />
    </g>
  </svg>
)
export default IconMascot
