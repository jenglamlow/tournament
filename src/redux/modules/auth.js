import { takeLatest, call, put } from 'redux-saga/effects';
import { auth, db } from '../../firebase';
import { push } from 'react-router-redux';

// Actions
const SIGNUP = 'redux/auth/SIGNUP';
const SIGNUP_SUCCESS = 'redux/auth/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'redux/auth/SIGNUP_FAILURE';
const LOGIN = 'redux/auth/LOGIN';
const LOGIN_SUCCESS = 'redux/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'redux/auth/LOGIN_FAILURE';


// Reducer
const initialState = {
  submitting: false,
  error: false,
  errorMessage: ''
};

export default function reducer(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        submitting: true,
        errorMessage: ''
      };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        submitting: false,
        error: false,
        errorMessage: ''
      };

    case LOGIN_FAILURE:
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
    type: LOGIN,
    credential
  };
}

// Sagas
function* signUpSaga(data) {
  try {
    // Check if the username exist
    const isExist = yield call(db.isUserExist, data.credential.username);

    if (isExist) {
      throw ({
        message: "Username Exist"
      });
    }

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
    yield call(
      auth.doSignInWithEmailAndPassword,
      data.credential.email,
      data.credential.password
    );

    yield put(push('/home'));

    yield put({ type: LOGIN_SUCCESS });
  } 
  catch (error) {
    yield put({ type: LOGIN_FAILURE, error });
  }
}

// Watchers
export const authSagas = [
  takeLatest(SIGNUP, signUpSaga),
  takeLatest(LOGIN, loginSaga),
];