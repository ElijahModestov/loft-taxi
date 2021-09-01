import React from 'react';
import styled from 'styled-components';

import { LogoContainer } from '../LogoContainer/LogoContainer';
import { NavContainerWithAuth } from '../NavContainer/NavContainer';

const HeaderContainer = styled.div`
  padding: 0 50px 0 27px;
  width: 100%;
  height: 102px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1C1A19;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer rowView={true}/>
      <NavContainerWithAuth />
    </HeaderContainer>
  );
};