import React from 'react';
import { NavContainerWithAuth } from '../NavContainer';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('NavContainerWithAuth', () => {
  it('renders correctly', () => {
    const mockStore = {
      getState: () => ({ auth: { isLoggedIn: true }}),
      subscribe: () => {},
      dispatch: () => {}
    };
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <Provider store={mockStore}>
          <NavContainerWithAuth/>
        </Provider>
      </Router>
    );
    expect(getByText('Карта')).toBeInTheDocument();
    expect(getByText('Профиль')).toBeInTheDocument();
    expect(getByText('Выйти')).toBeInTheDocument();
  });
});