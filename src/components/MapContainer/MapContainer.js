import React, { Component } from 'react';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const StyledMap = styled.div`
  width: 100%;
  height: calc(100vh - 102px);
`;

export class MapContainer extends Component {
  state = {
    xPosition: 37.6173,
    yPosition: 55.7558,
    zoom: 9
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [this.state.xPosition, this.state.yPosition],
      zoom: this.state.zoom
    });

    this.map.on('move', () => {
      this.setState({
        xPosition: this.map.getCenter().lng.toFixed(4),
        yPosition: this.map.getCenter().lng.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <StyledMap ref={el => this.mapContainer = el} data-testid="map"/>
  }
}