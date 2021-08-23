import React from 'react';
import ProfilePage from './Profile';
import { render } from '@testing-library/react';

describe('ProfilePage', () => {
  it('renders correctly', () => {
    const { container } = render(<ProfilePage />);

    expect(container.textContent).toBe('Profile page');
  });
});