import React from 'react';
import OptionDisplay from './OptionDisplay.jsx';
import { OptionsWrapper, OptionsTitle } from './../Styles/styledComponents';

const OptionsDisplay = props => {
  // iterate through the options passed in
  // and create a component to display each of them
  return (
    <OptionsWrapper>
      <OptionsTitle id="options" onClick={props.changeDisplay}>
        Options
      </OptionsTitle>
      {buildOptions(props)}
    </OptionsWrapper>
  );
};

const buildOptions = props => {
  if (props.display !== 'options') return;
  return Object.keys(props.options).map((option, i) => (
    <OptionDisplay
      name={option}
      value={props.options[option].value}
      type={props.options[option].type}
      handleChange={props.handleChange}
      key={i}
    />
  ));
};

export default OptionsDisplay;
