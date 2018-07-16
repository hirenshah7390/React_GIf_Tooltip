import React from "react";
import funcs from "../utility";

const GifItem = (props, error) => {
  if (funcs.isEmpty(props.error)) {
    return (
      <img
        src={props.image.images.downsized.url}
        alt={props.image.id}
        height="100px"
        width="150px"
      />
    );
  } else {
    return <span className="App">{error.msg}</span>;
  }
};

export default GifItem;
