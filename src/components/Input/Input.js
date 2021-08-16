import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin: 25px 0 0;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  margin: 10px 0 0;
  padding: 0 0 11px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #E4E4E4;
  font-size: 18px;
  outline: none;
`;

const Input = ({ inputType, inputName, labelText, placeholderText, onInputChange, currentValue,
                 isRequired = true }) => {
  return (
    <InputContainer>
      <StyledLabel>
        {labelText}
        <StyledInput id={inputName}
                     name={inputName}
                     type={inputType}
                     onChange={(e) => {onInputChange(e)}}
                     placeholder={placeholderText}
                     value={currentValue}
                     required={isRequired} />
      </StyledLabel>
    </InputContainer>
  );
};

export default Input;