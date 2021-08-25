import React from 'react';
import { AuthProvider, AuthContext } from './AuthContext';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('AuthContext', () => {
  describe('default and login', () => {
    it('sets isLoggedIn to default and to true', () => {
      let isLoggedIn;
      let login;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              isLoggedIn = value.isLoggedIn;
              login = value.login;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      expect(isLoggedIn).toBe(false);

      act(() => {
        login('some@email.com', 'somepassword');
      });
      expect(isLoggedIn).toBe(true);
    });
  });

  describe('logout', () => {
    it('sets isLoggedIn to false', () => {
      let isLoggedIn;
      let logout;
      let login;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              isLoggedIn = value.isLoggedIn;
              login = value.login;
              logout = value.logout;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      act(() => {
        login('some@email.com', 'somepassword');
        logout();
      });

      expect(isLoggedIn).toBe(false);
    });
  });
});