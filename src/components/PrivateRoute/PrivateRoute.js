import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../reducers/auth';

const PrivateRoute = ({ component: RouteComponent, isLoggedIn, ...rest }) => (
  <Route {...rest}
         render={routeProps => isLoggedIn ? (
           <RouteComponent {...routeProps} />
         ) : (
           <Redirect to="/login" />
         )} />
);

export const PrivateRouteWithAuth = connect(
  state => ({ isLoggedIn: getIsLoggedIn(state) })
)(PrivateRoute);