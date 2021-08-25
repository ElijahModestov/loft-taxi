import React from 'react';
import PropTypes from 'prop-types';
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

export const Header = ({ activePageId, onPageChange}) => {
  return (
    <HeaderContainer>
      <LogoContainer rowView={true}/>
      <NavContainerWithAuth activePageId={activePageId}
                            onPageChange={onPageChange}/>
    </HeaderContainer>
  );
};

Header.propTypes = {
  activePageId: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};