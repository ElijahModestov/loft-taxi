import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin: 11px 0 0;
  padding: 0 0 14px;
  width: ${props => props.customWidth || '100%' };
  position: relative;
`;

const InputError = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #FF0000;
  font-size: 12px;
  line-height: 14px;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.hasValidationError ? '#FF0000' : 'inherit'}
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
  
  &:focus {
    border-color: #2D7EF7;
  }
`;

export const InputAdapter = ({ input, meta, ...rest }) => (
  <Input
    {...input}
    {...rest}
    errorText={meta.touched ? meta.error : ''}
  />
)

export const Input = ({ inputType, inputName, labelText, placeholderText,
                        currentValue, onInputChange, customWidth, isRequired = true,
                        errorText = '', ...input }) => {
  return (
    <InputContainer customWidth={customWidth}>
      <StyledLabel hasValidationError={errorText !== ''}>
        {labelText}
        <StyledInput {...input}
                     id={inputName}
                     name={inputName}
                     type={inputType}
                     value={currentValue}
                     placeholder={placeholderText}
                     onChange={onInputChange}
                     required={isRequired} />
      </StyledLabel>
      <InputError>
        {errorText}
      </InputError>
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
  customWidth: PropTypes.string,
  errorText: PropTypes.string
};