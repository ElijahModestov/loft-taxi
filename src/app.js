import React, { Component } from 'react';

import Header from '../header';
import LoginPage from '../pages/login';
import MapPage from '../pages/map';
import ProfilePage from '../pages/profile';
import RegistrationPage from '../pages/registration';

import './App.css';

function App() {
  return (
    <>
      <Header/>
      <MapPage/>
      <ProfilePage/>
      <LoginPage/>
      <RegistrationPage/>
    </>
  );
}

export default App;