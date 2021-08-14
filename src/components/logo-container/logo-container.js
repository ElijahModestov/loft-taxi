import React from 'react';
import styled from 'styled-components';

import logo_primary from '../../assets/logo_primary.svg';
import logo_secondary from '../../assets/logo_secondary.svg';

const LogoBox = styled.div`
  display: flex;
  align-items: center;
`;

const LogoPrimary = styled.img`
  margin: 0 16px 0 0;
  width: 66px;
  height: 66px;
`;

const LogoSecondary = styled.img`
  width: 196px;
  height: 25px;
`;

const LogoContainer = (className) => {
  return (
    <LogoBox className={className}>
      <LogoPrimary src={logo_primary} alt="logo primary"/>
      <LogoSecondary src={logo_secondary} alt="logo secondary"/>
    </LogoBox>
  )
};

export default LogoContainer;