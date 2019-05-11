import React from "react";
import "./styles.css";
const ResturantMarker = props => {
  
  const containerStyle = ()=>(props.isActive ? "resturant-marker-container-active": "resturant-marker-container");

  return (
    <div className={containerStyle()} onClick={props.onChildPress}>
      {props.index + 1}
      {". "}
      <span className="resturant-marker-text">{props.restaurant.name}</span>
    </div>
  );
};

export default ResturantMarker;
