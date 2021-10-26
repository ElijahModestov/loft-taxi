import React from 'react';
import { RegistrationPage } from '../Registration';
import { render } from '@testing-library/react';

jest.mock('../../../UserAuthLayout/UserAuthLayout',
  () => ({ UserAuthLayout: ({children}) => <div>{children}</div> }));
jest.mock('../../../UserRegistrationForm/UserRegistrationForm',
  () => ({ UserRegistrationFormWithAuth: () => <div>User registration form content</div> }));

describe('RegistrationPage', () => {
  it('renders correctly', () => {
    const { getByText } = render(<RegistrationPage onPageChange={() => {}} />);

    expect(getByText('User registration form content')).toBeInTheDocument();
  });
});