import React from 'react';
import ChartTypeDisplay from './ChartTypeDisplay.jsx';
import { Button } from './../Styles/styledComponents';

const ChartTypeDisplayContainer = props => {
  // const charts = props.types.map((chart, i) => (
  //   <select></select>
  //   <ChartTypeDisplay
  //     type={chart}
  //     key={i}
  //   />
  // ));
  return (
    <Button onClick={props.changeGraph}>Change graph</Button>
  )
}

export default ChartTypeDisplayContainer;