import React, { Component } from 'react';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [auth, setAuth] = React.useState({
    email: '',
    password: '',
    name: ''
  });

  const login = (email, password, name) => {
    setIsLoggedIn(true);
    setAuth({
      email,
      password,
      name: name || '',
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const withAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(value) => {
            return <WrappedComponent {...value} {...this.props} />
          }}
        </AuthContext.Consumer>
      );
    }
  };
};