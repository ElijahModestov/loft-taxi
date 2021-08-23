import React from 'react';
import MapContainer from './MapContainer';
import { render } from '@testing-library/react';
import mapboxgl from 'mapbox-gl';

jest.mock('mapbox-gl', () => {
  Map: jest.fn(() => ({ remove: () => {} }));
});

describe('Map', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<MapContainer />);

    expect(mapboxgl.Map).toHaveBeenCalledWith({
      container: getByTestId('map'),
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [37.6173, 55.7558],
      zoom: 9
    });
  });
});