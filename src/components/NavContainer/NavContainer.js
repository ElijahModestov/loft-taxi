import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../store/actions/auth';
import { compose } from '../HocUtils/compose';

const NavList = styled.div`
  display: flex;
`;

const NavItem = styled(Link)`
  margin-right: 24px;
  color: ${props => props.selected ? '#FDBF5A' : '#fff'};
  font-size: 21px;
  cursor: pointer;
  text-decoration: none;
  pointer-events: ${props => props.selected ? 'none' : 'auto'};
  
  &:hover {
    color: #FFA842;
  }
`;

const NavItemLogout = styled.div`
  color: #fff;
  font-size: 21px;
  cursor: pointer;
  
  &:hover {
    color: #FFA842;
  }
`;

const NavContainer = ({ logout, history }) => {
  const currentPage = history.location.pathname;

  return (
    <NavList>
      <NavItem to="/"
               selected={currentPage === '/'}>
        Карта
      </NavItem>
      <NavItem to="/profile"
               selected={currentPage === '/profile'}>
        Профиль
      </NavItem>
      <NavItemLogout onClick={logout}>Выйти</NavItemLogout>
    </NavList>
  );
}

NavContainer.propTypes = {
  logout: PropTypes.func.isRequired
};

export const NavContainerWithAuth = compose(
  withRouter,
  connect(
    null,
    { logout }
  )
)(NavContainer);