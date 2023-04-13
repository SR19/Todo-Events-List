import "../../styles.css";
import React from "react";

export default function NoResponseComponent({ mainText, subText }) {
  return (
    <div className="NRComp">
      <h2>{mainText}</h2>
      <h4>{subText}</h4>
    </div>
  );
}
