import React from 'react';
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

const Button = ({ buttonText, onPageChange, isButtonDisabled = false }) => {
  return (
    <StyledButton onClick={() => {onPageChange(3, true)}}
                  disabled={isButtonDisabled}>
      {buttonText}
    </StyledButton>
  )
};

export default Button;