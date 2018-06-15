import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './LandingPage';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';

import * as routes from '../constants/routes';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
  
        <hr />
  
        <Route
          exact path={ routes.LANDING }
          render={ () => <LandingPage /> }
        />
        <Route
          exact path={ routes.SIGN_UP }
          render={ () => <SignUp /> }
        />
        <Route
          exact path={ routes.LOGIN }
          render={ () => <Login /> }
        />

        <Route
          exact path={ routes.HOME }
          render={ () => <Home /> }
        />
      </div>
    );
  }
}

export default App;
