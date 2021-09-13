import React from 'react';
import { ProfilePageWithProfileDataAndAuth } from './Profile';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('../../Input/Input',
  () => ({ Input: () => <input type="text" placeholder="some input text"/> }));
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

    const { getAllByPlaceholderText, getAllByText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <ProfilePageWithProfileDataAndAuth />
        </Provider>
      </Router>
    );

    const inputs = await getAllByPlaceholderText('some input text');
    const buttons = await getAllByText('Button text');

    expect(inputs).toHaveLength(4);
    expect(buttons).toHaveLength(1);
  });
});