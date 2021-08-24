import React from 'react';
import { LogoContainer } from './LogoContainer';
import { render } from '@testing-library/react';

describe('LogoContainer', () => {
  it('renders correctly', () => {
    const { getByAltText } = render(<LogoContainer rowView={true} />);

    expect(getByAltText('logo primary')).toBeInTheDocument();
    expect(getByAltText('logo secondary')).toBeInTheDocument();
  });
});