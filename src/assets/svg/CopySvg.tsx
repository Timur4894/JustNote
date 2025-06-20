import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    {...props}
  >
    <Rect
      width={336}
      height={336}
      x={128}
      y={128}
      fill="none"
      stroke="#ddd"
      strokeLinejoin="round"
      strokeWidth={42}
      rx={57}
      ry={57}
    />
    <Path
      fill="none"
      stroke="#ddd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={42}
      d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
    />
  </Svg>
)
export default SvgComponent
