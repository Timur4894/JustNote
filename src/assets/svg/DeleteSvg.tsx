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
      strokeWidth={42}
      d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
    />
    <Path
      stroke="#ddd"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={42}
      d="M80 112h352"
    />
    <Path
      fill="none"
      stroke="#ddd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={42}
      d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224 8 224m136-224-8 224"
    />
  </Svg>
)
export default SvgComponent
