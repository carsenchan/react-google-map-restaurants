import React, { Component } from "react";
import "./styles.css";
export default class ToolBar extends Component {
  render() {
    return (
      <div className="toolbar">
        <button
          onClick={() => {
            console.log("Hello ME");
          }}
        >
          ME
        </button>
      </div>
    );
  }
}
