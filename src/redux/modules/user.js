import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';


// Actions
const SIGNUP = 'rxjs/auth/SIGNUP';

// Reducer
const initialState = {
};

export default function reducer(state = initialState, action = {}) {
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

// Epics
export const signUpEpic = action$ =>
  action$.ofType(SIGNUP)
    .mergeMap(action => {
      console.log(action);
    });