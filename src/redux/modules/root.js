import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import user, { userEpic } from './user';

export const rootEpic = combineEpics(
  userEpic,
);

export const rootReducer = combineReducers({
  user
});