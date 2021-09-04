import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updatePaymentData } from '../../../actions';
import { getCardName, getCardNumber, getExpiryDate, getCvc } from '../../../reducers/profile';
import { getToken } from '../../../reducers/auth';

import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import bg_map from '../../../assets/bg_map_shadowed.jpg';
import card_pic from '../../../assets/card.svg';


const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 102px);
  background: url(${bg_map}) no-repeat center;
  background-size: cover;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  margin: 0 auto;
  padding: 58px 44px 66px;
  width: 888px;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fff;
`;

const FormHeader = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
`;

const ProfileText = styled.div`
  margin: 13px 0 51px;
  font-size: 18px;
  text-align: center;
  color: #7B7B7B;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const DataContainer = styled.div`
  width: 355px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CardPicture = styled.img`
  margin: 0 -24px 0 0;
  width: 391px;
  height: 226px;
`;

const LinkButton = styled(Link)`
  margin: 50px auto 0;
  max-width: 353px;
  width: 100%;
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

export class ProfilePage extends Component {
  state = {
    isProfileChanged: false,
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  }

  componentDidMount() {
    const { storedCardName, storedCardNumber, storedExpiryDate, storedCvc } = this.props;

    this.setState({
      cardName: storedCardName,
      cardNumber: storedCardNumber,
      expiryDate: storedExpiryDate,
      cvc: storedCvc
    });
  }

  onProfileSubmit = (e) => {
    e.preventDefault();
    const { cardName, cardNumber, expiryDate, cvc } = this.state;
    const { token } = this.props;

    this.setState({
      isProfileChanged: true
    });
    this.props.updatePaymentData(cardName, cardNumber, expiryDate, cvc, token);
  };

  onInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { isProfileChanged, cardName, cardNumber, expiryDate, cvc } = this.state;

    return (
      <PageContainer>
        <FormContainer>
          <FormHeader>Профиль</FormHeader>
          {!isProfileChanged ? (
            <>
              <ProfileText>Введите платежные данные</ProfileText>
              <ProfileForm onSubmit={this.onProfileSubmit}>
                <DataContainer>
                  <Input inputType={'text'}
                         inputName={'cardName'}
                         labelText={'Имя владельца'}
                         placeholderText={'Loft'}
                         currentValue={cardName}
                         onInputChange={this.onInputChange}/>
                  <Input inputType={'text'}
                         inputName={'cardNumber'}
                         labelText={'Номер карты'}
                         placeholderText={'5545 2300 3432 4521'}
                         currentValue={cardNumber}
                         onInputChange={this.onInputChange}/>
                  <Input inputType={'text'}
                         inputName={'expiryDate'}
                         labelText={'MM/YY'}
                         placeholderText={'05/08'}
                         currentValue={expiryDate}
                         onInputChange={this.onInputChange}
                         customWidth={'calc(50% - 18px)'}/>
                  <Input inputType={'text'}
                         inputName={'cvc'}
                         labelText={'CVC'}
                         placeholderText={'667'}
                         currentValue={cvc}
                         onInputChange={this.onInputChange}
                         customWidth={'calc(50% - 18px)'}/>
                </DataContainer>
                <CardPicture src={card_pic} alt="demo cart picture" />
                <Button buttonType={'submit'}
                        buttonText={'Сохранить'}
                        isButtonDisabled={!cardName || !cardNumber || !expiryDate || !cvc}/>
              </ProfileForm>
            </>
            ) : (
              <>
                <ProfileText>
                  Платежные данные обновлены. Теперь вы можете заказывать такси.
                </ProfileText>
                <LinkButton to="/">Перейти на карту</LinkButton>
              </>
            )
          }
        </FormContainer>
      </PageContainer>
    );
  }
}

ProfilePage.propTypes = {
  storedCardName: PropTypes.string.isRequired,
  storedCardNumber: PropTypes.string.isRequired,
  storedExpiryDate: PropTypes.string.isRequired,
  storedCvc: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  updatePaymentData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  storedCardName: getCardName(state),
  storedCardNumber: getCardNumber(state),
  storedExpiryDate: getExpiryDate(state),
  storedCvc: getCvc(state),
  token: getToken(state)
});

export const ProfilePageWithProfileDataAndAuth = connect(
  mapStateToProps,
  { updatePaymentData }
)(ProfilePage);