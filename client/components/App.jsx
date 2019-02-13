import React, { Component } from 'react';
import path from 'path';

//import styled components
import { MainWrapper, Title, GraphAndOptionsWrapper } from './../Styles/styledComponents';

//import components to render
import ChartTypeDisplayContainer from './ChartsTypeDisplayContainer.jsx';
import OptionsDisplay from './OptionsDisplay.jsx';
import ChartDisplay from './ChartDisplay.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CodeDisplay from './CodeDisplay.jsx';

//The only stateful component
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: 200, value: 20 },
        { name: 300, value: 70 },
        { name: 300, value: 5 },
        { name: 500, value: 30 },
      ],
      // will be modified to reflect the code used to build the graph
      codeText: '',

      // reflect the type of graph chosen by user
      // defaulted to Bar Chart
      type: 'LineChart',

      // options that can be modified by user for each type
      // of graphs available in the app
      graphs: {
        BarChart: [
          'barColor',
          'barMargin',
          'chartHeight',
          'chartWidth',
          'chartBGColor',
          'chartTitle',
          'xTitle',
          'yTitle',
          'transition',
        ],
        PieChart: ['chartWidth', 'chartHeight', 'chartTitle'],
        LineChart: ['chartTitle', 'chartWidth', 'chartHeight'],
      },

      // all option options
      chartTitle: { value: 'Name', type: 'text' },
      chartHeight: { value: 300, type: 'number' },
      chartWidth: { value: 450, type: 'number' },
      chartBGColor: { value: '#fbfbfb', type: 'color' },
      xTitle: { value: 'Quartiles', type: 'text' },
      yTitle: { value: 'Rainfall (cm)', type: 'text' },
      barColor: { value: '#7e8471', type: 'color' },
      barMargin: { value: 2, type: 'number' },
      transition: { name: 'false', type: 'checkbox' },
    };

    // binding functions that are passed to children components
    this.handleChange = this.handleChange.bind(this);
    this.updateCodeText = this.updateCodeText.bind(this);
    this.changeGraph = this.changeGraph.bind(this);
  }

  // handle user interaction with inputs
  handleChange(e) {
    let { name, type, value } = e.target;

    // parses the inputs of type number to be stored as numbers (string by default)
    if (type === 'number') {
      value = Number(value);
    }
    const newObj = Object.assign({}, this.state[name]);
    newObj.value = value;

    // update the state for corresponding options
    this.setState({
      [name]: newObj,
    });
  }

  updateCodeText(codeText) {
    this.setState({ codeText });
  }

  changeGraph() {
    const newType = this.state.type === 'LineChart' ? 'BarChart' : 'LineChart';
    this.setState({
      type: newType,
    });
  }

  render() {
    const { graphs, type, codeText, data, imgs } = this.state;

    // filter out the options to only pass the props that correspond
    // to a chosen graph
    const optionsToPass = graphs[type].reduce((acc, option) => {
      acc[option] = this.state[option];
      return acc;
    }, {});
    return (
      <MainWrapper>
        {/* Navbar to be developed */}
        <Navbar />
        <Title>D3 Simplifier</Title>

        <ChartTypeDisplayContainer types={Object.keys(graphs)} changeGraph={this.changeGraph} />
        <GraphAndOptionsWrapper>
          {/* Container that has each option as a child components */}
          <OptionsDisplay options={optionsToPass} handleChange={this.handleChange} />
          <ChartDisplay
            options={optionsToPass}
            data={data}
            updateCodeText={this.updateCodeText}
            codeText={codeText}
            type={type}
          />
        </GraphAndOptionsWrapper>
        <CodeDisplay codeText={codeText} />
        <Footer />
      </MainWrapper>
    );
  }
}

export default App;
