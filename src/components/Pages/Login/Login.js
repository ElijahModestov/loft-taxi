import React, { Component } from 'react';
import styled from "styled-components";

import bg_map from '../../../assets/bg_map.jpg';

import LogoContainer from '../../LogoContainer';
import UserLoginForm from '../../UserLoginForm';
import UserRegistrationForm from '../../UserRegistrationForm';

const LoginPageContainer = styled.div`
  display: flex;
`;

const SideContainer = styled.div`
  width: 485px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #1C1A19;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${bg_map}) no-repeat center;
  background-size: cover;
`;

export default class LoginPage extends Component {
  state = {
    email: '',
    name: '',
    password: ''
  }

  onInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { onPageChange, regView = false } = this.props;
    const { email, name, password } = this.state;

    return (
      <LoginPageContainer>
        <SideContainer>
          <LogoContainer/>
        </SideContainer>
        <MainContainer>
          { regView ?
            <UserRegistrationForm currentEmail={email}
                                  currentName={name}
                                  currentPassword={password}
                                  onPageChange={onPageChange}
                                  onInputChange={this.onInputChange}
                                  isButtonDisabled={!this.state.email || !this.state.name || !this.state.password}
                                  handleSubmit={this.handleSubmit}/> :
            <UserLoginForm currentEmail={email}
                           currentPassword={password}
                           onPageChange={onPageChange}
                           onInputChange={this.onInputChange}
                           isButtonDisabled={!this.state.email || !this.state.password}
                           handleSubmit={this.handleSubmit}/>
          }
        </MainContainer>
      </LoginPageContainer>
    );
  }
}