import React from 'react';
import { OptionsTitle } from '../Styles/styledComponents';

const DataInput = props => {
  return (
    <div>
      <OptionsTitle id="data" onClick={props.changeDisplay}>
        Data Input
      </OptionsTitle>
      {buildContent(props)}
    </div>
  );
};

const buildContent = props => {
  if (props.display !== 'data') return;
  return (
    <div>
      <input type="file" onChange={e => props.handleDataInput(e.target.files[0])} accept=".csv" />
    </div>
  );
};
export default DataInput;
