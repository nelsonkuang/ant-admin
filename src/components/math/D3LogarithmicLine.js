import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class D3LogarithmicLine extends React.Component {
  constructor(props) {
    super(props)
    this.logarithmicLine = {
      width: null,
      height: null,
      fy: (x, a = Math.E) => Math.log(x) / Math.log(a) // Y=logaX（a>0，且a≠1）
    }
  }
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const margin = { top: 40, right: 40, bottom: 40, left: 40 }
    this.logarithmicLine.width = containerWidth - margin.left - margin.right
    this.logarithmicLine.height = this.logarithmicLine.width
    const { width, height, fy } = this.logarithmicLine
    let chart = d3
      .select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    const a = this.props.a > 0 && this.props.a !== 1 ? this.props.a : Math.E
    let points = []
    let formatXY = d3.format('.2f')
    d3.range(0.05, 10, 0.05).forEach(function(item) {
      const itemX = formatXY(item)
      const itemY = formatXY(fy(itemX, a))
      points.push([itemX, itemY])
    })

    let x = d3
      .scaleLinear()
      .domain([-10, 10])
      .range([0, width])
    let y = d3
      .scaleLinear()
      .domain([10, -10])
      .range([0, height])

    let line = d3
      .line()
      .x(function(d) {
        return x(d[0])
      })
      .y(function(d) {
        return y(d[1])
      })

    let g = chart
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')') // 设最外包层在总图上的相对位置

    g.append('g') // 画x轴
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + y(0) + ')')
      .call(d3.axisBottom(x).ticks(20))
      .append('text')
      .attr('x', width)
      .attr('y', 26)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('fill', '#000')
      .style('font-size', '16px')
      .text('x')

    g.selectAll('.axis--x .tick') // x轴背景线
      .append('line')
      .attr('class', 'bg-line')
      .attr('stroke', 'rgba(0,0,0,0.1)')
      .attr('shape-rendering', 'crispEdges')
      .attr('transform', 'translate(' + 0 + ',' + -1 * y(0) + ')')
      .attr('y2', height)

    g.append('g') // 画y轴
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(' + x(0) + ',0)')
      .call(d3.axisLeft(y).tickValues(d3.range(-10, 11)))
      .append('text')
      .attr('y', -20)
      .attr('dy', '.71em')
      .style('text-anchor', 'start')
      .style('fill', '#000')
      .style('font-size', '16px')
      .text('y')

    g.selectAll('.axis--y .tick') // x轴背景线
      .append('line')
      .attr('class', 'bg-line')
      .attr('stroke', 'rgba(0,0,0,0.1)')
      .attr('shape-rendering', 'crispEdges')
      .attr('transform', 'translate(' + -1 * x(0) + ',' + 0 + ')')
      .attr('x2', width)

    g.append('g') // 输线条
      .attr('class', 'line-container')
      .datum(points)
      .append('path') // 绘画线条
      .attr('class', 'line')
      .style('stroke', 'blue')
      .attr('fill', 'none')
      .attr('d', line)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.a !== this.props.a) {
      // 更新线条
      const { width, height, fy } = this.logarithmicLine
      const a = nextProps.a > 0 && nextProps.a !== 1 ? nextProps.a : Math.E
      let points = []
      let formatXY = d3.format('.2f')
      d3.range(0.05, 10, 0.05).forEach(function(item) {
        const itemX = formatXY(item)
        const itemY = formatXY(fy(itemX, a))
        points.push([itemX, itemY])
      })
      let x = d3
        .scaleLinear()
        .domain([-10, 10])
        .range([0, width])
      let y = d3
        .scaleLinear()
        .domain([10, -10])
        .range([0, height])
      let line = d3
        .line()
        .x(function(d) {
          return x(d[0])
        })
        .y(function(d) {
          return y(d[1])
        })
      let g = d3.select(this.chartRef).select('.line-container')
      g.select('.line').remove()
      g.datum(points)
        .append('path') // 绘画线条
        .attr('class', 'line')
        .style('stroke', 'blue')
        .attr('fill', 'none')
        .attr('d', line)
    }
  }
  render() {
    return (
      <div className="logarithmic-line-simple">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}

D3LogarithmicLine.propTypes = {
  a: PropTypes.number
}

export default D3LogarithmicLine
