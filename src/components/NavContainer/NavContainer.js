import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withAuth } from '../AuthContext';

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

const NavContainer = ({ activePageId, onPageChange, logout }) => {
  const logoutAndRedirect = () => {
    logout();
    onPageChange(1);
  };

  return (
    <NavList>
      <NavItem key={3}
               active={activePageId === 3}
               onClick={() => onPageChange(3)}>
        Карта
      </NavItem>
      <NavItem key={4}
               active={activePageId === 4}
               onClick={() => onPageChange(4)}>
        Профиль
      </NavItem>
      <NavItem onClick={logoutAndRedirect}>Выйти</NavItem>
    </NavList>
  );
}

NavContainer.propTypes = {
  activePageId: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export const NavContainerWithAuth = withAuth(NavContainer);