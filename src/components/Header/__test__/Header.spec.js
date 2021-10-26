import React from 'react';
import { Header } from '../Header';
import { render } from '@testing-library/react';

jest.mock('../../LogoContainer/LogoContainer',
  () => ({ LogoContainer: () => <div>Logo content</div> }));
jest.mock('../../NavContainer/NavContainer',
  () => ({ NavContainerWithAuth: () => <div>Nav content</div> }));
describe('Header', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Header activePageId={1} onPageChange={() => {}}/>);
    expect(getByText('Logo content')).toBeInTheDocument();
    expect(getByText('Nav content')).toBeInTheDocument();
  });
});