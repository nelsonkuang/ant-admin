import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Badge, Icon, Avatar } from 'antd';
import Home from './containers/Home';
import Tables from './containers/Tables';
import './App.css';

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header clearfix">
          <div className="logo" >LOGO</div>
          <div className="left-menu" style={{float: 'left', width: '50%'}}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="left-menu-1">首页</Menu.Item>
              <Menu.Item key="left-menu-2">数据</Menu.Item>
              <Menu.Item key="left-menu-3">统计</Menu.Item>
            </Menu>
          </div>
          <div className="right-menu" style={{float: 'right', width: '30%'}}>
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px', float: 'right' }}
            >
                <Menu.Item key="right-menu-1">
                    <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                        <Icon type="notification" />
                    </Badge>
                </Menu.Item>
                <SubMenu title={<Badge dot><Avatar shape="square" src="http://dummyimage.com/100/FF8604/fff" icon="user" /></Badge>}>
                    <Menu.ItemGroup title="用户中心">
                        <Menu.Item key="setting:1">你好 - userName</Menu.Item>
                        <Menu.Item key="setting:2">个人信息</Menu.Item>
                        <Menu.Item key="logout"><span onClick={()=>{}}>退出登录</span></Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="设置中心">
                        <Menu.Item key="setting:3">个人设置</Menu.Item>
                        <Menu.Item key="setting:4">系统设置</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>          
          </div>
        </Header>
        <Layout>
          <Sider 
            width={200} 
            style={{ background: '#333' }}           
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="pie-chart" />
                  <span>面板</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
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
          </Sider>
          <Layout style={{ padding: '0 10px 10px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>XXXX</Breadcrumb.Item>
              <Breadcrumb.Item>XXXX</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ margin: 0, minHeight: 280 }}>
              <Route exact path="/" component={Home}/>
              <Route path="/tables" component={Tables}/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
