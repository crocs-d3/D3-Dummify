import React from 'react';
import ChartTypeDisplay from './ChartTypeDisplay.jsx';

const ChartTypeDisplayContainer = props => {
  // const charts = props.types.map((chart, i) => (
  //   <select></select>
  //   <ChartTypeDisplay
  //     type={chart}
  //     key={i}
  //   />
  // ));
  return (
    <button onClick={props.changeGraph}></button>
  )
}

export default ChartTypeDisplayContainer;