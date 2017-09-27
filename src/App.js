import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './containers/Home';
import Tables from './containers/Tables';
import Profile from './containers/Profile';
import RootHeader from './components/layout/RootHeader';
import RootBreadcrumb from './components/layout/RootBreadcrumb';
import SiderMenus from './components/layout/SiderMenus';
import './App.css';

const { Footer, Content, Sider } = Layout;

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
        <RootHeader />
        <Layout>
          <Sider 
            width={200} 
            style={{ background: '#333' }}           
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Route path="*" component={SiderMenus}/>
          </Sider>
          <Layout style={{ padding: '0 10px 10px' }}>
            <Route path="*" component={RootBreadcrumb}/>
            <Content style={{ margin: 0, minHeight: 280 }}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/tables' component={Tables} />
                <Route path='/profile' component={Profile} />
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
