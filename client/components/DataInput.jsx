import React from "react";


const DataInput = props =>  {
  return (
    <div id='data' onClick={props.changeDisplay}>
      Data Input
      {buildContent(props)}
    </div>
  )
}

const buildContent = props => {
  if (props.display !== 'data') return;
  return (
    <div>
      <input
        type="file"
        onChange={(e) => props.handleDataInput(e.target.files[0])}
        accept=".csv"
      />
    </div>
  )  
}
export default DataInput; 