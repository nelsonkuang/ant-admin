import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import * as d3Tip from 'd3-tip'
import * as scaleRadial from '../../utils/d3-scale-radial'

class D3RadialStackedBarChart extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const containerHeight = 800
    const margin = { top: 80, right: 80, bottom: 30, left: 60 }
    const width = containerWidth - margin.left - margin.right
    const height = containerHeight - margin.top - margin.bottom

    const innerRadius = 180
    const outerRadius = Math.min(width, height) * 0.5

    let chart = d3
      .select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    let x = d3
      .scaleBand() // 定义x轴
      .range([0, 2 * Math.PI])
      .align(0)

    let y = scaleRadial().range([innerRadius, outerRadius]) // 定义y轴

    let z = d3
      .scaleOrdinal() //通用颜色
      .range(d3.schemeCategory10)

    const data = this.props.data
    let keys = Object.keys(data[0]).slice(1)
    const names = {
      q1: '第一季度',
      q2: '第二季度',
      q3: '第三季度',
      q4: '第四季度'
    }

    let series = d3
      .stack() // 定义堆栈图
      .keys(keys)
      .offset(d3.stackOffsetDiverging)(data)

    x.domain(
      data.map(function(d) {
        return d.city
      })
    ) // x与y轴的值域

    y.domain([
      0,
      d3.max(series, function(serie) {
        return d3.max(serie, function(d) {
          return d[1]
        })
      })
    ])

    let tip = d3Tip() // 设置tip
      .attr('class', 'd3-tip stacked-demo')
      .offset([-10, 0])
      .html(function(d) {
        let total = d.data.q1 + d.data.q2 + d.data.q3 + d.data.q4
        return (
          '<strong>' +
          d.data.city +
          '</strong><br>' +
          '<span style="color:' +
          z(keys[0]) +
          '">' +
          names.q1 +
          ': ' +
          d.data.q1 +
          ' 亿</span><br>' +
          '<span style="color:' +
          z(keys[1]) +
          '">' +
          names.q2 +
          ': ' +
          d.data.q2 +
          ' 亿</span><br>' +
          '<span style="color:' +
          z(keys[2]) +
          '">' +
          names.q3 +
          ': ' +
          d.data.q3 +
          ' 亿</span><br>' +
          '<span style="color:' +
          z(keys[3]) +
          '">' +
          names.q4 +
          ': ' +
          d.data.q4 +
          ' 亿</span><br>' +
          '<span style="color:#fff">年总: ' +
          total +
          ' 亿</span>'
        )
      })

    chart.call(tip)

    let g = chart
      .append('g')
      .attr(
        'transform',
        'translate(' + containerWidth / 2 + ',' + containerHeight * 0.5 + ')'
      ) // 设最外包层在总图上的相对位置

    chart
      .append('defs')
      .append('clipPath') // 添加圆形遮罩
      .attr('id', 'clip')
      .append('circle')
      .attr('r', 0)
      .transition()
      .duration(800)
      .attr('r', outerRadius)

    let label = g
      .append('g') // 画x轴
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('text-anchor', 'middle')
      .attr('transform', function(d) {
        return (
          'rotate(' +
          (((x(d.city) + x.bandwidth() / 2) * 180) / Math.PI - 90) +
          ')translate(' +
          innerRadius +
          ',0)'
        )
      })

    label
      .append('line')
      .attr('x2', -5)
      .attr('stroke', '#000')

    label
      .append('text')
      .attr('transform', function(d) {
        return (x(d.city) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) <
          Math.PI
          ? 'rotate(90)translate(0,16)'
          : 'rotate(-90)translate(0,-9)'
      })
      .text(function(d) {
        return d.city
      })

    let yAxis = g
      .append('g') // 画y轴圈圈及文字
      .attr('text-anchor', 'end')

    let yTick = yAxis
      .selectAll('g')
      .data(y.ticks(6).slice(1))
      .enter()
      .append('g')

    yTick
      .append('circle')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.5)
      .attr('r', y)

    yTick
      .append('text')
      .attr('x', -6)
      .attr('y', function(d) {
        return -y(d)
      })
      .attr('dy', '0.35em')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 5)
      .text(y.tickFormat(6, 'r'))

    yTick
      .append('text')
      .attr('x', -6)
      .attr('y', function(d) {
        return -y(d)
      })
      .attr('dy', '0.35em')
      .text(y.tickFormat(6, 'r'))

    yAxis
      .append('text')
      .attr('x', -6)
      .attr('y', function(d) {
        return -y(y.ticks(6).pop())
      })
      .attr('dy', '-1em')
      .text('GDP(亿)')

    g.append('g') // 画柱状图
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .attr('clip-path', 'url(#clip)')
      .attr('fill', function(d) {
        return z(d.key)
      })
      .selectAll('path')
      .data(function(d) {
        return d
      })
      .enter()
      .append('path')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr('cursor', 'pointer')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(function(d) {
            return y(d[0])
          })
          .outerRadius(function(d) {
            return y(d[1])
          })
          .startAngle(function(d) {
            return x(d.data.city)
          })
          .endAngle(function(d) {
            return x(d.data.city) + x.bandwidth()
          })
          .padAngle(0.01)
          .padRadius(innerRadius)
      )

    let legend = g
      .append('g') // 画legend
      .selectAll('g')
      .data(keys.slice())
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return 'translate(-40,' + (i - (keys.length - 1) / 2) * 20 + ')'
      })

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', z)

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '0.35em')
      .text(function(d) {
        return names[d]
      })

    chart
      .append('g') // 输出标题
      .attr('class', 'grouped-bar--title')
      .append('text')
      .attr('fill', '#000')
      .attr('font-size', '16px')
      .attr('font-weight', '700')
      .attr('text-anchor', 'middle')
      .attr('x', containerWidth / 2)
      .attr('y', 20)
      .text('XX省2016年各季度GDP汇总')
  }
  render() {
    return (
      <div className="bar-chart--radial-stacked">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3RadialStackedBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      q1: PropTypes.number,
      q2: PropTypes.number,
      q3: PropTypes.number,
      q4: PropTypes.number
    }).isRequired
  ).isRequired
}

export default D3RadialStackedBarChart
