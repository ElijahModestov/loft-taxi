import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { registerUser } from '../../store/actions/auth';
import { getIsLoggedIn, getAuthError } from '../../store/reducers/auth';
import { compose } from '../HocUtils/compose';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import {Spinner} from "../Spinner/Spinner";

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

const UserRegistrationForm = ({ isLoggedIn, authError, registerUser, history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = yup.object({
    email: yup.string()
      .required('Введите ваш e-mail')
      .email('Введите корректный e-mail'),
    name: yup.string()
      .required('Введите ваше имя и фамилию'),
    password: yup.string()
      .required('Введите ваш пароль')
      .min(3, 'Пароль должен содержать минимум 3 символа')
  });
  const formOptions = {
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {email: '', name: '', password: ''}
  };
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid }
  } = useForm(formOptions);
  const [email, name, password] = getValues(['email', 'name', 'password']);

  useEffect(() => {
    isLoggedIn && history.push('/');
  }, [isLoggedIn, history]);

  useEffect(() => {
    setIsLoading(false);
    authError && setError('email', {type: 'string', message: authError});
  }, [authError, setError, setIsLoading]);

  const onSubmitForm = () => {
    const firstName = name.replace(/ [\s\S]+/, '');
    const lastName = name.replace(/[^ ]+ /, '');

    setIsLoading(true);
    registerUser(email, password, firstName, lastName);
  }

  if (isLoading && !authError) {
    return (
      <Spinner/>
    );
  }

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
            labelText={'Email*'}
            placeholderText={'mail@mail.ru'}
            errorText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            inputType={'text'}
            inputName={'name'}
            labelText={'Как вас зовут?*'}
            placeholderText={'*************'}
            errorText={errors.name?.message}
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
            labelText={'Придумайте пароль'}
            placeholderText={'*************'}
            errorText={errors.password?.message}
          />
        )}
      />
      <Button
        buttonType={'submit'}
        buttonText={'Зарегистрироваться'}
        isButtonDisabled={!isValid}
      />
      <FormTypeChange>
        Новый пользователь? <FormTypeChangeBtn to="/login">Войти</FormTypeChangeBtn>
      </FormTypeChange>
    </AuthForm>
  );
}

UserRegistrationForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  authError: PropTypes.string.isRequired,
  registerUser: PropTypes.func.isRequired
};

export const UserRegistrationFormWithAuth = compose(
  withRouter,
  connect(
    (state) => ({ isLoggedIn: getIsLoggedIn(state), authError: getAuthError(state) }),
    { registerUser }
  )
)(UserRegistrationForm);