import React from 'react';
import { render } from '@testing-library/react';
import { AppWithProfileDataAndAuth } from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('./components/Header/Header',
  () => ({ Header: () => <div>Header content</div> }));
jest.mock('./components/Pages/Login/Login',
  () => ({ LoginPage: () => <div>Login page content</div> }));
jest.mock('./components/Pages/Registration/Registration',
  () => ({ RegistrationPage: () => <div>Registration page content</div> }));
jest.mock('./components/Pages/Map/Map',
  () => ({ MapPageWithRoute: () => <div>Map page content</div> }));
jest.mock('./components/Pages/Profile/Profile',
  () => ({ ProfilePageWithProfileDataAndAuth: () => <div>Profile page content</div> }));

describe('App', () => {
  it('renders correctly', () => {
    const mockStore = {
      getState: () => ({ auth: { isLoggedIn: true, token: '' }}),
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

    expect(getByText('Header content')).toBeInTheDocument();
    expect(getByText('Map page content')).toBeInTheDocument();
  });
});