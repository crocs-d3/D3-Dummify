import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';

class Chart extends Component {
  constructor() {
    super();
    this.debouncerTracker = 0;
  }

  componentDidMount() {
    // this.plotGraph();
    this.updateCode(this.props);
  }

  render() {
    console.log('render');
    var svg = ReactFauxDOM.createElement('svg');
    return (this.plotGraph(svg)).toReact()
    return <h2>Hello</h2>
  }
}

export default Chart;