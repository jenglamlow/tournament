import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import configureStore from './redux/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
