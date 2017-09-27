import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const SiderMenu = ({match}) => (
  <div>
    <Menu theme="dark" defaultSelectedKeys={[match.url]} mode="inline">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="pie-chart" />
          <span>面板</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/tables">
        <Link to="/tables">
          <Icon type="switcher" />
          <span>表格</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="desktop" />
        <span>设备</span>
      </Menu.Item>
      <SubMenu
        key="sub1"
        title={<span><Icon type="user" /><span>个人中心</span></span>}
      >
        <Menu.Item key="4">Tom</Menu.Item>
        <Menu.Item key="5">Bill</Menu.Item>
        <Menu.Item key="6">Alex</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={<span><Icon type="team" /><span>组织关系</span></span>}
      >
        <Menu.Item key="7">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9">
        <Icon type="file" />
        <span>文件</span>
      </Menu.Item>
    </Menu>
  </div>
)

SiderMenu.propTypes = {
  match: PropTypes.object.isRequired,
}

export default SiderMenu
