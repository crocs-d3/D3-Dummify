import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';

class Chart extends Component {
  constructor() {
    super();
    this.debouncerTracker = 0;
  }

  componentDidMount() {
    this.plotGraph();
    this.updateCode(this.props);
  }

  shouldComponentUpdate(nextProps) {
     /*
     * We need to manually decide wether or not the component should
     * re-render. Everytime a prop that relates to the graph changes,
     * we need to replot the graph. There are two problems:
     * 
     * 1) Every time we update the graph, we change a prop that represents
     * the code related with the graph being displayed on page. This would
     * trigger another re-render, so we need to tell the component NOT
     * to re-render if what fired it was a change to the codeText prop.
     * 
     * 2) When the user clicks and drags on the color picker, it changes
     * the props many times. This calls the plotGraph function too
     * frequently, so we need to debounce it so it only gets called, at
     * max, once every 100ms.
     */
    if (Date.now() - this.debouncerTracker < 100) return false;
    this.debouncerTracker = Date.now();

    if (nextProps.codeText === this.props.codeText) {
      this.updateCode(nextProps);
      return true;
    } 
    return false;
  }

  render() {
    var svg = ReactFauxDOM.createElement('svg');
    return (this.plotGraph(svg)).toReact()
  }
}

export default Chart;