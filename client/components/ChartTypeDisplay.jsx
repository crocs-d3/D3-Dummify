import React from "react";

const ChartTypeDisplay = props => {
  const { type } = props;
  const src = require(`./../imgs/${type}.png`);
  // console.log('src', src);
  return (
    <div>
      <h4>{type}</h4>
      <img
        src={require(`./../imgs/${type}.png`)}
        width="120px"
        alt={type}
        onClick={props.changeGraph} 
      />
    </div>
  ) 
}

export default ChartTypeDisplay;