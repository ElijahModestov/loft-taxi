import React from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import App from './App';

jest.mock('./components/Header/Header',
  () => ({ Header: () => <div>Header content</div> }));
jest.mock('./components/Pages/Login/Login',
  () => ({ LoginPage: () => <div>Login page content</div> }));
jest.mock('./components/Pages/Registration/Registration',
  () => ({ RegistrationPage: () => <div>Registration page content</div> }));
jest.mock('./components/Pages/Map/Map',
  () => ({ MapPage: () => <div>Map page content</div> }));
jest.mock('./components/Pages/Profile/Profile',
  () => ({ ProfilePage: () => <div>Profile page content</div> }));

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App isLoggedIn={false} />);

    expect(getByText('Login page content')).toBeInTheDocument();
  });

  describe('when changing pages', () => {
    it('opens the correct pages', () => {
      let isLoggedIn = false;
      let activePageId = 1;
      const { getByText } = render(<App isLoggedIn={isLoggedIn}
                                        activePageId={activePageId} />);
      expect(getByText('Login page content')).toBeInTheDocument();

      fireEvent(
        getByText('Login page content'),
        createEvent(
          'onPageChange',
          getByText('Login page content'),
          {id: 2},
          { EventType: 'CustomEvent' }));
      expect(getByText('Registration page content')).toBeInTheDocument();

      fireEvent(
        getByText('Registration page content'),
        createEvent(
          'onPageChange',
          getByText('Registration page content'),
          {id: 3},
          { EventType: 'CustomEvent' }));
      expect(getByText('Map page content')).toBeInTheDocument();

      fireEvent(
        getByText('Map page content'),
        createEvent(
          'onPageChange',
          getByText('Map page content'),
          {id: 4},
          { EventType: 'CustomEvent' }));
      expect(getByText('Profile page content')).toBeInTheDocument();
    });
  });
});