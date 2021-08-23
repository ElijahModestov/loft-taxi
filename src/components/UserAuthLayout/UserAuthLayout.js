import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import bg_map from '../../assets/bg_map.jpg';
import LogoContainer from "../LogoContainer";

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

const UserAuthLayout = ({ children }) => {
  return (
    <LoginPageContainer>
      <SideContainer>
        <LogoContainer/>
      </SideContainer>
      <MainContainer>
        {children}
      </MainContainer>
    </LoginPageContainer>
  );
};

UserAuthLayout.propTypes = {
  children: PropTypes.node
};

export default UserAuthLayout;