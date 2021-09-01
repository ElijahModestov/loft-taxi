import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoggedIn } from './reducers/auth';

import { PrivateRouteWithAuth } from './components/PrivateRoute/PrivateRoute';
import { Header } from './components/Header/Header';
import { LoginPage } from './components/Pages/Login/Login';
import { RegistrationPage } from './components/Pages/Registration/Registration';
import { MapPage } from './components/Pages/Map/Map';
import { ProfilePage } from './components/Pages/Profile/Profile';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.2;
  }
`;

const App = ({ isLoggedIn }) => {
  return (
    <>
      <GlobalStyle/>
      {isLoggedIn &&
      <Header />
      }
      <Switch>
        <PrivateRouteWithAuth path="/" component={MapPage} exact />
        <PrivateRouteWithAuth path="/profile" component={ProfilePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool
};

export const AppWithAuth = connect(
  state => ({ isLoggedIn: getIsLoggedIn(state) })
)(App);