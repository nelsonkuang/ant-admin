import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class D3SimpleAreaChart extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const margin = { top: 80, right: 40, bottom: 130, left: 40 }
    const margin2 = { top: 410, right: 40, bottom: 60, left: 40 }
    const width = containerWidth - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    const height2 = 500 - margin2.top - margin2.bottom
    let chart = d3
      .select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height2 + margin2.top + margin2.bottom) // 设置总宽高
    const rawData = this.props.rawData
    const parseDate = d3.timeParse('%Y-%m')

    const data = rawData.map(item => {
      // 把原始数据转为d3可接受的数据
      return { ...item, day: parseDate(item.day) }
    })

    let x = d3
      .scaleTime()
      .range([0, width])
      .domain(
        d3.extent(data, function(d) {
          return d.day
        })
      ) // 设置mainChart x轴
    let x2 = d3
      .scaleTime()
      .range([0, width])
      .domain(x.domain()) // 设置subChart x轴
    let y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([
        0,
        d3.max(data, function(d) {
          return d.quantity
        })
      ]) // 设置mainChart y轴
    let y2 = d3
      .scaleLinear()
      .range([height2, 0])
      .domain(y.domain()) // 设置subChart y轴

    const brush = d3
      .brushX() // 设置brush
      .extent([[0, 0], [width, height2]])
      .on('brush end', brushed)

    const zoom = d3
      .zoom() // 设置zoom
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', zoomed)

    chart
      .append('defs')
      .append('clipPath') // 添加长方形方块，遮罩作用
      .attr('id', 'clip')
      .append('rect')
      .attr('height', height)
      .attr('width', 0) // 用遮罩实现线动画
      .transition()
      .duration(1000)
      .attr('width', width)

    /***  mainChart部分  ***/
    const mainAreaPath = d3
      .area() // 设置mainChart面积图路径
      .curve(d3.curveMonotoneX)
      .x(function(d, i) {
        return x(d.day)
      })
      .y1(function(d, i) {
        return y(d.quantity)
      })
      .y0(y(0))

    const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat('%Y年%m月'))

    let mainChart = chart
      .append('g')
      .attr('class', 'main-chart')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')') // 设mainChart在最外包层在总图上的相对位置

    mainChart
      .append('g') // 设置x轴
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)

    mainChart
      .append('g') // 设置y轴
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('y', -16)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .text('顾客人数 (人)')

    mainChart
      .selectAll('.axis--y .tick') // 画背景线
      .append('line')
      .attr('class', 'bg-line')
      .attr('stroke', '#fff1c9')
      .attr('shape-rendering', 'crispEdges')
      .attr('x2', width)
    mainChart.select('.axis--y .bg-line:last-of-type').remove()

    mainChart
      .append('path') // 画面积图
      .attr('class', 'area')
      .datum(data)
      .attr('d', mainAreaPath)
      .attr('stroke', 'none')
      .attr('stroke-width', 1)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'steelblue')

    let circles = mainChart.append('g') // 输出点

    let values = mainChart
      .append('g') // 输出图上的数值
      .attr('class', 'area--text')

    /***  subChart部分  ***/
    const subAreaPath = d3
      .area() // 设置subChart面积图路径
      .curve(d3.curveMonotoneX)
      .x(function(d) {
        return x2(d.day)
      })
      .y0(height2)
      .y1(function(d) {
        return y2(d.quantity)
      })
    let subChart = chart
      .append('g')
      .attr('class', 'sub-chart')
      .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')') // 设subChart在最外包层在总图上的相对位置

    subChart
      .append('g') // 设置x轴
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(d3.axisBottom(x2).tickFormat(d3.timeFormat('%Y年%m月')))

    subChart
      .append('path') // 画面积图
      .attr('class', 'area')
      .datum(data)
      .attr('d', subAreaPath)
      .attr('stroke', 'none')
      .attr('stroke-width', 1)
      .attr('fill', 'steelblue')

    subChart
      .append('g') // 添加画刷
      .attr('class', 'brush')
      .call(brush)
      .call(brush.move, [(width * 2) / 3, width])

    /***  其他部分  ***/
    chart
      .append('rect') // 添加刷放方块
      .attr('class', 'zoom')
      .attr('width', width)
      .attr('height', height)
      .attr('cursor', 'move')
      .attr('pointer-events', 'all')
      .attr('fill', 'none')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom)

    chart
      .append('g') // 输出标题
      .attr('class', 'chart--title')
      .append('text')
      .attr('fill', '#000')
      .attr('font-size', '16px')
      .attr('font-weight', '700')
      .attr('transform', 'translate(' + 0 + ',' + 20 + ')')
      .attr('text-anchor', 'middle')
      .attr('x', containerWidth / 2)
      .attr('y', 0)
      .text('2017年饭店每月接待顾客人数')

    /***  函数部分  ***/
    function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return // ignore brush-by-zoom
      let s = d3.event.selection || x2.range()
      x.domain(s.map(x2.invert, x2))
      mainChart.select('.area').attr('d', mainAreaPath)
      mainChart.select('.axis--x').call(xAxis)
      addPointsAndValues()
      chart
        .select('.zoom')
        .call(
          zoom.transform,
          d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
        )
    }

    function zoomed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return // ignore zoom-by-brush
      let t = d3.event.transform
      x.domain(t.rescaleX(x2).domain())
      mainChart.select('.area').attr('d', mainAreaPath)
      mainChart.select('.axis--x').call(xAxis)
      addPointsAndValues()
      subChart.select('.brush').call(brush.move, x.range().map(t.invertX, t))
    }

    function addPointsAndValues() {
      // 动态修改添加的点和值
      circles.selectAll('circle').remove()
      circles
        .selectAll('circle')
        .attr('class', 'points')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', function(d) {
          let cx = x(d.day)
          if (cx >= 0 && cx <= width) {
            return 'orange'
          } else {
            return 'none'
          }
        })
        .attr('cx', function(d) {
          return x(d.day)
        })
        .attr('cy', function(d) {
          return y(d.quantity)
        })
        .attr('r', 5)

      values.selectAll('text').remove()
      values
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('fill', function(d) {
          let cx = x(d.day)
          if (cx >= 0 && cx <= width) {
            return '#000'
          } else {
            return 'none'
          }
        })
        .attr('font-size', '12px')
        .attr('text-anchor', 'middle')
        .attr('x', function(d, i) {
          return x(d.day)
        })
        .attr('y', function(d) {
          return y(d.quantity)
        })
        .attr('dx', '1.5em')
        .attr('dy', '0.1em')
        .text(function(d) {
          return d.quantity
        })
    }
  }
  render() {
    return (
      <div className="area-chart--simple" style={{ width: '100%' }}>
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3SimpleAreaChart.propTypes = {
  rawData: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
}

export default D3SimpleAreaChart
