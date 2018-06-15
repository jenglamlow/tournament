import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { routerReducer } from 'react-router-redux';

import user, { authSagas } from './auth';

export default function* rootSaga() {
  yield all([
    ...authSagas,
  ]);
}

export const rootReducer = combineReducers({
  user,
  router: routerReducer
});