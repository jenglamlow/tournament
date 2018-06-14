import { takeLatest, call, put } from 'redux-saga/effects';
import { auth, db } from '../../firebase';

// Actions
const SIGNUP = 'rxjs/auth/SIGNUP';
const SIGNUP_SUCCESS = 'rxjs/auth/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'rxjs/auth/SIGNUP_FAILURE';

// Reducer
const initialState = {
  submitting: false,
  error: false,
  errorMessage: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        submitting: true
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        submitting: false,
        error: false
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        submitting: false,
        error: true,
        errorMessage: action.error.message
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

export function login(credential) {
  return { 
    type: SIGNUP,
    credential
  };
}

// Sagas
function* signUpSaga(data) {
  try {
    // Check if the username exist
    yield call(db.checkUsername, data.credential.username);

    // Create Username with Email and Password
    const user = yield call(
      auth.doCreateUserWithEmailAndPassword, 
      data.credential.email,
      data.credential.password
    );

    // Create user in database
    yield call(db.createUser, user.user.uid, data.credential.username, data.credential.email);

    // Create username list in database
    yield call(db.createUsername, data.credential.username, user.user.uid);

    yield put({ type: SIGNUP_SUCCESS });
  } 
  catch (error) {
    yield put({ type: SIGNUP_FAILURE, error });
  }
}

function* loginSaga(data) {
  try {
  } 
  catch (error) {
    yield put({ type: SIGNUP_FAILURE, error });
  }
}

// Watchers
export const authSagas = [
  takeLatest(SIGNUP, signUpSaga),
  takeLatest(SIGNUP, loginSaga),
];