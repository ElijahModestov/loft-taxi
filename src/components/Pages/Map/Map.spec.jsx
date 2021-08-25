import React from 'react';
import { MapPage } from './Map';
import { render } from '@testing-library/react';

jest.mock('../../MapContainer/MapContainer',
  () => ({ MapContainer: () => <div>Map container content</div> }));

describe('MapPage', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MapPage />);

    expect(getByText('Map container content')).toBeInTheDocument();
  });
});