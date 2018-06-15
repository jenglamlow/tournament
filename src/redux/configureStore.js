import { createStore, applyMiddleware } from 'redux';
import rootSaga, { rootReducer } from './modules/root';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import history from '../utils/history';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}