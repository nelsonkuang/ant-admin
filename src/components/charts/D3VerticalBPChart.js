import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import * as viz from '../../utils/d3-viz'

class D3VerticalBPChart extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const margin = { top: 80, right: 80, bottom: 30, left: 60 }
    const width = containerWidth - margin.left - margin.right
    const height = 1000 - margin.top - margin.bottom
    let chart = d3
      .select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    let z = d3.scaleOrdinal().range(d3.schemeCategory20)

    const data = this.props.data

    let g = [
      chart.append('g').attr('transform', 'translate(150,100)'),
      chart
        .append('g')
        .attr('transform', 'translate(' + (width / 2 + 150) + ', 100)')
    ]

    chart
      .append('text')
      .attr('x', 250)
      .attr('y', 70)
      .attr('class', 'vbp-header')
      .attr('font-size', '14px')
      .attr('font-weight', '700')
      .text('目标出货量')

    chart
      .append('text')
      .attr('x', width / 2 + 250)
      .attr('y', 70)
      .attr('class', 'vbp-header')
      .attr('font-size', '14px')
      .attr('font-weight', '700')
      .text('实际出货量')

    let bp = [
      viz
        .bP() // 定义两个BP图
        .data(data)
        .min(12)
        .pad(1)
        .height(700)
        .width(300)
        .barSize(35)
        .fill(d => z(d.primary)),
      viz
        .bP()
        .data(data)
        .value(d => d[3])
        .min(12)
        .pad(1)
        .height(700)
        .width(300)
        .barSize(35)
        .fill(d => z(d.primary))
    ]

    ;[0, 1].forEach(function(i) {
      // 输出两个BP图数据
      g[i].call(bp[i]) // 输出两个BP图

      g[i]
        .append('text')
        .attr('x', -50)
        .attr('y', -8)
        .style('text-anchor', 'middle')
        .text('出货渠道')
      g[i]
        .append('text')
        .attr('x', 350)
        .attr('y', -8)
        .style('text-anchor', 'middle')
        .text('城市')

      g[i]
        .selectAll('.mainBars')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)

      g[i]
        .selectAll('.mainBars')
        .append('text')
        .attr('class', 'label')
        .attr('x', d => (d.part === 'primary' ? -30 : 30))
        .attr('y', d => +6)
        .text(d => d.key)
        .attr('text-anchor', d => (d.part === 'primary' ? 'end' : 'start'))

      g[i]
        .selectAll('.mainBars')
        .append('text')
        .attr('class', 'perc')
        .attr('x', d => (d.part === 'primary' ? -100 : 80))
        .attr('y', d => +6)
        .text(function(d) {
          return d3.format('0.0%')(d.percent)
        })
        .attr('text-anchor', d => (d.part === 'primary' ? 'end' : 'start'))

      g[i]
        .selectAll('.mainBars') // hover
        .append('title')
        .text(function(d) {
          return d.key + '\n' + d.value + ' 台手机'
        })
    })

    chart
      .append('g') // 输出标题
      .attr('class', 'vertical-bp-chart--title')
      .append('text')
      .attr('fill', '#000')
      .attr('font-size', '16px')
      .attr('font-weight', '700')
      .attr('text-anchor', 'middle')
      .attr('x', containerWidth / 2)
      .attr('y', 20)
      .text('XX手机2016年全国各渠道出货量数据汇总')

    function mouseover(d) {
      ;[0, 1].forEach(function(i) {
        bp[i].mouseover(d)

        g[i]
          .selectAll('.mainBars')
          .select('.perc')
          .text(function(d) {
            return d3.format('0.0%')(d.percent)
          })

        g[i]
          .selectAll('.mainBars')
          .select('title')
          .text(function(d) {
            return d.key + '\n' + d.value + ' 台手机'
          })
      })
    }
    function mouseout(d) {
      ;[0, 1].forEach(function(i) {
        bp[i].mouseout(d)

        g[i]
          .selectAll('.mainBars')
          .select('.perc')
          .text(function(d) {
            return d3.format('0.0%')(d.percent)
          })

        g[i]
          .selectAll('.mainBars')
          .select('title')
          .text(function(d) {
            return d.key + '\n' + d.value + ' 台手机'
          })
      })
    }
  }
  render() {
    return (
      <div className="vertical-bp-chart--sample">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3VerticalBPChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired
}

export default D3VerticalBPChart
