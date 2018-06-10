import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import user, { signUpEpic } from './user';

export const rootEpic = combineEpics(
  signUpEpic,
);

export const rootReducer = combineReducers({
  user
});