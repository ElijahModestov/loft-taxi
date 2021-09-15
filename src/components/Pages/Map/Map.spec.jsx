import React from 'react';
import { MapPageWithRoute } from './Map';
import { render } from '@testing-library/react';
import mapboxgl from 'mapbox-gl';
import { Provider } from 'react-redux';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(() => ({
    remove: jest.fn(),
    flyTo: jest.fn(),
    getLayer: jest.fn(),
    addSource: jest.fn(),
    addLayer: jest.fn()
  })),
}));
jest.mock('../../RouteContainer/RouteContainer',
  () => ({ RouteContainerWithProfile: () => <div>Route container content</div> }));

describe('MapContainer', () => {
  it('renders correctly', () => {
    mapboxgl.Map.mockReturnValueOnce({
      remove: jest.fn(),
      flyTo: jest.fn(),
      getLayer: jest.fn(),
      addSource: jest.fn(),
      addLayer: jest.fn()
    });

    const mockStore = {
      getState: () => ({ route: { routeData: [] }}),
      subscribe: () => {},
      dispatch: () => {},
    };

    const { getByTestId, getByText } = render(
      <Provider store={mockStore}>
        <MapPageWithRoute />
      </Provider>
    );

    expect(mapboxgl.Map).toHaveBeenCalledWith({
      container: getByTestId('map'),
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [30.0609, 59.9311],
      zoom: 9
    });

    expect(getByText('Route container content')).toBeInTheDocument();
  });
});