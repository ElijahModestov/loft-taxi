import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getIsLoggedIn, getToken } from './store/reducers/auth';
import { fetchPaymentData } from './store/actions/profile';
import { fetchAddressesData } from './store/actions/addresses';

import { PrivateRouteWithAuth } from './components/PrivateRoute/PrivateRoute';
import { Header } from './components/Header/Header';
import { LoginPage } from './components/Pages/Login/Login';
import { RegistrationPage } from './components/Pages/Registration/Registration';
import { MapPageWithRoute } from './components/Pages/Map/Map';
import { ProfilePageWithProfileDataAndAuth } from './components/Pages/Profile/Profile';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    transition: all .2s;
  }
  body {
    margin: 0;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.2;
  }
`;

type AppProps = {
  isLoggedIn: boolean,
  token: string,
  fetchPaymentData: (token: string) => {
    type: string,
    payload: {
      token: string
    }
  },
  fetchAddressesData: () => {
    type: string
  }
};

const App = ({ isLoggedIn, token, fetchPaymentData, fetchAddressesData }: AppProps) => {
  useEffect(() => {
    isLoggedIn && fetchPaymentData(token) && fetchAddressesData();
  }, [isLoggedIn, token, fetchPaymentData, fetchAddressesData]);

  return (
    <>
      <GlobalStyle/>
      {isLoggedIn && <Header />}
      <Switch>
        <PrivateRouteWithAuth path="/" component={MapPageWithRoute} exact />
        <PrivateRouteWithAuth path="/profile" component={ProfilePageWithProfileDataAndAuth} />
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistrationPage} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state: object) => ({
  isLoggedIn: getIsLoggedIn(state),
  token: getToken(state)
});

export const AppWithProfileDataAndAuth = connect(
  mapStateToProps,
  { fetchPaymentData, fetchAddressesData }
)(App);