import React, { Component } from "react";
import "../App.css";
import Paragraph from "./Paragraph";
import GifItem from "./GifItem";
import fetch from "node-fetch";
import funcs from "../utility";
import CustomTooltip from "./Tooltip";
import ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: {},
      top: 0.0,
      left: 0.0,
      bottom: 0.0,
      right: 0.0,
      error: {}
    };
  }

  handleDoubleClickItem = event => {
    let text = "";
    let error = {};
    if (window.getSelection) {
      text = window.getSelection().toString();
      let selection = window.getSelection();
      let range = selection.getRangeAt(0); // the range at first selection group
      let rect = range.getBoundingClientRect(); // and convert this to useful data

      if (rect.width > 0) {
        this.setState({
          top: rect.top / 2 - 10,
          left: rect.left - text.length / 2,
          right: rect.right,
          bottom: rect.bottom
        });
      }

      if (text !== " " && text !== "") {
        const url = `https://api.giphy.com/v1/gifs/search?q=${text}&api_key=dc6zaTOxFJmzC`;

        fetch(url)
          .then(funcs.handleErrors)
          .then(response => {
            response.json().then(images => {
              this.setState({ gif: images.data[0], error: {} });
              ReactTooltip.show(findDOMNode(this.refs.tooltip));
            });
          })
          .catch(error => {
            error.msg = error;
            this.setState({ error: error });
            ReactTooltip.show(findDOMNode(this.refs.tooltip));
          });
      } else {
        error.msg = "No GIF";
        this.setState({ gif: {}, error: error });
        ReactTooltip.show(findDOMNode(this.refs.tooltip));
      }
    }
  };

  render() {
    let gifitem =
      !funcs.isEmpty(this.state.gif) || !funcs.isEmpty(this.state.error) ? (
        <GifItem image={this.state.gif} error={this.state.error} />
      ) : (
        <span />
      );

    let offset = `{ 'top': ${this.state.top}, 'left': ${this.state.left}}`;

    return (
      <div className="App">
        <h1>Giphytooltip Demo</h1>
        <Paragraph
          name="inputParagraph"
          handleDoubleClickItem={this.handleDoubleClickItem}
          text="cat dogs and unicorns"
        />
        <p ref="tooltip" data-tip data-for="gif" data-iscapture="true" />
        <CustomTooltip
          id="gif"
          offset={offset}
          gifitem={gifitem}
          effect="solid"
          place="top"
        />
      </div>
    );
  }
}

export default Parent;
