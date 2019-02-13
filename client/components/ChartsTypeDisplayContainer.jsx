import React from 'react';
import ChartTypeDisplay from './ChartTypeDisplay.jsx';
import { PreviewsWrapper } from './../Styles/styledComponents';

const ChartTypeDisplayContainer = props => {
  const charts = props.types.map((chart, i) => (
    <ChartTypeDisplay
      type={chart}
      key={i}
      changeGraph={props.changeGraph}
    />
  ));
  return (
    <PreviewsWrapper>
      {charts}
    </PreviewsWrapper>
  )
}

export default ChartTypeDisplayContainer;