import React from 'react';
import Header from './Header';
import { render } from '@testing-library/react';

jest.mock('../LogoContainer',
  () => ({ LogoContainer: () => <div>Logo content</div> }));
jest.mock('../NavContainer',
  () => ({ NavContainer: () => <div>Nav content</div> }));
const func = () => {};
describe('Header', () => {
  it('renders correctly', () => {
    const { container } = render(<Header activePageId={1}
                                         onPageChange={func}/>);
  });
});