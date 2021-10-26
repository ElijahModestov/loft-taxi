import React from 'react';
import { UserLoginFormWithAuth } from '../UserLoginForm';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('../../Button/Button',
  () => ({ Button: () => <button>Button text</button> }));

describe('UserLoginFormWithAuth', () => {
  it('renders correctly',  () => {
    const mockStore = {
      getState: () => ({ auth: { isLoggedIn: false, errorText: '' }}),
      subscribe: () => {},
      dispatch: () => {}
    };
    const history = createMemoryHistory();

    const { getByPlaceholderText, getByRole, getByText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <UserLoginFormWithAuth/>
        </Provider>
      </Router>
    );

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('Button text')).toBeInTheDocument();
    expect(getByPlaceholderText('*************')).toBeInTheDocument();
  });
});