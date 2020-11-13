import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg height="512pt" viewBox="0 0 512 512" width="512pt" {...props}>
      <Path d="M422 181v105l-166 75-165-75V181zm0 0" fill="#5a5a5a" />
      <Path d="M422 181v105l-166 75V181zm0 0" fill="#444" />
      <Path d="M482 136v240h-30V151zm0 0" fill="#fdbf00" />
      <Path d="M482 136v240h-15V143.5zm0 0" fill="#ff9f00" />
      <Path d="M467 354.7l-45 45V512h90V399.7zm0 0" fill="#ffd400" />
      <Path d="M512 399.7V512h-45V354.7zm0 0" fill="#fdbf00" />
      <Path d="M512 136L256 271 0 136 256 0zm0 0" fill="#6e6e6e" />
      <Path d="M512 136L256 271V0zm0 0" fill="#5a5a5a" />
      <Path
        d="M256 91c-33.602 0-60 19.8-60 45s26.398 45 60 45 60-19.8 60-45-26.398-45-60-45zm0 0"
        fill="#ffd400"
      />
      <Path
        d="M316 136c0 25.2-26.398 45-60 45V91c33.602 0 60 19.8 60 45zm0 0"
        fill="#fdbf00"
      />
    </Svg>
  )
}

export default SvgComponent
