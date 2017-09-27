import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Badge, Icon, Avatar } from 'antd';
import Home from './containers/Home';
import Tables from './containers/Tables';
import SiderMenu from './components/layout/SiderMenu';
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
            <Route path="*" component={SiderMenu}/>
          </Sider>
          <Layout style={{ padding: '0 10px 10px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>XXXX</Breadcrumb.Item>
              <Breadcrumb.Item>XXXX</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ margin: 0, minHeight: 280 }}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/tables' component={Tables} />
                <Redirect path="*" to="/" />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Mixed by Nelson Kuang @2017, currently under developing...
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
