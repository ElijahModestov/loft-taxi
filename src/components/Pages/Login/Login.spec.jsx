import React from 'react';
import { LoginPage } from './Login';
import { render } from '@testing-library/react';

jest.mock('../../UserAuthLayout/UserAuthLayout',
  () => ({ UserAuthLayout: ({children}) => <div>{children}</div> }));
jest.mock('../../UserLoginForm/UserLoginForm',
  () => ({ UserLoginFormWithAuth: () => <div>User login form content</div> }));

describe('LoginPage', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoginPage onPageChange={() => {}} />);

    expect(getByText('User login form content')).toBeInTheDocument();
  });
});