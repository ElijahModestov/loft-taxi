import React from 'react';
import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  list-style: none;
`;

const NavItem = styled.li`
  margin-right: 24px;
  color: ${props => props.active ? '#FDBF5A' : '#fff'};
  font-size: 21px;
  cursor: pointer;
  pointer-events: ${props => props.active ? 'none' : 'auto'};
  
  &:last-child {
    margin-right: 0;
  }
  
  &:hover {
    color: #FFA842;
  }
`;

const NavContainer = ({ navItems, onPageChange }) => {
  const elements = navItems.map((item) => {
    const { id, label, isActive } = item;

    return (
      <NavItem key={id} active={isActive} onClick={() => onPageChange(id)}>{ label }</NavItem>
    );
  });

  return (
    <NavList>
      { elements }
      <NavItem>Выйти</NavItem>
    </NavList>
  );
}

export default NavContainer;