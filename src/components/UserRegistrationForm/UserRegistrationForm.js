import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import { registerUser } from '../../store/actions/auth';
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

const UserRegistrationForm = ({ isLoggedIn, registerUser, history }) => {
  const [auth, setAuth] = useState({
    email: '',
    password: '',
    name: ''
  });
  const { email, password, name } = auth;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    isLoggedIn && history.push('/');
  }, [isLoggedIn, history])

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setAuth((auth) => ({
      ...auth,
      [name]: value
    }));
  }

  const onSubmitForm = () => {
    const firstName = name.replace(/ [\s\S]+/, '');
    const lastName = name.replace(/[^ ]+ /, '');

    registerUser(email, password, firstName, lastName);
    history.push('/');
  }

  // validate={() => {
  //   const errors = {};
  //
  //   !email && (errors.email = 'Введите e-mail');
  //   !email.includes('@') && (errors.email = 'Введите корректный e-mail');
  //   !name && (errors.name = 'Введите ваше имя');
  //   !password && (errors.password = 'Введите пароль');
  //   password.length < 3 && (errors.password = 'Пароль должен быть не менее 3-х символов');
  //
  //   return errors
  // }}

  return (
    <AuthForm onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        {...register('email')}
        inputType={'email'}
        inputName={'email'}
        labelText={'Email*'}
        placeholderText={'mail@mail.ru'}
        currentValue={email}
        onInputChange={onInputChange}
      />
      <Input
        {...register('name')}
        inputType={'text'}
        inputName={'name'}
        labelText={'Как вас зовут?*'}
        placeholderText={'Петр Александрович'}
        currentValue={name}
        onInputChange={onInputChange}
      />
      <Input
        {...register('password')}
        inputType={'password'}
        inputName={'password'}
        labelText={'Придумайте пароль*'}
        placeholderText={'*************'}
        currentValue={password}
        onInputChange={onInputChange}
      />
      <Button
        buttonType={'submit'}
        buttonText={'Зарегистрироваться'}
        isButtonDisabled={!email || !name || !password }
      />
      <FormTypeChange>
        Новый пользователь? <FormTypeChangeBtn to="/login">Войти</FormTypeChangeBtn>
      </FormTypeChange>
    </AuthForm>
  );
}

UserRegistrationForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired
};

export const UserRegistrationFormWithAuth = compose(
  withRouter,
  connect(
    (state) => ({ isLoggedIn: getIsLoggedIn(state) }),
    { registerUser }
  )
)(UserRegistrationForm);