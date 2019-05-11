import React from "react";
import "./styles.css";
const CurrentMarker = props => {
  return (
    <div
      className="current-marker-container"
      onClick={(props, marker, e) => {
        console.log(marker);
      }}
    >
      {props.text}
    </div>
  );
};

export default CurrentMarker;
