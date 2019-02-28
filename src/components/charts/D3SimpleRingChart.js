import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class D3SimpleRingChart extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const margin = { top: 80, right: 60, bottom: 80, left: 60 }
    const width = containerWidth - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom
    let chart = d3
      .select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom) // 设置总宽高

    const radius = Math.min(width, height) / 2

    let g = chart
      .append('g')
      .attr(
        'transform',
        'translate(' +
          (width / 2 + margin.left) +
          ',' +
          (margin.top + radius) +
          ')'
      ) // 设最外包层在总图上的相对位置

    let colors = d3
      .scaleOrdinal()
      .range([
        '#98abc5',
        '#8a89a6',
        '#7b6888',
        '#6b486b',
        '#a05d56',
        '#d0743c',
        '#ff8c00'
      ])

    let arc = d3
      .arc() // 定义单个圆弧
      // .outerRadius(radius - 10)
      .innerRadius(radius - 70)
      .padAngle(0.03)

    let ageLabelArc = d3
      .arc() // 定义单个圆弧里面的age文字
      .outerRadius(radius - 60)
      .innerRadius(radius - 60)

    let percentLabelArc = d3
      .arc() // 定义单个圆弧里面的percent文字
      .outerRadius(radius - 20)
      .innerRadius(radius - 20)

    let populationLabelArc = d3
      .arc() // 定义单个圆弧里面的population文字
      .outerRadius(radius + 20)
      .innerRadius(radius + 20)

    let pie = d3
      .pie() // 定义饼图
      .sort(null)
      .value(function(d) {
        return d.population
      })

    const data = this.props.data

    const sumData = d3.sum(data, function(d) {
      return d.population
    })
    colors.domain(
      d3
        .map(data, function(d) {
          return d.age
        })
        .keys()
    ) // 定义颜色值域

    g.selectAll('.arc') // 画环图
      .data(pie(data))
      .enter()
      .append('path')
      .each(function(d) {
        // 储存当前起始与终点的角度、并设为相等
        let tem = { ...d, endAngle: d.startAngle }
        d.outerRadius = radius - 10
        this._currentData = tem
      })
      .on('mouseover', arcTween(radius + 50, 0))
      .on('mouseout', arcTween(radius - 10, 150))
      .attr('cursor', 'pointer')
      .attr('class', 'arc')
      .style('fill', function(d) {
        return colors(d.data.age)
      })
      .transition()
      .duration(750)
      .attrTween('d', function(next) {
        // 动态设置d属性、生成动画
        var i = d3.interpolate(this._currentData, next)
        this._currentData = i(0) // 重设当前角度
        return function(t) {
          return arc(i(t))
        }
      })

    const arcs = pie(data) // 构造圆弧

    let label = g.append('g')
    arcs.forEach(function(d) {
      // 输出age文字
      const c = ageLabelArc.centroid(d)
      label
        .append('text')
        .attr('class', 'age-text')
        .attr('fill', '#000')
        .attr('font-size', '12px')
        .attr('text-anchor', 'middle')
        .attr('x', c[0])
        .attr('y', c[1])
        .text(d.data.age + '岁')
    })

    arcs.forEach(function(d) {
      // 输出percent文字
      const c = percentLabelArc.centroid(d)
      label
        .append('text')
        .attr('class', 'age-text')
        .attr('fill', '#cddc39')
        .attr('font-weight', '700')
        .attr('font-size', '14px')
        .attr('text-anchor', 'middle')
        .attr('x', c[0])
        .attr('y', c[1])
        .text(((d.data.population * 100) / sumData).toFixed(1) + '%')
    })

    arcs.forEach(function(d) {
      // 输出population文字
      var c = populationLabelArc.centroid(d)
      label
        .append('text')
        .attr('class', 'age-text')
        .attr('fill', '#000')
        .attr('font-size', '12px')
        .attr('text-anchor', 'middle')
        .attr('x', c[0])
        .attr('y', c[1])
        .text((d.data.population / 10000).toFixed(2) + '万人')
    })

    chart
      .append('g') // 输出标题
      .attr('class', 'arc--title')
      .append('text')
      .attr('fill', '#000')
      .attr('font-size', '14px')
      .attr('font-weight', '700')
      .attr(
        'transform',
        'translate(' +
          (width / 2 + margin.left) +
          ',' +
          (margin.top + radius) +
          ')'
      )
      .attr('text-anchor', 'middle')
      .attr('x', 0)
      .attr('y', 0)
      .text('XX市人口年龄结构')

    function arcTween(outerRadius, delay) {
      // 设置缓动函数
      return function() {
        d3.select(this)
          .transition()
          .delay(delay)
          .attrTween('d', function(d) {
            var i = d3.interpolate(d.outerRadius, outerRadius)
            return function(t) {
              d.outerRadius = i(t)
              return arc(d)
            }
          })
      }
    }
  }
  render() {
    return (
      <div className="ring-chart--simple">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3SimpleRingChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.string.isRequired,
      population: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
}

export default D3SimpleRingChart
