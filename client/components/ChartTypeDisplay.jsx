import React from "react";

const ChartTypeDisplay = props => {
  const { type } = props;
  `~/`
  const src = `./../imgs/${type}`;
  return (
    <div>
      <h3>{type}</h3>
      {/* <img src={src} alt={type} /> */}
    </div>
  ) 
}

export default ChartTypeDisplay;