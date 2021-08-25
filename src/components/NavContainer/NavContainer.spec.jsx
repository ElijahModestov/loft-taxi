import React from 'react';
import { NavContainerWithAuth } from './NavContainer';
import { render } from '@testing-library/react';

describe('NavContainerWithAuth', () => {
  it('renders correctly', () => {
    const { getByText } = render(<NavContainerWithAuth activePageId={3}
                                                       onPageChange={() => {}}
                                                       logout={() => {}} />);
    expect(getByText('Карта')).toBeInTheDocument();
    expect(getByText('Профиль')).toBeInTheDocument();
    expect(getByText('Выйти')).toBeInTheDocument();
  });
});