import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';

import Header from './components/Header';
import LoginPage from './components/Pages/Login';
import RegistrationPage from './components/Pages/Registration';
import MapPage from './components/Pages/Map';
import ProfilePage from './components/Pages/Profile';

import { withAuth } from './components/AuthContext';

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

export default withAuth(App);