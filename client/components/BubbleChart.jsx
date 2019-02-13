import * as d3 from 'd3';
import Chart from '../classes/Chart';

class BubbleChart extends Chart {
  plotGraph(el) {

    const svgWidth = this.props.options.chartWidth.value;
    const svgHeight = this.props.options.chartHeight.value;
    const chartName = this.props.options.chartTitle.value;
    // Constructs a new ordinal scale with the specified range
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    // decimal notation, rounded to integer.
    this.format = d3.format(',d');
    // Create a new circle-packing layout.
    this.pack = () =>
      d3
        .pack()
        .size([svgWidth - 2, svgHeight - 2])
        .padding(3)(d3.hierarchy({ children: this.props.data }).sum(d => d.value));
    // Constructs root node from data for hierarchy data types.
    const root = this.pack(this.props.data);
    // Style the <svg> element
    const svg = d3
      .select(el)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('font-size', 16)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');
    // Text label & style for Chart Name
    svg
      .append('text')
      .attr('transform', `translate(${svgWidth / 2},${svgHeight / 15})`)
      .style('font-size', '1.5em')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle')
      .text(chartName);
    // g is a container used to group other SVG elements
    // .leaves() returns the array of leaf nodes in traversal order
    // transform coordinates moving the element
    const leaf = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);
    // Create and style circles
    leaf
      .append('circle')
      .attr('r', d => d.r)
      .attr('fill-opacity', 0.7)
      .attr('fill', d => this.color(d.data.name));
    // Attach data names and values to each circle
    leaf
      .append('text')
      .selectAll('tspan')
      .data(d => d.data.name)
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d);
    
      return el;
  }

  updateCode(nextProps) {
    this.props.updateCodeText(`
    // Define basic graph properties
    const svgWidth = this.props.options.chartWidth.value;
    const svgHeight = this.props.options.chartHeight.value;
    const chartName = this.props.options.chartTitle.value;

    // Constructs a new ordinal scale with the specified range
    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    // decimal notation, rounded to integer.
    this.format = d3.format(',d');
    
    // Create a new circle-packing layout.
    this.pack = () =>
      d3
        .pack()
        .size([svgWidth - 2, svgHeight - 2])
        .padding(3)(d3.hierarchy({ children: this.props.data }).sum(d => d.value));

    // Constructs root node from data for hierarchy data types.
    const root = this.pack(this.props.data);

    // Style the <svg> element
    const svg = d3
      .select('svg#plot_cont')
      .style('width', svgWidth)
      .style('height', svgHeight)
      .attr('font-size', 16)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');

    // Text label & style for Chart Name
    svg
      .append('text')
      .attr('transform', \`translate(\${svgWidth / 2},\${svgHeight / 15})\`)
      .style('font-size', '1.5em')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle')
      .text(chartName);
    // g is a container used to group other SVG elements
    // .leaves() returns the array of leaf nodes in traversal order
    // transform coordinates moving the element
    const leaf = svg
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', d => \`translate(\${d.x + 1},\${d.y + 1})\`);
    // Create and style circles
    leaf
      .append('circle')
      .attr('r', d => d.r)
      .attr('fill-opacity', 0.7)
      .attr('fill', d => this.color(d.data.name));
    // Attach data names and values to each circle
    leaf
      .append('text')
      .selectAll('tspan')
      .data(d => d.data.name)
      .join('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => \`\${i - nodes.length / 2 + 0.8}em\`)
      .text(d => d);

      `);
  }
}
export default BubbleChart;
