import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './LandingPage';
import SignUp from './SignUp';
import Login from './Login';

import * as routes from '../constants/routes';

const App = () =>
  <BrowserRouter>
    <div>
      <Navigation />

      <hr />

      <Route
        exact path={routes.LANDING}
        component={() => <LandingPage />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUp />}
      />
      <Route
        exact path={routes.LOGIN}
        component={() => <Login />}
      />
    </div>
  </BrowserRouter>;

export default App;
