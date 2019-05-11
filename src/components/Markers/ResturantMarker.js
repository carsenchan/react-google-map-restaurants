import React from "react";
import "./styles.css";
const ResturantMarker = ({ text, lat, lng }) => (
  <div className="resturant-marker-container">{text}</div>
);

export default ResturantMarker;
