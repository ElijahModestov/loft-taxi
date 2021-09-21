import React from 'react';
import { Input } from '../Input';
import { render } from '@testing-library/react';

describe('Input', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input inputType={'text'}
             inputName={'testname'}
             labelText={'test label text'}
             placeholderText={'test placeholder text'}
             currentValue={'test value'}
             onInputChange={() => {}}
             isRequired={false} />
    );

    expect(getByText('test label text')).toBeInTheDocument();
    expect(getByPlaceholderText('test placeholder text')).toHaveAttribute('type', 'text');
    expect(getByPlaceholderText('test placeholder text')).toHaveAttribute('name', 'testname');
    expect(getByPlaceholderText('test placeholder text')).toHaveAttribute('value', 'test value');
    expect(getByPlaceholderText('test placeholder text')).toHaveProperty('required', false);
  });
});