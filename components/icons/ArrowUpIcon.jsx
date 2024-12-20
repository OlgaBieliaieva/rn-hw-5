import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowUpIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M12 19V5.5M17 10l-5-5-5 5"
    />
  </Svg>
);
export default ArrowUpIcon;
