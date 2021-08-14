import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';

import Header from './components/header';
import LoginPage from './components/pages/login';
import MapPage from './components/pages/map';
import ProfilePage from './components/pages/profile';
import RegistrationPage from './components/pages/registration';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.2;
  }
`;

export default class App extends Component {
  state = {
    pages: [
      { id: 1, label: 'Войти', isNavItem: false },
      { id: 2, label: 'Регистрация', isNavItem: false },
      { id: 3, label: 'Карта', isNavItem: true },
      { id: 4, label: 'Профиль', isNavItem: true }
    ],
    activePageId: 1
  }

  onPageChange = (id) => {
    this.setState({
      activePageId: id
    });
  };

  render() {
    const { pages } = this.state;
    const navItems = pages.filter((page) => page.isNavItem);
    let ActivePageComponent;
    switch (this.state.activePageId) {
      case 1:
        ActivePageComponent = <LoginPage/>;
        break;
      case 2:
        ActivePageComponent = <RegistrationPage/>;
        break;
      case 3:
        ActivePageComponent = <MapPage/>;
        break;
      case 4:
        ActivePageComponent = <ProfilePage/>;
        break;
      default:
        ActivePageComponent = <LoginPage/>;
    }

    return (
      <>
        <GlobalStyle/>
        <Header navItems={navItems} onPageChange={this.onPageChange}/>
        {ActivePageComponent}
      </>
    )
  }
}