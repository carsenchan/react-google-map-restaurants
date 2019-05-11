import React from "react";
import "./styles.css";
const CurrentMarker = ({ text, lat, lng }) => (
  <div className="current-marker-container">{text}</div>
);

export default CurrentMarker;
