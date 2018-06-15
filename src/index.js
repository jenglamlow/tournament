import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import history from './utils/history';
import configureStore from './redux/configureStore';

const store = configureStore();


ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history = { history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
