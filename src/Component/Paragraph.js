import React, { Component } from "react";
import "../App.css";

const Paragraph = props => {
  return (
    <div className="App">
      <p
        name={props.name}
        onDoubleClick={props.handleDoubleClickItem}
        onMouseUp={props.handleDoubleClickItem}
      >
        {props.text}
      </p>
    </div>
  );
};

export default Paragraph;
