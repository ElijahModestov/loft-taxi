import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { authenticateUser } from '../../store/actions/auth';
import { getIsLoggedIn } from '../../store/reducers/auth';
import { compose } from '../HocUtils/compose';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

const AuthForm = styled.form`
  padding: 86px 112px 72px;
  width: 580px;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const RestorePassword = styled.div`
  margin: 13px 0 0 auto;
  color: #828282;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    color: #FFA842;
  }
`;

const FormTypeChange = styled.div`
  margin: 33px auto 0;
  font-size: 16px;
  color: #828282;
`;

const FormTypeChangeBtn = styled(Link)`
  color: #FDBF5A;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #FFA842;
  }
`;

const UserLoginForm = ({ isLoggedIn, authenticateUser, history }) => {
  const validationSchema = yup.object({
    email: yup.string()
      .required('Введите ваш e-mail')
      .email('Введите корректный e-mail'),
    password: yup.string()
      .required('Введите ваш пароль')
      .min(3, 'Пароль должен содержать минимум 3 символа')
  });
  const formOptions = {
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {email: '', password: ''}
  };
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid }
  } = useForm(formOptions);
  const [email, password] = getValues(['email', 'password']);

  useEffect(() => {
    isLoggedIn && history.push('/');
  }, [isLoggedIn, history]);

  const onSubmitForm = () => {
    authenticateUser(email, password);
    history.push('/');
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmitForm)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            inputType={'text'}
            inputName={'email'}
            labelText={'Email'}
            placeholderText={'mail@mail.ru'}
            errorText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            inputType={'password'}
            inputName={'password'}
            labelText={'Пароль'}
            placeholderText={'*************'}
            errorText={errors.password?.message}
          />
        )}
      />
      <RestorePassword>
        Забыли пароль?
      </RestorePassword>
      <Button
        buttonType={'submit'}
        buttonText={'Войти'}
        isButtonDisabled={!isValid}
      />
      <FormTypeChange>
        Новый пользователь? <FormTypeChangeBtn to="/registration">Регистрация</FormTypeChangeBtn>
      </FormTypeChange>
    </AuthForm>
  )
}

UserLoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  authenticateUser: PropTypes.func.isRequired
};

export const UserLoginFormWithAuth = compose(
  withRouter,
  connect(
    (state) => ({ isLoggedIn: getIsLoggedIn(state) }),
    { authenticateUser }
  )
)(UserLoginForm);