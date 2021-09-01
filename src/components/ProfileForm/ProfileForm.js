import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import card_pic from '../../assets/card.svg';

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

class ProfileData extends Component {
  state = {
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvc: ''
  }

  onInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { onProfileSubmit } = this.props;
    const { name, cardNumber, expirationDate, cvc } = this.state;

    return (
      <>
        <ProfileText>Введите платежные данные</ProfileText>
        <ProfileForm onSubmit={onProfileSubmit}>
          <DataContainer>
            <Input inputType={'text'}
                   inputName={'name'}
                   labelText={'Имя владельца'}
                   placeholderText={'Loft'}
                   currentValue={name}
                   onInputChange={this.onInputChange}/>
            <Input inputType={'text'}
                   inputName={'cardNumber'}
                   labelText={'Номер карты'}
                   placeholderText={'5545 2300 3432 4521'}
                   currentValue={cardNumber}
                   onInputChange={this.onInputChange}/>
            <Input inputType={'text'}
                   inputName={'expirationDate'}
                   labelText={'MM/YY'}
                   placeholderText={'05/08'}
                   currentValue={expirationDate}
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
                  isButtonDisabled={!name || !cardNumber || !expirationDate || !cvc}/>
        </ProfileForm>
      </>
    )
  }
}

export const ProfileDataWithAuth = connect(
  null,
  null
)(ProfileData);