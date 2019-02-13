console.log(this.data);
this.svgWidth = this.props.options.chartWidth.value;
this.svgHeight = this.props.options.chartHeight.value;

this.margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 50,
};
this.width = this.svgWidth - this.margin.left - this.margin.right;
this.height = this.svgHeight - this.margin.top - this.margin.bottom;

// .select(): Select the first element that matches the specified selector string.
// If no elements match the selector, returns an empty selection.
// If multiple elements match the selector, only the first matching element (in document order) will be selected.

// .attr(): Sets the value of the attribute with the specified name for the selected elements and returns this selection.
// All elements are given the same attribute value.
this.svg = d3
  .select('svg#plot_cont')
  .attr('width', this.svgWidth)
  .attr('height', this.svgHeight);

// .append(): Appends a new element of this type (tag name) as the last child of each selected element,
// or before the next following sibling in the update selection if this is an enter selection.
this.g = this.svg
  .append('g')
  .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

// .scaleTime(): Constructs a new time scale using local time with the domain [2000-01-01, 2000-01-02],
// the unit range [0, 1], the default interpolator and clamping disabled.
// The scale will have range and output of data type number.

// .rangeRound(): Sets the scale’s range to the specified array of values while also setting the scale’s interpolator to interpolateRound.
// The array must contain two or more elements. Unlike the domain, elements in the given array need not be temporal domain values;
// any value that is supported by the underlying interpolator will work
this.x = d3.scaleTime().rangeRound([0, this.width]);

// .scaleLinear(): Constructs a new continuous linear scale with the unit domain [0, 1], the unit range [0, 1], the default interpolator and clamping disabled.
// The scale will have range and output of data type number.
this.y = d3.scaleLinear().rangeRound([this.height, 0]);

// line(): Contruct a new line generator with the default settings

// .x(): Sets the x accessor to the specified function and returns this line generator.
// When a line is generated, the x accessor will be invoked for each defined element in the input data array.

// .y(): Sets the y accessor to the specified function and returns this line generator.
// When a line is generated, the y accessor will be invoked for each defined element in the input data array.
this.line = d3
  .line()
  .x(d => this.x(d.date))
  .y(d => this.y(d.value));

// .domain(): Sets the scale’s domain to the specified array of temporal domain values.
// The array must contain two or more elements. If the elements in the given array are not dates, they will be coerced to dates.

// .extent(): Return the min and max simultaneously.
this.x.domain(d3.extent(this.data, d => d.date));
this.y.domain(d3.extent(this.data, d => d.value));

// Create a line, rotate it, style it, and use it as the x-axis
this.g
  .append('g')
  .attr('transform', `translate(0,${this.height})`)
  // .call(): Invoke the specified function exactly once, passing in this selection along with any optional arguments.
  // Returns this selection.

  // .axisBottom(): Constructs a new bottom-oriented axis generator for the given scale, with empty tick arguments, a tick size of 6 and padding of 3.
  // In this orientation, ticks are drawn below the horizontal domain path.
  .call(d3.axisBottom(this.x))
  .select('.domain')

  // ..remove(): Removes the selected elements from the document.
  // Returns this selection (the removed elements) which are now detached from the DOM.
  .remove();

// Create a line, rotate it, style it, and use it as the y-axis
this.g
  .append('g')
  // .axisLeft(): Constructs a new left-oriented axis generator for the given scale, with empty tick arguments, a tick size of 6 and padding of 3.
  // In this orientation, ticks are drawn to the left of the vertical domain path.
  .call(d3.axisLeft(this.y))
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
this.g
  .append('path')
  // .datum(): Sets the element’s bound data to the specified value on all selected elements.
  // Unlike selection.data, this method does not compute a join and does not affect indexes or the enter and exit selections.
  .datum(this.data)
  .attr('fill', 'none')
  .attr('stroke', 'steelblue')
  .attr('stroke-linejoin', 'round')
  .attr('stroke-linecap', 'round')
  .attr('stroke-width', 1.5)
  .attr('d', this.line);

// Position, and style the title of the graph
this.g
  .append('text')
  .attr('x', this.width / 2)
  .attr('y', 0 + this.margin.top / 2)
  .attr('text-anchor', 'middle')
  // .style(): Sets the value of the style with the specified name for the selected elements and returns this selection.
  // All elements are given the same style value.
  .style('font-size', '16px')
  .style('text-decoration', 'underline')
  .text(this.props.options.chartTitle.value);
