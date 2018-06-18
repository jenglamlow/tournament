import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga, { rootReducer } from './modules/root';
import createSagaMiddleware from 'redux-saga';
import { firebase as fbConfig } from '../config/firebase';
import { reactReduxFirebase } from 'react-redux-firebase';
import { routerMiddleware } from 'react-router-redux';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import history from '../utils/history';

// Initialize Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// initialize Firestore
firebase.firestore().settings({ timestampsInSnapshots: true });

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  useFirestoreForProfile: true
};


export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      reactReduxFirebase(firebase, config),
      reduxFirestore(firebase),
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}