import React from 'react';
import { UserLoginFormWithAuth } from './UserLoginForm';
import { render } from '@testing-library/react';

jest.mock('../Input/Input',
  () => ({ Input: () => <input type="text" placeholder="some input text"/> }));
jest.mock('../Button/Button',
  () => ({ Button: () => <button>Button text</button> }));

describe('UserLoginFormWithAuth', () => {
  it('renders correctly', async () => {
    const { getAllByPlaceholderText, getAllByText } = render(
      <UserLoginFormWithAuth onPageChange={() => {}}
                             login={() => {}} />);
    const inputs = await getAllByPlaceholderText('some input text');
    const buttons = await getAllByText('Button text');

    expect(inputs).toHaveLength(2);
    expect(buttons).toHaveLength(1);
  });
});