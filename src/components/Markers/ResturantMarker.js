import React from "react";
import "./styles.css";
const ResturantMarker = props => {
  if (props.$hover) {
    console.log("hover");
    console.log(props);
  }
  return (
    <div className="resturant-marker-container" onClick={props.onChildPress}>
      {props.index + 1}
      {". "}
      <span className="resturant-marker-text">{props.restaurant.name}</span>
    </div>
  );
};

export default ResturantMarker;
