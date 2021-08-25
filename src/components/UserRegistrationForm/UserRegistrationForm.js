import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

import { withAuth } from '../AuthContext/AuthContext';

const AuthForm = styled.form`
  padding: 72px 112px;
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

const FormTypeChangeBtn = styled.span`
  color: #FDBF5A;
  cursor: pointer;

  &:hover {
    color: #FFA842;
  }
`;

class UserRegistrationForm extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  }

  onInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { onPageChange, login } = this.props;
    const { email, password, name } = this.state;
    const onSubmitForm = (e) => {
      e.preventDefault();
      login(email, password, name);
      onPageChange(3);
    };

    return (
      <AuthForm onSubmit={onSubmitForm}>
        <Input inputType={'email'}
               inputName={'email'}
               labelText={'Email*'}
               placeholderText={'mail@mail.ru'}
               currentValue={email}
               onInputChange={this.onInputChange} />
        <Input inputType={'text'}
               inputName={'name'}
               labelText={'Как вас зовут?*'}
               placeholderText={'Петр Александрович'}
               currentValue={name}
               onInputChange={this.onInputChange} />
        <Input inputType={'password'}
               inputName={'password'}
               labelText={'Придумайте пароль*'}
               placeholderText={'*************'}
               currentValue={password}
               onInputChange={this.onInputChange} />
        <Button buttonType={'submit'}
                buttonText={'Зарегистрироваться'}
                isButtonDisabled={!email || !name || !password } />
        <FormTypeChange>
          Новый пользователь? <FormTypeChangeBtn onClick={() => {onPageChange(1)}}>Войти</FormTypeChangeBtn>
        </FormTypeChange>
      </AuthForm>
    );
  }
}

UserRegistrationForm.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export const UserRegistrationFormWithAuth = withAuth(UserRegistrationForm);