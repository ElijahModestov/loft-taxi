import React from 'react';
import styled, { css } from 'styled-components';

import logo_primary from '../../assets/logo_primary.svg';
import logo_secondary from '../../assets/logo_secondary.svg';

const LogoSecondary = styled.img`
    width: 196px;
    height: 36px;
`;

const LogoBox = styled.div`
    display: flex;
    align-items: center;
    ${props => !props.rowView && css`
      flex-direction: column;
    `}
  `;

const LogoPrimary = styled.img`
    ${props => props.rowView ? css`
      margin: 0 16px 0 0;
      width: 61px;
      height: 61px;`
  : css`
      margin: 0 0 22px 0;
      width: 136px;
      height: 136px;`
}
  `;

const LogoContainer = ({ rowView = false }) => {
  return (
    <LogoBox rowView={rowView}>
      <LogoPrimary src={logo_primary} rowView={rowView} alt="logo primary"/>
      <LogoSecondary src={logo_secondary} alt="logo secondary"/>
    </LogoBox>
  )
};

export default LogoContainer;