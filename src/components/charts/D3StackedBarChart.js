import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import * as d3Tip from 'd3-tip'

class D3StackedBarChart extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    // const data = this.props.data;
    const margin = { top: 80, right: 80, bottom: 30, left: 60 }
    const width = containerWidth - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    let chart = d3
      .select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    let x = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)

    let y = d3.scaleLinear().rangeRound([height, 0])

    let z = d3.scaleOrdinal().range(d3.schemeCategory10)

    const data = this.props.data
    let keys = Object.keys(data[0]).slice(1)
    const names = {
      q1: '第一季度',
      q2: '第二季度',
      q3: '第三季度',
      q4: '第四季度'
    }

    let series = d3
      .stack()
      .keys(keys)
      .offset(d3.stackOffsetDiverging)(data)

    let tip = d3Tip() // 设置tip
      .attr('class', 'd3-tip stacked-demo')
      .offset([-10, 0])
      .html(function(d) {
        let total = d.data.q1 + d.data.q2 + d.data.q3 + d.data.q4
        return (
          '<strong>' +
          d.data.date +
          '年</strong><br>' +
          '<span style="color:' +
          z(keys[0]) +
          '">' +
          names.q1 +
          ': ' +
          d.data.q1 +
          ' 万</span><br>' +
          '<span style="color:' +
          z(keys[1]) +
          '">' +
          names.q2 +
          ': ' +
          d.data.q2 +
          ' 万</span><br>' +
          '<span style="color:' +
          z(keys[2]) +
          '">' +
          names.q3 +
          ': ' +
          d.data.q3 +
          ' 万</span><br>' +
          '<span style="color:' +
          z(keys[3]) +
          '">' +
          names.q4 +
          ': ' +
          d.data.q4 +
          ' 万</span><br>' +
          '<span style="color:#fff">年总: ' +
          total +
          ' 万</span>'
        )
      })

    chart.call(tip)

    x.domain(
      data.map(function(d) {
        return d.date
      })
    )
    y.domain([
      d3.min(series, function(serie) {
        return d3.min(serie, function(d) {
          return d[0]
        })
      }),
      d3.max(series, function(serie) {
        return d3.max(serie, function(d) {
          return d[1]
        })
      })
    ])

    let g = chart
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')') // 设最外包层在总图上的相对位置

    g.append('g') // 画柱状图
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .attr('fill', function(d) {
        return z(d.key)
      })
      .selectAll('rect')
      .data(function(d) {
        return d
      })
      .enter()
      .append('rect')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr('width', x.bandwidth)
      .attr('cursor', 'pointer')
      .attr('x', function(d) {
        return x(d.data.date)
      })
      .attr('height', 0)
      .attr('y', y(0))
      .transition()
      .duration(750)
      .delay(function(d, i) {
        return i * 10
      })
      .attr('y', function(d) {
        return y(d[1])
      })
      .attr('height', function(d) {
        return y(d[0]) - y(d[1])
      })

    g.append('g') // 画x轴
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + y(0) + ')')
      .call(d3.axisBottom(x))

    g.append('g') // 画y轴
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('利润(万)')

    let legend = g
      .append('g') // 画legend
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', 'translate(65,0)')
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice())
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 20 + ')'
      })

    legend
      .append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z)

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
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
      .text('XX公司近几年各季度产生利润情况汇总')
  }
  render() {
    return (
      <div className="bar-chart--stacked">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3StackedBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      q1: PropTypes.number,
      q2: PropTypes.number,
      q3: PropTypes.number,
      q4: PropTypes.number
    }).isRequired
  ).isRequired
}

export default D3StackedBarChart
