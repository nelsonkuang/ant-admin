import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import * as d3Tip from 'd3-tip'

class D3SimpleLineChartII extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const data = this.props.data
    const margin = { top: 80, right: 80, bottom: 30, left: 60 }
    const width = containerWidth - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    const labelPadding = 3
    let chart = d3
      .select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    let g = chart
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')') // 设最外包层在总图上的相对位置
    const timeParse = d3.timeParse('%H:%M')

    const key = Object.keys(data[0])[1]
    const serieArr = data.map(function(d) {
      return {
        key: key,
        time: timeParse(d.time),
        value: d[key]
      }
    })
    const maxValue = d3.max(serieArr, function(d) {
      return d.value
    })
    const stepValue = 50 // 用于生成背景柱
    const rangeByStep = d3.range(0, maxValue, stepValue) // 用于生成背景柱
    const colors = [
      '#6bcd07',
      '#fbd029',
      '#fe8800',
      '#fe0000',
      '#970454',
      '#62001e'
    ] // 用于生成背景柱
    const names = ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']

    let x = d3
      .scaleTime() // 定义x轴
      .domain([serieArr[0].time, serieArr[data.length - 1].time])
      .range([0, width])

    let y = d3
      .scaleLinear() // 定义y轴
      .domain([0, maxValue])
      .range([height, 0])

    let z = d3.scaleOrdinal(d3.schemeCategory10) // 通用线条的颜色

    let line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x(function(d) {
        return x(d.time)
      })
      .y(function(d) {
        return y(d.value)
      })

    let tip = d3Tip() // 设置tip
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return (
          '<strong>时间 ' +
          d3.timeFormat('%H : %M')(d.time) +
          "<br>AQI 值:</strong> <span style='color:#ffeb3b'>" +
          d.value +
          '</span>'
        )
      })

    chart.call(tip)

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

    g.append('g') // 设置y轴
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).tickValues(d3.range(0, maxValue, stepValue)))
      .append('text')
      .attr('y', -16)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .text('AQI 值')

    g.append('g') // 设置背景柱
      .attr('class', 'lineii--bg-bar')
      .selectAll('rect')
      .data(rangeByStep)
      .enter()
      .append('rect')
      .attr('stroke', 'none')
      .attr('stroke-width', 0)
      .attr('fill', function(d, i) {
        return colors[i]
      })
      .attr('x', 1)
      .attr('width', width)
      .attr('height', function(d, i) {
        if (i !== rangeByStep.length - 1) {
          return y(maxValue - stepValue)
        } else {
          return y(rangeByStep[rangeByStep.length - 1])
        }
      })
      .attr('y', function(d, i) {
        if (i !== rangeByStep.length - 1) {
          return y(rangeByStep[i + 1])
        } else {
          return 0
        }
      })

    g.append('g') // 设置背景柱文字
      .attr('class', 'lineii--bg-bar-text')
      .selectAll('.ylabel') // 生成右边文字
      .data(rangeByStep)
      .enter()
      .append('text')
      .attr('class', 'ylabel')
      .attr('fill', '#fff')
      .attr('font-size', '24px')
      .attr('x', width / 2)
      .attr('y', function(d, i) {
        if (i !== rangeByStep.length - 1) {
          return y(rangeByStep[i + 1])
        } else {
          return 0
        }
      })
      .attr('dy', function(d, i) {
        if (i !== rangeByStep.length - 1) {
          return y(maxValue - stepValue) / 2
        } else {
          return y(rangeByStep[rangeByStep.length - 1]) / 2 + 8
        }
      })
      .attr('text-anchor', 'middle')
      .text(function(d, i) {
        return names[i]
      })

    g.append('g') // 生成x轴
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        d3
          .axisBottom(x)
          .ticks(24)
          .tickFormat(d3.timeFormat('%H:%M'))
      )

    g.selectAll('.axis--x .tick') // xx轴背景线
      .append('line')
      .attr('class', 'bg-line')
      .attr('stroke', 'rgba(255,255,255,0.5)')
      .attr('stroke-dasharray', '2,2')
      .attr('shape-rendering', 'crispEdges')
      .attr('transform', 'translate(' + 0 + ',' + -1 * height + ')')
      .attr('y2', height)
    g.select('.bg-line').remove()

    let serie = g
      .selectAll('.serie') // 生成线条
      .data([serieArr])
      .enter()
      .append('g')
      .attr('class', 'serie')

    serie
      .append('path') // 绘画线条
      .attr('clip-path', 'url(#clip)')
      .attr('class', 'line')
      .style('stroke', function(d) {
        return z(d[0].key)
      })
      .style('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', line)

    let label = serie
      .selectAll('.label') // 生成文字包层
      .data(function(d) {
        return d
      })
      .enter()
      .append('g')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr('cursor', 'pointer')
      .attr('class', 'label')
      .attr('transform', function(d, i) {
        return 'translate(' + x(d.time) + ',' + y(d.value) + ')'
      })

    label
      .append('text') // 生成数值文字
      .attr('dy', '.35em')
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return d.value
      })

    label
      .insert('rect', 'text') // 生成背景白块
      .datum(function() {
        return this.nextSibling.getBBox()
      })
      .attr('fill', 'rgba(0,0,0,0.5)')
      .attr('rx', '5px')
      .attr('ry', '5px')
      .attr('x', function(d) {
        return d.x - labelPadding
      })
      .attr('y', function(d) {
        return d.y - labelPadding
      })
      .attr('width', function(d) {
        return d.width + 2 * labelPadding
      })
      .attr('height', function(d) {
        return d.height + 2 * labelPadding
      })

    chart
      .append('g') // 输出标题
      .attr('class', 'line-title')
      .append('text')
      .attr('fill', '#000')
      .attr('font-weight', '700')
      .attr(
        'transform',
        'translate(' + (width / 2 + margin.left) + ',' + 20 + ')'
      )
      .attr('text-anchor', 'middle')
      .attr('x', 0)
      .attr('y', 0)
      .text('XX市昨天PM2.5及空气质量指数(AQI)')
  }
  render() {
    return (
      <div className="line-chart--simpleII">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3SimpleLineChartII.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      pm25: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
}

export default D3SimpleLineChartII
