import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin: 25px 0 0;
  width: ${props => props.customWidth || '100%' };
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

export const Input = ({ inputType, inputName, labelText, placeholderText, currentValue,
                 onInputChange, customWidth, isRequired = true }) => {
  return (
    <InputContainer customWidth={customWidth}>
      <StyledLabel>
        {labelText}
        <StyledInput id={inputName}
                     name={inputName}
                     type={inputType}
                     placeholder={placeholderText}
                     value={currentValue}
                     onChange={onInputChange}
                     required={isRequired} />
      </StyledLabel>
    </InputContainer>
  );
};

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  currentValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onInputChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  customWidth: PropTypes.string
};