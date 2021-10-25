import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { updatePaymentData } from '../../../store/actions/profile';
import { getCardName, getCardNumber, getExpiryDate, getCvc } from '../../../store/reducers/profile';
import { getToken } from '../../../store/reducers/auth';

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

const CardDemoContainer = styled.div`
  margin: 0 -24px 0 0;
  width: 391px;
  height: 226px;
  position: relative;
  background: url(${card_pic}) no-repeat center;
`;

const CardDemoNumber = styled.div`
  position: absolute;
  left: 50px;
  top: 95px;
  font-size: 21px;
  letter-spacing: 0.1px;
`;

const CardDemoExpiryDate = styled.div`
  position: absolute;
  top: 45px;
  right: 38px;
  font-size: 12px;
  letter-spacing: 1px;
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

const normalizeCardNumber = (value) => {
  return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ').substr(0, 19) || '';
};

const normalizeExpiryDate = (value) => {
  return value.length === 3 && !value.includes('/') ?
    `${value.substr(0, 2)}/${value.substr(2, 1)}` :
    value.length > 5 ? value.substr(0, 5) : value;
};

const normalizeCvc = (value) => {
  return value.length > 3 ? Math.floor(value / 10) : value;
}

const ProfilePage = ({ storedCardName, storedCardNumber, storedExpiryDate,
                       storedCvc, token, updatePaymentData }) => {
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const validationSchema = yup.object({
    cardName: yup.string()
      .required('Введите имя владельца карты'),
    cardNumber: yup.string()
      .required('Введите номер карты')
      .min(3, 'Пароль должен содержать минимум 3 символа'),
    expiryDate: yup.string()
      .required('Введите дату окончания действия карты'),
    cvc: yup.number()
      .typeError('Укажите 3 цифры')
      .required('Укажите 3 цифры')
      .min(3, 'Укажите 3 цифры')
  });
  const formOptions = {
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {cardName: '', cardNumber: '', expiryDate: '', cvc: ''}
  };
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid }
  } = useForm(formOptions);

  const watchCardDemoExpiryDate = watch('expiryDate');
  const watchCardDemoNumber = watch('cardNumber').replace(/\s/g, '&nbsp;&nbsp;&nbsp;&nbsp;');

  useEffect(() => {
    setValue('cardName', storedCardName);
    setValue('cardNumber', storedCardNumber);
    setValue('expiryDate', storedExpiryDate);
    setValue('cvc', storedCvc);
    setTimeout(() => trigger(), 1000);
  }, [trigger, setValue, storedCardName, storedCardNumber, storedExpiryDate, storedCvc]);

  const onProfileSubmit = () => {
    const [cardName, cardNumber, expiryDate, cvc] = getValues(['cardName', 'cardNumber', 'expiryDate', 'cvc']);
    setIsProfileChanged(true);
    updatePaymentData(cardName, cardNumber, expiryDate, cvc, token);
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormHeader>Профиль</FormHeader>
        {!isProfileChanged ? (
          <>
            <ProfileText>Введите платежные данные</ProfileText>
            <ProfileForm onSubmit={handleSubmit(onProfileSubmit)}>
              <DataContainer>
                <Controller
                  name="cardName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputType={'text'}
                      inputName={'cardName'}
                      labelText={'Имя владельца'}
                      placeholderText={'Loft'}
                      errorText={errors.cardName?.message}
                    />
                  )}
                />
                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputType={'text'}
                      inputName={'cardNumber'}
                      labelText={'Номер карты'}
                      placeholderText={'5545 2300 3432 4521'}
                      errorText={errors.cardNumber?.message}
                      onChange={(event) => {
                        const { value } = event.target;
                        setValue('cardNumber', normalizeCardNumber(value));
                      }}
                    />
                  )}
                />
                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputType={'text'}
                      inputName={'cardNumber'}
                      labelText={'MM/YY'}
                      placeholderText={'05/08'}
                      customWidth={'calc(50% - 18px)'}
                      errorText={errors.expiryDate?.message}
                      onChange={(event) => {
                        const { value } = event.target;
                        setValue('expiryDate', normalizeExpiryDate(value));
                      }}
                    />
                  )}
                />
                <Controller
                  name="cvc"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputType={'text'}
                      inputName={'cvc'}
                      labelText={'CVC'}
                      placeholderText={'667'}
                      customWidth={'calc(50% - 18px)'}
                      errorText={errors.cvc?.message}
                      onChange={(event) => {
                        const { value } = event.target;
                        setValue('cvc', normalizeCvc(value));
                      }}
                    />
                  )}
                />
              </DataContainer>
              <CardDemoContainer>
                <CardDemoNumber dangerouslySetInnerHTML={{__html: watchCardDemoNumber}}/>
                <CardDemoExpiryDate>{watchCardDemoExpiryDate}</CardDemoExpiryDate>
              </CardDemoContainer>
              <Button
                buttonType={'submit'}
                buttonText={'Сохранить'}
                isButtonDisabled={!isValid}
              />
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