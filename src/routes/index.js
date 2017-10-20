import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Tables from '../containers/Tables';
import Profile from '../containers/Profile';
import SimpleBarChart from '../containers/SimpleBarChart';
import SimpleAreaChart from '../containers/SimpleAreaChart';
import SimplePieChart from '../containers/SimplePieChart';
import SimpleLineChart from '../containers/SimpleLineChart';
import SimpleLineChartII from '../containers/SimpleLineChartII';
import SimplePointsChart from '../containers/SimplePointsChart';
import GroupedBarChart from '../containers/GroupedBarChart';
import StackedBarChart from '../containers/StackedBarChart';
import RadialStackedBarChart from '../containers/RadialStackedBarChart';
import SimpleChordChart from '../containers/SimpleChordChart';
import SimpleDendrogramChart from '../containers/SimpleDendrogramChart';
import SimplePackChart from '../containers/SimplePackChart';
import NotFound from '../containers/NotFound';
import RootBreadcrumb from '../components/layout/RootBreadcrumb';
import SiderMenus from '../components/layout/SiderMenus';

export const SiderMenusRoute = () => 
  <Route path="*" component={SiderMenus}/>

export const RootBreadcrumbRoute = () => 
  <Route path="*" component={RootBreadcrumb}/>

export const ContentRoute = () =>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/tables' component={Tables} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/simple-bar-chart' component={SimpleBarChart} />
    <Route exact path='/simple-area-chart' component={SimpleAreaChart} />
    <Route exact path='/simple-pie-chart' component={SimplePieChart} />
    <Route exact path='/simple-line-chart' component={SimpleLineChart} />
    <Route exact path='/simple-line-chartii' component={SimpleLineChartII} />
    <Route exact path='/simple-points-chart' component={SimplePointsChart} />
    <Route exact path='/grouped-bar-chart' component={GroupedBarChart} />
    <Route exact path='/stacked-bar-chart' component={StackedBarChart} />
    <Route exact path='/radial-stacked-bar-chart' component={RadialStackedBarChart} />
    <Route exact path='/simple-chord-chart' component={SimpleChordChart} /> 
    <Route exact path='/simple-dendrogram-chart' component={SimpleDendrogramChart} />     
    <Route exact path='/simple-pack-chart' component={SimplePackChart} />               
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>

export default ContentRoute
