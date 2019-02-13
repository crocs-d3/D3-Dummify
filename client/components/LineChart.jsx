import * as d3 from 'd3';
import Chart from '../classes/Chart';

class LineChart extends Chart {
  plotGraph(el) {
    const svgWidth = this.props.options.chartWidth.value;
    const svgHeight = this.props.options.chartHeight.value;

    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // .select(): Select the first element that matches the specified selector string.
    // If no elements match the selector, returns an empty selection.
    // If multiple elements match the selector, only the first matching element (in document order) will be selected.

    // .attr(): Sets the value of the attribute with the specified name for the selected elements and returns this selection.
    // All elements are given the same attribute value.
   const svg = d3
      .select(el)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // .append(): Appends a new element of this type (tag name) as the last child of each selected element,
    // or before the next following sibling in the update selection if this is an enter selection.
     const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // .scaleTime(): Constructs a new time scale using local time with the domain [2000-01-01, 2000-01-02],
    // the unit range [0, 1], the default interpolator and clamping disabled.
    // The scale will have range and output of data type number.

    // .rangeRound(): Sets the scale’s range to the specified array of values while also setting the scale’s interpolator to interpolateRound.
    // The array must contain two or more elements. Unlike the domain, elements in the given array need not be temporal domain values;
    // any value that is supported by the underlying interpolator will work
    const x = d3.scaleTime().rangeRound([0, width]);

    // .scaleLinear(): Constructs a new continuous linear scale with the unit domain [0, 1], the unit range [0, 1], the default interpolator and clamping disabled.
    // The scale will have range and output of data type number.
     const y = d3.scaleLinear().rangeRound([height, 0]);

    // line(): Contruct a new line generator with the default settings

    // .x(): Sets the x accessor to the specified function and returns this line generator.
    // When a line is generated, the x accessor will be invoked for each defined element in the input data array.

    // .y(): Sets the y accessor to the specified function and returns this line generator.
    // When a line is generated, the y accessor will be invoked for each defined element in the input data array.
    const line = d3
      .line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    // .domain(): Sets the scale’s domain to the specified array of temporal domain values.
    // The array must contain two or more elements. If the elements in the given array are not dates, they will be coerced to dates.

    console.log(this.props.data);
    // .extent(): Return the min and max simultaneously.
    x.domain(d3.extent(this.props.data, d => d.date));
    y.domain(d3.extent(this.props.data, d => d.value));

    // Create a line, rotate it, style it, and use it as the x-axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      // .call(): Invoke the specified function exactly once, passing in this selection along with any optional arguments.
      // Returns this selection.

      // .axisBottom(): Constructs a new bottom-oriented axis generator for the given scale, with empty tick arguments, a tick size of 6 and padding of 3.
      // In this orientation, ticks are drawn below the horizontal domain path.
      .call(d3.axisBottom(x))
      .select('.domain')

      // ..remove(): Removes the selected elements from the document.
      // Returns this selection (the removed elements) which are now detached from the DOM.
      .remove();

    // Create a line, rotate it, style it, and use it as the y-axis
    g.append('g')
      // .axisLeft(): Constructs a new left-oriented axis generator for the given scale, with empty tick arguments, a tick size of 6 and padding of 3.
      // In this orientation, ticks are drawn to the left of the vertical domain path.
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')

      // .text(): Sets the text content to the specified value on all selected elements, replacing any existing child elements.
      // All elements are given the same text content.
      .text('Price ($)');

    // Set the propertis of the line to be displayed on the graph.
    g.append('path')
      // .datum(): Sets the element’s bound data to the specified value on all selected elements.
      // Unlike selection.data, this method does not compute a join and does not affect indexes or the enter and exit selections.
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Position, and style the title of the graph
    g.append('text')
      .attr('x', width / 2)
      .attr('y', 0 + margin.top / 2)
      .attr('text-anchor', 'middle')
      // .style(): Sets the value of the style with the specified name for the selected elements and returns this selection.
      // All elements are given the same style value.
      .style('font-size', '16px')
      .style('text-decoration', 'underline')
      .text(this.props.options.chartTitle.value);
    
    return el;
  }

  updateCode(nextProps) {
    // this.props.updateCodeText()
  }
}

export default LineChart;