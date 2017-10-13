import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const SiderMenus = ({match}) => (
  <div style={{paddingBottom:'80px'}}>
    <Menu theme="dark" defaultSelectedKeys={[match.url]} selectedKeys={[match.url]} defaultOpenKeys={['sub2']} mode="inline">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" />
          <span>首页</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/tables">
        <Link to="/tables">
          <Icon type="switcher" />
          <span>表格</span>
        </Link>
      </Menu.Item>
      <SubMenu
        key="sub1"
        title={<span><Icon type="user" /><span>个人中心</span></span>}
      >
        <Menu.Item key="/profile"><Link to="/profile">个人信息</Link></Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={<span><Icon type="area-chart" /><span>D3.js图库</span></span>}
      >
        <Menu.Item key="/simple-bar-chart"><Link to="/simple-bar-chart">D3 简单柱状图</Link></Menu.Item>
        <Menu.Item key="/simple-area-chart"><Link to="/simple-area-chart">D3 简单面积图</Link></Menu.Item>
        <Menu.Item key="/simple-pie-chart"><Link to="/simple-pie-chart">D3 简单饼图、圆环图</Link></Menu.Item>
        <Menu.Item key="/simple-line-chart"><Link to="/simple-line-chart">D3 简单线状图</Link></Menu.Item>
        <Menu.Item key="/simple-points-chart"><Link to="/simple-points-chart">D3 简单散点图</Link></Menu.Item>
        <Menu.Item key="/grouped-points-chart"><Link to="/grouped-points-chart">D3 组合柱状图</Link></Menu.Item>
      </SubMenu>
    </Menu>
  </div>
)

SiderMenus.propTypes = {
  match: PropTypes.object.isRequired,
}

export default SiderMenus
