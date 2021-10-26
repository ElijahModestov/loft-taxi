import React from 'react';
import { UserRegistrationFormWithAuth } from '../UserRegistrationForm';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('../../Button/Button',
  () => ({ Button: () => <button>Button text</button> }));

describe('UserRegistrationFormWithAuth', () => {
  it('renders correctly', async () => {
    const mockStore = {
      getState: () => ({ auth: { isLoggedIn: false, errorText: '' }}),
      subscribe: () => {},
      dispatch: () => {}
    };
    const history = createMemoryHistory();

    const { getByPlaceholderText, getAllByRole, getByText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <UserRegistrationFormWithAuth/>
        </Provider>
      </Router>
    );
    const inputs = await getAllByRole('textbox');

    expect(inputs).toHaveLength(2);
    expect(getByPlaceholderText('*************')).toBeInTheDocument();
    expect(getByText('Button text')).toBeInTheDocument();
  });
});