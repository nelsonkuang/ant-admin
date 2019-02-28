import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import * as d3Cloud from '../../utils/d3-cloud'

class D3SimpleTagCloudChart extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const data = this.props.data
    let chart = d3.select(this.chartRef)

    let fill = d3.scaleOrdinal(d3.schemeCategory20) // 定义颜色

    let words = data.map(item => {
      // 处理原始数据
      return {
        text: item.name,
        size: 10 + item.value * 8,
        href: item.href
      }
    })

    let layout = d3Cloud() // 构建云图
      .size([500, 500])
      .words(words)
      .padding(5)
      .rotate(function() {
        return ~~(Math.random() * 2) * 90
      })
      .font('Impact')
      .fontSize(function(d) {
        return d.size
      })
      .on('end', draw)

    layout.start()

    function draw(words) {
      // 输出所有标签
      let g = chart
        .attr('width', containerWidth)
        .attr('height', layout.size()[1])
        .append('g')
        .attr(
          'transform',
          'translate(' + containerWidth / 2 + ',' + layout.size()[1] / 2 + ')'
        )

      g.selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .on('click', function(d) {
          window.open(d.href)
        })
        .style('font-family', 'Impact')
        .style('cursor', 'pointer')
        .style('fill', function(d, i) {
          return fill(i)
        })
        .attr('text-anchor', 'middle')
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .style('font-size', function(d) {
          return d.size + 'px'
        })
        .text(function(d) {
          return d.text
        })
        .append('title')
        .text(function(d) {
          return d.href
        })

      g.selectAll('text') // 创建动画
        .style('fill-opacity', 0)
        .transition()
        .duration(200)
        .delay(function(d, i) {
          return i * 200
        })
        .style('fill-opacity', 1)
    }
  }
  render() {
    return (
      <div className="tag-cloud-chart--simple">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3SimpleTagCloudChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
      // href:PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}

export default D3SimpleTagCloudChart
