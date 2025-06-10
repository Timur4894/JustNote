import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      fill="none"
      stroke="#ddd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={102}
      d="M416 128 192 384l-96-96"
    />
  </Svg>
)
export default SvgComponent
