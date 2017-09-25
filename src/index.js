import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './containers/Home';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

console.log()

ReactDOM.render((
    <HashRouter>
      <Route exact path="/" component={App} />
    </HashRouter>
), document.getElementById('root'));
