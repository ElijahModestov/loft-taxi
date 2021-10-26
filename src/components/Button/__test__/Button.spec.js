import React from 'react';
import { Button } from '../Button';
import { render } from '@testing-library/react';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button buttonType={'submit'}
                                         buttonText={'test text'}
                                         isButtonDisabled={true}/>);
    expect(getByText('test text')).toHaveAttribute('type', 'submit');
    expect(getByText('test text')).toHaveProperty('disabled', true);
  });
});