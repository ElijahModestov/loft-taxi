import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

import { Header } from './components/Header/Header';
import { LoginPage } from './components/Pages/Login/Login';
import { RegistrationPage } from './components/Pages/Registration/Registration';
import { MapPage } from './components/Pages/Map/Map';
import { ProfilePage } from './components/Pages/Profile/Profile';

import { withAuth } from './components/AuthContext/AuthContext';

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

class App extends Component {
  state = {
    activePageId: 1
  }

  onPageChange = (activePageId) => {
    this.setState({
      activePageId
    });
  }

  render() {
    const { activePageId } = this.state;
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <>
        <GlobalStyle/>
        {!isLoggedIn && activePageId === 1 &&
          <LoginPage onPageChange={this.onPageChange} />
        }
        {!isLoggedIn && activePageId === 2 &&
          <RegistrationPage onPageChange={this.onPageChange} />
        }
        {isLoggedIn &&
          <Header activePageId={activePageId}
                  onPageChange={this.onPageChange}/>
        }
        {isLoggedIn && activePageId === 3 &&
          <MapPage/>
        }
        {isLoggedIn && activePageId === 4 &&
          <ProfilePage/>
        }
      </>
    );
  };
}

App.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default withAuth(App);