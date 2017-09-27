import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const SiderMenus = ({match}) => (
  <div>
    <Menu theme="dark" defaultSelectedKeys={[match.url]} selectedKeys={[match.url]} mode="inline">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="pie-chart" />
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
        <Menu.Item key="5">开发中二...</Menu.Item>
        <Menu.Item key="6">开发中三...</Menu.Item>
      </SubMenu>
      <Menu.Item key="3">
        <Icon type="desktop" />
        <span>设备 开发中...</span>
      </Menu.Item>
      <SubMenu
        key="sub2"
        title={<span><Icon type="team" /><span>组织关系</span></span>}
      >
        <Menu.Item key="7">开发中一...</Menu.Item>
        <Menu.Item key="8">开发中二...</Menu.Item>
      </SubMenu>
      <Menu.Item key="9">
        <Icon type="file" />
        <span>文件 开发中...</span>
      </Menu.Item>
    </Menu>
  </div>
)

SiderMenus.propTypes = {
  match: PropTypes.object.isRequired,
}

export default SiderMenus
