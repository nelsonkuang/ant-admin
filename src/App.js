import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './containers/Home';
import Tables from './containers/Tables';
import Profile from './containers/Profile';
import SimpleBarChart from './containers/SimpleBarChart';
import SimpleAreaChart from './containers/SimpleAreaChart';
import SimplePieChart from './containers/SimplePieChart';
import SimpleLineChart from './containers/SimpleLineChart';
import SimpleLineChartII from './containers/SimpleLineChartII';
import SimplePointsChart from './containers/SimplePointsChart';
import GroupedBarChart from './containers/GroupedBarChart';
import StackedBarChart from './containers/StackedBarChart';
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
        <Layout style={{paddingTop:'64px'}}>
          <Sider 
            width={200} 
            style={{ background: '#333' }}           
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            className="fixed"
          >
            <Route path="*" component={SiderMenus}/>
          </Sider>
          <Layout className={this.state.collapsed ? 'content-normal' : 'content-max'} >
            <Route path="*" component={RootBreadcrumb}/>
            <Content style={{ margin: 0, minHeight: 280 }}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/tables' component={Tables} />
                <Route path='/profile' component={Profile} />
                <Route path='/simple-bar-chart' component={SimpleBarChart} />
                <Route path='/simple-area-chart' component={SimpleAreaChart} />
                <Route path='/simple-pie-chart' component={SimplePieChart} />
                <Route path='/simple-line-chart' component={SimpleLineChart} />
                <Route path='/simple-line-chartii' component={SimpleLineChartII} />
                <Route path='/simple-points-chart' component={SimplePointsChart} />
                <Route path='/grouped-bar-chart' component={GroupedBarChart} />
                <Route path='/stacked-bar-chart' component={StackedBarChart} />
                <Redirect path="*" to="/" />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <a href="https://github.com/nelsonkuang/ant-admin">Fork me on Github</a>, Mixed by Nelson Kuang @2017, currently under developing...
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
