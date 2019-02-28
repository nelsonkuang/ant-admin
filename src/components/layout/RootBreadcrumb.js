import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

const RootBreadcrumb = ({ match }) => {
  const urlArr = match.url.split('/')
  const len = urlArr.length
  let temArr = ['']
  const home = '首页'
  const names = {
    tables: '简单表格',
    'asyc-tables': '简单异步表格',
    profile: '个人信息',
    'simple-bar-chart': 'D3 简单柱状图',
    'simple-area-chart': 'D3 简单面积图',
    'simple-pie-chart': 'D3 简单饼图、圆环图',
    'simple-points-chart': 'D3 简单散点图',
    'grouped-bar-chart': 'D3 组合柱状图',
    'stacked-bar-chart': 'D3 堆栈柱状图',
    'radial-stacked-bar-chart': 'D3 径向堆栈柱状图',
    'simple-line-chart': 'D3 简单线状图',
    'simple-line-chartii': 'D3 简单线状图II',
    'simple-chord-chart': 'D3 简单弦图',
    'simple-dendrogram-chart': 'D3 简单树状图',
    'simple-pack-chart': 'D3 简单打包图',
    'radar-line-chart': 'D3 雷达图',
    'simple-china-map-chart': 'D3 简单中国地图',
    'simple-force-chart': 'D3 简单力导向图',
    'simple-tag-cloud-chart': 'D3 简单标签云图',
    'vertical-bp-chart': 'D3 竖向业务合作伙伴图',
    'simple-math-chart': '常用函数图像',
    'exponential-spiral-line': '指数函数图像-极坐标',
    'logarithmic-spiral-line': '对数函数图像-极坐标',
    'archimedean-spiral-line': '阿基米德螺线',
    'equiangular-spiral-line': '等角螺线',
    'simple-voronoi-chart': 'D3 泰森多边形 / 冯洛诺伊图'
  }
  return (
    <Breadcrumb style={{ margin: '12px 0' }}>
      {urlArr[0] === urlArr[1] && <Breadcrumb.Item>{home}</Breadcrumb.Item>}
      {urlArr[0] !== urlArr[1] &&
        urlArr.map((item, index) => {
          let key = item !== '' ? item : 'home'
          if (item !== '') {
            temArr.push(item)
          }
          if (index !== len - 1) {
            return (
              <Breadcrumb.Item key={key}>
                <Link to={temArr.join('/')}>
                  {item !== '' ? names[item] : home}
                </Link>
              </Breadcrumb.Item>
            )
          } else {
            return (
              <Breadcrumb.Item key={key}>
                {names[item] ? names[item] : item}
              </Breadcrumb.Item>
            )
          }
        })}
    </Breadcrumb>
  )
}

RootBreadcrumb.propTypes = {
  match: PropTypes.object
}

export default RootBreadcrumb
