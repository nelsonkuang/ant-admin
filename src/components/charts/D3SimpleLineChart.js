import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class D3SimpleLineChart extends React.Component {
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

    const names = { apple: '苹果', banana: '香蕉' }

    const series = d3
      .map(data[0])
      .keys()
      .slice(1)
      .map(function(key) {
        // 生成两条线的数组
        return data.map(function(d) {
          return {
            key: key,
            date: d3.timeParse('%Y')(d.date),
            value: d[key]
          }
        })
      })

    let x = d3
      .scaleTime() // 定义x轴
      .domain([
        d3.timeParse('%Y')(data[0].date),
        d3.timeParse('%Y')(data[data.length - 1].date)
      ])
      .range([0, width])

    let y = d3
      .scaleLinear() // 定义y轴
      .domain([
        0,
        d3.max(series, function(s) {
          return d3.max(s, function(d) {
            return d.value
          })
        })
      ])
      .range([height, 0])

    let z = d3.scaleOrdinal(d3.schemeCategory10) // 通用线条的颜色

    let line = d3
      .line()
      .x(function(d) {
        return x(d.date)
      })
      .y(function(d) {
        return y(d.value)
      })

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

    g.append('g') // 生成x轴
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%Y年')))

    let serie = g
      .selectAll('.serie') // 生成两线条
      .data(series)
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
      .attr('fill', 'none')
      .attr('d', line)

    let label = serie
      .selectAll('.label') // 生成文字包层
      .data(function(d) {
        return d
      })
      .enter()
      .append('g')
      .attr('class', 'label')
      .attr('transform', function(d, i) {
        return 'translate(' + x(d.date) + ',' + y(d.value) + ')'
      })

    label
      .append('text') // 生成数值文字
      .attr('dy', '.35em')
      .attr('fill', '#000')
      .text(function(d) {
        return d.value + ' 吨'
      })
      .filter(function(d, i) {
        return i === data.length - 1
      })
      .append('tspan') // 生成名文字
      .attr('class', 'label-key')
      .attr('fill', '#000')
      .attr('font-size', '14px')
      .text(function(d) {
        return ' ' + names[d.key]
      })

    label
      .insert('rect', 'text') // 生成背景白块
      .datum(function() {
        return this.nextSibling.getBBox()
      })
      .attr('fill', '#fff')
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
      .text('最近几年XX本地年产苹果香蕉数量')
  }
  render() {
    return (
      <div className="line-chart--simple">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3SimpleLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      apple: PropTypes.number.isRequired,
      banana: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
}

export default D3SimpleLineChart
