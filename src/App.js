import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';

import Header from './components/Header';
import LoginPage from './components/Pages/Login';
import RegistrationPage from './components/Pages/Registration';
import MapPage from './components/Pages/Map';
import ProfilePage from './components/Pages/Profile';

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
      { id: 1, label: 'Войти', isNavItem: false, showHeader: false },
      { id: 2, label: 'Регистрация', isNavItem: false, showHeader: false },
      { id: 3, label: 'Карта', isNavItem: true, showHeader: true },
      { id: 4, label: 'Профиль', isNavItem: true, showHeader: true }
    ],
    activePageId: 1,
    isHeaderShown: false,
    regForm: {
      email: '',
      name: '',
      password: ''
    }
  };

  onPageChange = (activePageId, isHeaderShown) => {
    this.setState({
      activePageId,
      isHeaderShown
    });
  };

  onInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    this.setState({
      regForm: {
        ...this.state.regForm,
        [name]: target.value
      }
    });
  }

  onRegSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { pages } = this.state;
    const { email, name, password } = this.state.regForm;
    const navItems = pages.filter((page) => page.isNavItem);
    let ActivePageComponent;

    switch (this.state.activePageId) {
      case 1:
        ActivePageComponent = <LoginPage onPageChange={this.onPageChange}
                                         onInputChange={this.onInputChange}
                                         onRegSubmit={this.onRegSubmit}
                                         email={email}
                                         password={password} />;
        break;
      case 2:
        ActivePageComponent = <RegistrationPage onPageChange={this.onPageChange}
                                                onInputChange={this.onInputChange}
                                                onRegSubmit={this.onRegSubmit}
                                                email={email}
                                                name={name}
                                                password={password}/>;
        break;
      case 3:
        ActivePageComponent = <MapPage/>;
        break;
      case 4:
        ActivePageComponent = <ProfilePage/>;
        break;
      default:
        ActivePageComponent = <LoginPage onPageChange={this.onPageChange}
                                         onInputChange={this.onInputChange}
                                         onRegSubmit={this.onRegSubmit}
                                         email={email}
                                         password={password} />;
    }

    return (
      <>
        <GlobalStyle/>
        {this.state.isHeaderShown &&
          <Header navItems={navItems} onPageChange={this.onPageChange}/>
        }
        {ActivePageComponent}
      </>
    );
  };
}