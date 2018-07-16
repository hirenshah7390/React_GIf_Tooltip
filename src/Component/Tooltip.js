import React from "react";
import ReactTooltip from "react-tooltip";

const CustomTooltip = props => {
  return (
    <ReactTooltip
      globalEventOff="click"
      id={props.id}
      data-offset={props.offset}
      effect={props.effect}
      data-place={props.place}
      data-delay-hide="500"
      getContent={() => props.gifitem}
    />
  );
};

export default CustomTooltip;
