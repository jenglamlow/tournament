import { auth, db } from '../../firebase';
import { takeEvery } from 'redux-saga/effects';

// Actions
const SIGNUP = 'rxjs/auth/SIGNUP';
const SIGNUP_DONE = 'rxjs/auth/SIGNUP_DONE';

// Reducer
const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  console.log('reducer', action);
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
      };

    default: 
      return state;
  }
}

// Action Creators
export function signup(credential) {
  return { 
    type: SIGNUP,
    credential
  };
}

// Sagas
function signUpSaga(data) {
  console.log('saga', data);
}

export const authSagas = [
  takeEvery(SIGNUP, signUpSaga),
];