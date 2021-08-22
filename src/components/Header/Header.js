import React from 'react';
import LogoContainer from '../LogoContainer';
import NavContainer from '../NavContainer';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  padding: 0 50px 0 27px;
  width: 100%;
  height: 102px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1C1A19;
`;

const Header = ({navItems, onPageChange}) => {
  return (
    <HeaderContainer>
      <LogoContainer rowView={true}/>
      <NavContainer navItems={navItems} onPageChange={onPageChange}/>
    </HeaderContainer>
  );
};

export default Header;