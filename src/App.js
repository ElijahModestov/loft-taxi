import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { getIsLoggedIn, getToken } from './store/reducers/auth';
import { fetchPaymentData } from './store/actions/profile';

import { PrivateRouteWithAuth } from './components/PrivateRoute/PrivateRoute';
import { PublicRouteWithAuth } from './components/PublicRoute/PublicRoute';
import { Header } from './components/Header/Header';
import { LoginPage } from './components/Pages/Login/Login';
import { RegistrationPage } from './components/Pages/Registration/Registration';
import { MapPage } from './components/Pages/Map/Map';
import { ProfilePageWithProfileDataAndAuth } from './components/Pages/Profile/Profile';

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

const App = ({ isLoggedIn, token, fetchPaymentData }) => {
  useEffect(() => {
    isLoggedIn && fetchPaymentData(token);
  }, [isLoggedIn, token, fetchPaymentData]);

  return (
    <>
      <GlobalStyle/>
      {isLoggedIn &&
      <Header />
      }
      <Switch>
        <PrivateRouteWithAuth path="/" component={MapPage} exact />
        <PrivateRouteWithAuth path="/profile" component={ProfilePageWithProfileDataAndAuth} />
        <PublicRouteWithAuth path="/login" component={LoginPage} />
        <PublicRouteWithAuth path="/registration" component={RegistrationPage} />
      </Switch>
    </>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  fetchPaymentData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  token: getToken(state)
});

export const AppWithProfileDataAndAuth = connect(
  mapStateToProps,
  { fetchPaymentData }
)(App);