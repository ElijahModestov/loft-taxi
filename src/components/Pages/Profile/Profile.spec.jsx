import React from 'react';
import { ProfilePageWithProfileDataAndAuth } from './Profile';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('../../Button/Button',
  () => ({ Button: () => <button>Button text</button> }));

describe('ProfilePage', () => {
  it('renders correctly', async () => {
    const mockStore = {
      getState: () => ({
        auth: {
          isLoggedIn: false,
          token: ''
        },
        profile: {
          cardName: '',
          cardNumber: '',
          expiryDate: '',
          cvc: ''
        }
      }),
      subscribe: () => {},
      dispatch: () => {}
    };
    const history = createMemoryHistory();

    const { getAllByRole, getByText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <ProfilePageWithProfileDataAndAuth />
        </Provider>
      </Router>
    );

    const inputs = await getAllByRole('textbox');

    expect(inputs).toHaveLength(4);
    expect(getByText('Button text')).toBeInTheDocument();
  });
});