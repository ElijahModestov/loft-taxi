import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin: 50px 0 0;
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 70px;
  font-size: 24px;
  line-height: 28px;
  background: #FDBF5A;
  color: #000;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #FFA842;
  }
  
  &[disabled] {
    background: #D8D7D5;
    color: #737373;
    pointer-events: none;
  }
`;

export const Button = ({ buttonType, buttonText = '', isButtonDisabled = false }) => {
  return (
    <StyledButton type={buttonType}
                  disabled={isButtonDisabled}>
      {buttonText}
    </StyledButton>
  )
};

Button.propTypes = {
  buttonType: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  isButtonDisabled: PropTypes.bool
};