import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { register } from '../../actions';
import { compose } from '../HocUtils/compose';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

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

const FormTypeChangeBtn = styled(Link)`
  color: #FDBF5A;
  cursor: pointer;
  text-decoration: none;

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
    const { register } = this.props;
    const { email, password, name } = this.state;
    const onSubmitForm = (e) => {
      e.preventDefault();

      const firstName = name.replace(/ [\s\S]+/, '');
      const lastName = name.replace(/[^ ]+ /, '');

      register(email, password, firstName, lastName);
      this.props.history.push('/');
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
          Новый пользователь? <FormTypeChangeBtn to="/login">Войти</FormTypeChangeBtn>
        </FormTypeChange>
      </AuthForm>
    );
  }
}

UserRegistrationForm.propTypes = {
  register: PropTypes.func.isRequired
};

export const UserRegistrationFormWithAuth = compose(
  withRouter,
  connect(
    null,
    { register }
  )
)(UserRegistrationForm);