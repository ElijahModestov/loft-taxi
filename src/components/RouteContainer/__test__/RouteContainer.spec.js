import React from 'react';
import { RouteContainerWithProfile } from '../RouteContainer';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

jest.mock('../../Button/Button',
  () => ({ Button: () => <button>Button text</button> }));
jest.mock('../../Select/Select',
  () => ({ Select: () => <div>Select container</div> }));

describe('UserLoginFormWithAuth', () => {
  it('renders correctly', async () => {
    const mockStore = {
      getState: () => ({ profile: { hasEligiblePayment: true }, addresses: { addressesList: [] }}),
      subscribe: () => {},
      dispatch: () => {}
    };

    const { getByText, getAllByText } = render(
      <Provider store={mockStore}>
        <RouteContainerWithProfile/>
      </Provider>
    );
    const selects = await getAllByText('Select container');
    const carTypes = await getAllByText('Стоимость');

    expect(selects).toHaveLength(2);
    expect(carTypes).toHaveLength(3);
    expect(getByText('Button text')).toBeInTheDocument();
  });
});