import React from 'react';
import { UserRegistrationFormWithAuth } from './UserRegistrationForm';
import { render } from '@testing-library/react';

jest.mock('../Input/Input',
  () => ({ Input: () => <input type="text" placeholder="some input text"/> }));
jest.mock('../Button/Button',
  () => ({ Button: () => <button>Button text</button> }));

describe('UserRegistrationFormWithAuth', () => {
  it('renders correctly', async () => {
    const { getAllByPlaceholderText, getAllByText } = render(
      <UserRegistrationFormWithAuth onPageChange={() => {}}
                             login={() => {}} />);
    const inputs = await getAllByPlaceholderText('some input text');
    const buttons = await getAllByText('Button text');

    expect(inputs).toHaveLength(3);
    expect(buttons).toHaveLength(1);
  });
});