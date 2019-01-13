import React from "react";
import Icon from "./Icon";

const StaticIcon = ({ image, ...props }) => {
  return <Icon iconUri={`/static/${image}.png`} {...props} />;
};

export default StaticIcon;
