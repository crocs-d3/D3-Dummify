import React, { Component } from 'react';
import OptionsDisplay from './OptionsDisplay.jsx';
import DataInput from './DataInput.jsx';

class InputsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'options'
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(e) {
    let { id } = e.target;
    console.log(id);
    if (id === 'data' || id === 'options') {
      this.setState({ display: id });
    }
  }

  render() {
    return (
      <div>
        <OptionsDisplay
          options={this.props.options}
          handleChange={this.props.handleChange}
          display={this.state.display}
          changeDisplay={this.changeDisplay}
        />
        <DataInput
          display={this.state.display}
          changeDisplay={this.changeDisplay}
          handleDataInput={this.props.handleDataInput}
        />
      </div>
    );
  }
}

export default InputsDisplay;
