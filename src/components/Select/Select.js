import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import nav_arrow from '../../assets/nav-arrow.svg';
import bottom_arrow_gray from '../../assets/select-arrow-gray.svg';
import bottom_arrow_black from '../../assets/select-arrow-black.svg';
import cross_gray from '../../assets/cross-gray.svg';
import cross_black from '../../assets/cross-black.svg';

const DropDownContainer = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 1px solid #E0E0E0;
`;

const DropDownHeader = styled.div`
  padding: 16px 60px 20px 58px;
  position: relative;
  font-size: 18px;
  font-weight: 400;
  color: #000;
  background: transparent;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    ${props => props.markerType === 'arrow'
      ? css`
        left: 27px;
        top: 19px;
        width: 17px;
        height: 17px;
        background: url(${nav_arrow}) no-repeat center;
      ` 
      : css`
        left: 30px;
        top: 19px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #000;
      `} 
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 36px;
    top: 22px;
    width: 16px;
    height: 10px;
    background: url(${bottom_arrow_gray}) no-repeat center;
  }
  
  &:hover {
    &::after {
      background: url(${bottom_arrow_black}) no-repeat center;
    }
  }
`;

const DropDownListContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 100;
`;

const DropDownList = styled.ul`
  margin: 0;
  padding: 8px 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  color: #000;
  font-size: 18px;
  font-weight: 500;
`;

const ListItem = styled.li`
  margin: 0;
  padding: 8px 16px 8px 58px;
  list-style: none;
  cursor: pointer;
  
  &:hover {
    background: #D8D7D5;
  }
`;

const ClearButton = styled.div`
  position: absolute;
  top: 12px;
  right: 64px;
  width: 26px;
  height: 30px;
  border-right: 1px solid #E0E0E0;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 14px;
    height: 14px;
    background: url(${cross_gray}) no-repeat center;
  }
  
  &:hover {
    &::before {
      background: url(${cross_black}) no-repeat center;
    }
  }
`;

export const Select = ({ optionsList, onSelectChange, defaultValue = 'Выберите из списка',
                         className = '', markerType = 'arrow' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onSelectChange(value);
  };

  const onClearClicked = () => {
    setSelectedOption(defaultValue);
    onSelectChange(null);
  };

  return (
    <DropDownContainer className={className}>
      <DropDownHeader markerType={markerType}
                      onClick={toggling}>
        {selectedOption || defaultValue}
        <ClearButton onClick={onClearClicked} />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {optionsList.map(item => (
              <ListItem onClick={onOptionClicked(item.option)} key={item.id}>
                {item.option}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

Select.propTypes = {
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      option: PropTypes.string.isRequired,
    })
  ),
  onSelectChange: PropTypes.func,
  className: PropTypes.string,
  defaultValue: PropTypes.string
}