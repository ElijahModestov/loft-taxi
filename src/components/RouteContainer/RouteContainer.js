import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchRouteData } from '../../store/actions/route';
import { getHasEligiblePayment } from '../../store/reducers/profile';
import { getAddressesList } from '../../store/reducers/addresses';
import { Link } from 'react-router-dom';

import { Button } from '../Button/Button';
import { Select } from '../Select/Select';

import standard_car from '../../assets/car-standard.jpg';
import premium_car from '../../assets/car-premium.jpg';
import business_car from '../../assets/car-business.jpg';

const StyledRouteContainer = styled.div`
  position: absolute;
  top: 59px;
  left: 59px;
  width: 486px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.25);
`;

const StyledHeader = styled.div`
  margin: 39px 41px 14px;
  font-size: 36px;
  font-weight: bold;
`;

const StyledText = styled.div`
  margin: 0 41px 50px;
  font-size: 18px;
  color: #7B7B7B;
`;

const LinkButton = styled(Link)`
  margin: 0 41px 39px;
  width: calc(100% - 82px);
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
  text-decoration: none;

  &:hover {
    background: #FFA842;
  }
`;

const StyledButton = styled(Button)`
  margin: 0 41px 39px;
  width: calc(100% - 82px);
  max-width: none;
`;

const OrderSubmitContainer = styled.div`
  margin: 23px 0 0;
  padding: 32px 0 1px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.25);
`;

const CarOptionsContainer = styled.div`
  margin: 0 41px 30px;
  width: calc(100% - 82px);
  display: flex;
  justify-content: space-between;
`;

const CarItemContainer = styled.div`
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: ${props => props.isSelected ? '1' : '0.4'};
  
  &:hover {
    opacity: 1;
  }
`;

const CarItemHeader = styled.div`
  margin: 0 0 8px;
  font-size: 16px;
`;

const CarItemLabel = styled.div`
  font-size: 11px;
  letter-spacing: 0.4px;
  color: #828282;
`;

const CarItemCost = styled.div`
  font-size: 24px;
`;

const CarItemImg = styled.img`
  width: 95px;
  height: 73px;
  object-fit: contain;
`;

const CarOptionsItem = ({ carCategory, tripCost, categoryImg, isSelected, onCarClick }) => {
  return (
    <CarItemContainer onClick={onCarClick}
                      isSelected={isSelected}>
      <CarItemHeader>{carCategory}</CarItemHeader>
      <CarItemLabel>Стоимость</CarItemLabel>
      <CarItemCost>{tripCost} ₽</CarItemCost>
      <CarItemImg src={categoryImg} alt="car category"/>
    </CarItemContainer>
  )
};

const RouteContainer = ({ hasEligiblePayment, addressesList = [], fetchRouteData }) => {
  const [filteredAddressesList, setFilteredAddressesList] = useState(addressesList);
  const [selectedAddressFrom, setSelectedAddressFrom] = useState(null);
  const [selectedAddressTo, setSelectedAddressTo] = useState(null);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [carCategorySelected, setCarCategorySelected] = useState(null);

  const onSelectFromChange = value => setSelectedAddressFrom(value);
  const onSelectToChange = value => setSelectedAddressTo(value);
  const submitRoute = () => {
    setIsOrderCompleted(true);
    fetchRouteData(selectedAddressFrom, selectedAddressTo);
  };

  useEffect(() => {
    setFilteredAddressesList(addressesList.filter(
      (item) => item.option !== selectedAddressFrom && item.option !== selectedAddressTo));
  }, [addressesList, selectedAddressFrom, selectedAddressTo]);


  const RouteContentEligiblePayment = !isOrderCompleted ? (
    <>
      <Select optionsList={filteredAddressesList}
              onSelectChange={onSelectFromChange}
              defaultValue="Выберите адрес отправления"
              markerType="circle" />
      <Select optionsList={filteredAddressesList}
              onSelectChange={onSelectToChange}
              defaultValue="Выберите адрес назначения"
              markerType="arrow" />
      <OrderSubmitContainer>
        <CarOptionsContainer>
          <CarOptionsItem carCategory="Стандарт"
                          tripCost="150"
                          categoryImg={standard_car}
                          isSelected={carCategorySelected === 'Стандарт'}
                          onCarClick={() => setCarCategorySelected('Стандарт')} />
          <CarOptionsItem carCategory="Премиум"
                          tripCost="250"
                          categoryImg={premium_car}
                          isSelected={carCategorySelected === "Премиум"}
                          onCarClick={() => setCarCategorySelected('Премиум')} />
          <CarOptionsItem carCategory="Бизнес"
                          tripCost="300"
                          categoryImg={business_car}
                          isSelected={carCategorySelected === "Бизнес"}
                          onCarClick={() => setCarCategorySelected('Бизнес')} />
        </CarOptionsContainer>
        <StyledButton buttonType="button"
                      buttonText="Заказать"
                      isButtonDisabled={!selectedAddressFrom || !selectedAddressTo || !carCategorySelected}
                      onBtnClick={submitRoute}/>
      </OrderSubmitContainer>
    </>
  ) : (
    <>
      <StyledHeader>Заказ размещен</StyledHeader>
      <StyledText>
        Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.
      </StyledText>
      <StyledButton buttonType="button"
                    buttonText="Сделать новый заказ"
                    onBtnClick={() => setIsOrderCompleted(false)}/>
    </>
  );

  const RouteContentNoPayment = (
    <>
      <StyledHeader>Заполните профиль</StyledHeader>
      <StyledText>
        Для дальнейшего заказа такси заполните платежный профиль.
      </StyledText>
      <LinkButton to="/profile">Перейти к профилю</LinkButton>
    </>
  );

  return (
    <StyledRouteContainer>
      {hasEligiblePayment ? RouteContentEligiblePayment : RouteContentNoPayment}
    </StyledRouteContainer>
  )
};

RouteContainer.propTypes = {
  hasEligiblePayment: PropTypes.bool.isRequired,
  addressesList: PropTypes.array,
  fetchRouteData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  hasEligiblePayment: getHasEligiblePayment(state),
  addressesList: getAddressesList(state)
});

export const RouteContainerWithProfile = connect(
  mapStateToProps,
  { fetchRouteData }
)(RouteContainer);