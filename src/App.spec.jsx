import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppWithProfileDataAndAuth } from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Link } from 'react-router-dom';

jest.mock('./components/Header/Header',
  () => ({ Header: () => (
    <div>
      <Link to="/">Карта</Link>
      <Link to="/profile">Профиль</Link>
      <Link to="/login">Логин</Link>
      <Link to="/registration">Регистрация</Link>
    </div>
    ) }));
jest.mock('./components/Pages/Login/Login',
  () => ({ LoginPage: () => <div>Login page content</div> }));
jest.mock('./components/Pages/Registration/Registration',
  () => ({ RegistrationPage: () => <div>Registration page content</div> }));
jest.mock('./components/Pages/Map/Map',
  () => ({ MapPage: () => <div>Map page content</div> }));
jest.mock('./components/Pages/Profile/Profile',
  () => ({ ProfilePageWithProfileDataAndAuth: () => <div>Profile page content</div> }));

describe('App', () => {
  it('renders correctly', () => {
    const mockStore = {
      getState: () => ({ auth: { isLoggedIn: false }}),
      subscribe: () => {},
      dispatch: () => {},
    };
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <AppWithProfileDataAndAuth />
        </Provider>
      </Router>
    );

    expect(getByText('Login page content')).toBeInTheDocument();
  });

  describe('when changing pages being logged in', () => {
    it('opens the correct pages', () => {
      const mockStore = {
        getState: () => ({ auth: { isLoggedIn: true }}),
        subscribe: () => {},
        dispatch: () => {},
      };
      const history = createMemoryHistory();

      const { getByText } = render(
        <Router history={history}>
          <Provider store={mockStore}>
            <AppWithProfileDataAndAuth />
          </Provider>
        </Router>
      );
      expect(getByText('Login page content')).toBeInTheDocument();
      fireEvent.click(getByText('Карта'));
      expect(getByText).toMatch('Map page content');
      fireEvent(getByText('Профиль'));
      expect(getByText).toMatch('Profile page content');
      fireEvent.click(getByText('Логин'));
      expect(getByText).toMatch('Login page content');
      fireEvent(getByText('Регистрация'));
      expect(getByText).toMatch('Registration page content');
    });
  });
  describe('when changing pages being anonymous', () => {
    it('opens the correct pages', () => {
      const mockStore = {
        getState: () => ({ auth: { isLoggedIn: false }}),
        subscribe: () => {},
        dispatch: () => {},
      };
      const history = createMemoryHistory();

      const { getByText } = render(
        <Router history={history}>
          <Provider store={mockStore}>
            <AppWithProfileDataAndAuth />
          </Provider>
        </Router>
      );
      expect(getByText('Login page content')).toBeInTheDocument();
      fireEvent.click(getByText('Карта'));
      expect(getByText).toMatch('Login page content');
      fireEvent(getByText('Профиль'));
      expect(getByText).toMatch('Login page content');
      fireEvent.click(getByText('Логин'));
      expect(getByText).toMatch('Login page content');
      fireEvent(getByText('Регистрация'));
      expect(getByText).toMatch('Registration page content');
    });
  });
});