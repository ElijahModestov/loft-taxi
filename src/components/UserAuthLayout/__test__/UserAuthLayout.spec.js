import React from 'react';
import { UserAuthLayout } from '../UserAuthLayout';
import { render } from '@testing-library/react';

jest.mock('../../LogoContainer/LogoContainer',
  () => ({ LogoContainer: () => <div>Logo container content</div> }));

describe('UserAuthLayout', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <UserAuthLayout>
        <div>Auth content</div>
      </UserAuthLayout>
    );

    expect(getByText('Logo container content')).toBeInTheDocument();
    expect(getByText('Auth content')).toBeInTheDocument();
  });
});