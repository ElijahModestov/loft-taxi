import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

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
  const [auth, setAuth] = useState({
    email: '',
    password: ''
  });
  const { email, password } = auth;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    isLoggedIn && history.push('/');
  }, [isLoggedIn, history]);

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setAuth(auth => ({
      ...auth,
      [name]: value
    }));
  }

  const onSubmitForm = () => {
    authenticateUser(email, password);
    history.push('/');
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        {...register('email')}
        inputType={'email'}
        inputName={'email'}
        labelText={'Email'}
        placeholderText={'mail@mail.ru'}
        currentValue={email}
        onInputChange={onInputChange}
      />
      <Input
        {...register('password')}
        inputType={'password'}
        inputName={'password'}
        labelText={'Пароль'}
        placeholderText={'*************'}
        currentValue={password}
        onInputChange={onInputChange}
      />
      <RestorePassword>
        Забыли пароль?
      </RestorePassword>
      <Button
        buttonType={'submit'}
        buttonText={'Войти'}
        isButtonDisabled={!email || !password}
      />
      <FormTypeChange>
        Новый пользователь? <FormTypeChangeBtn to="/registration">Регистрация</FormTypeChangeBtn>
      </FormTypeChange>
    </AuthForm>
      // validate={() => {
      //   const errors = {};
      //
      //   !email && (errors.email = 'Введите e-mail');
      //   !email.includes('@') && (errors.email = 'Введите корректный e-mail');
      //   !password && (errors.password = 'Введите пароль');
      //   password.length < 3 && (errors.password = 'Пароль должен быть не менее 3-х символов');
      //
      //   return errors
      // }}
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