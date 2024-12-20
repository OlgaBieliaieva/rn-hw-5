import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AddPostIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.stroke}
      strokeDasharray="16 16"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M5 12h14M12 5v14"
    />
  </Svg>
);
export default AddPostIcon;
