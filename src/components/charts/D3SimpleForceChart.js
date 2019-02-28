import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class D3SimpleForceChart extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const data = this.props.data
    const margin = { top: 60, right: 60, bottom: 60, left: 60 }
    const width = containerWidth - margin.left - margin.right
    const height = 700 - margin.top - margin.bottom
    let chart = d3
      .select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    let g = chart
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')') // 设最外包层在总图上的相对位置
    let simulation = d3
      .forceSimulation() // 构建力导向图
      .force(
        'link',
        d3
          .forceLink()
          .id(function(d, i) {
            return i
          })
          .distance(function(d) {
            return d.value * 50
          })
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

    let z = d3.scaleOrdinal(d3.schemeCategory20) // 通用线条的颜色

    let link = g
      .append('g') // 画连接线
      .attr('class', 'links')
      .selectAll('line')
      .data(data.edges)
      .enter()
      .append('line')

    let linkText = g
      .append('g') // 画连接连上面的关系文字
      .attr('class', 'link-text')
      .selectAll('text')
      .data(data.edges)
      .enter()
      .append('text')
      .text(function(d) {
        return d.relation
      })

    let node = g
      .append('g') // 画圆圈和文字
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('g')
      .on('mouseover', function(d, i) {
        //显示连接线上的文字
        linkText.style('fill-opacity', function(edge) {
          if (edge.source === d || edge.target === d) {
            return 1
          }
        })
        //连接线加粗
        link
          .style('stroke-width', function(edge) {
            if (edge.source === d || edge.target === d) {
              return '2px'
            }
          })
          .style('stroke', function(edge) {
            if (edge.source === d || edge.target === d) {
              return '#000'
            }
          })
      })
      .on('mouseout', function(d, i) {
        //隐去连接线上的文字
        linkText.style('fill-opacity', function(edge) {
          if (edge.source === d || edge.target === d) {
            return 0
          }
        })
        //连接线减粗
        link
          .style('stroke-width', function(edge) {
            if (edge.source === d || edge.target === d) {
              return '1px'
            }
          })
          .style('stroke', function(edge) {
            if (edge.source === d || edge.target === d) {
              return '#ddd'
            }
          })
      })
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )

    node
      .append('circle')
      .attr('r', 5)
      .attr('fill', function(d, i) {
        return z(i)
      })

    node
      .append('text')
      .attr('fill', function(d, i) {
        return z(i)
      })
      .attr('y', -20)
      .attr('dy', '.71em')
      .text(function(d) {
        return d.name
      })

    simulation // 初始化力导向图
      .nodes(data.nodes)
      .on('tick', ticked)

    simulation.force('link').links(data.edges)

    chart
      .append('g') // 输出标题
      .attr('class', 'bar--title')
      .append('text')
      .attr('fill', '#000')
      .attr('font-size', '16px')
      .attr('font-weight', '700')
      .attr('text-anchor', 'middle')
      .attr('x', containerWidth / 2)
      .attr('y', 20)
      .text('人物关系图')

    function ticked() {
      // 力导向图变化函数，让力学图不断更新
      link
        .attr('x1', function(d) {
          return d.source.x
        })
        .attr('y1', function(d) {
          return d.source.y
        })
        .attr('x2', function(d) {
          return d.target.x
        })
        .attr('y2', function(d) {
          return d.target.y
        })
      linkText
        .attr('x', function(d) {
          return (d.source.x + d.target.x) / 2
        })
        .attr('y', function(d) {
          return (d.source.y + d.target.y) / 2
        })
      node.attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')'
      })
    }

    function dragstarted(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart()
      }
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0)
      }
      d.fx = null
      d.fy = null
    }
  }
  render() {
    return (
      <div className="force-chart--simple">
        <svg ref={r => (this.chartRef = r)} />
      </div>
    )
  }
}
D3SimpleForceChart.propTypes = {
  data: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
        // href:PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        source: PropTypes.number.isRequired,
        target: PropTypes.number.isRequired,
        relation: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
}

export default D3SimpleForceChart
