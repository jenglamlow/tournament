import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { routerReducer } from 'react-router-redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import user, { authSagas } from './auth';

export default function* rootSaga() {
  yield all([
    ...authSagas,
  ]);
}

export const rootReducer = combineReducers({
  user,
  router: routerReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});