import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../reducers/auth';

const PublicRoute = ({ component: RouteComponent, isLoggedIn, ...rest }) => (
  <Route {...rest}
         render={routeProps => !isLoggedIn ? (
           <RouteComponent {...routeProps} />
         ) : (
           <Redirect to="/" />
         )} />
);

export const PublicRouteWithAuth = connect(
  state => ({ isLoggedIn: getIsLoggedIn(state) })
)(PublicRoute);