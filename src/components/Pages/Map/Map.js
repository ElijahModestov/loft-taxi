import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import { getRouteData } from '../../../store/reducers/route';

import 'mapbox-gl/dist/mapbox-gl.css';

import { RouteContainerWithProfile } from '../../RouteContainer/RouteContainer';

const mapOptions = {
  xPosition: 30.0609,
  yPosition: 59.9311,
  zoom: 9
}

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 102px);
  position: relative;
`;

const StyledMap = styled.div`
  width: 100%;
  height: calc(100vh - 102px);
`;

const drawRoute = (map, coordinates) => {
  const routeDataObject = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates
    }
  }

  map.flyTo({
    center: coordinates[0],
    zoom: 15
  });

  if (map.getLayer("route") !== undefined) {
    map.getSource("route").setData(routeDataObject);
  } else {
    map.addSource("route", { type: 'geojson', data: routeDataObject });
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#ffc617",
        "line-width": 8
      }
    });
  }
};

export class MapPage extends Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [mapOptions.xPosition, mapOptions.yPosition],
      zoom: mapOptions.zoom
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.routeData !== this.props.routeData) {
      drawRoute(this.map, this.props.routeData);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <MapContainer>
        <StyledMap ref={el => this.mapContainer = el} data-testid="map"/>
        <RouteContainerWithProfile />
      </MapContainer>
    )
  }
}

MapPage.propTypes = {
  routeData: PropTypes.array
}

export const MapPageWithRoute = connect(
  (state) => ({ routeData: getRouteData(state) })
)(MapPage);