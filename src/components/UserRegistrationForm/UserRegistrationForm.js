import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { register } from '../../store/actions/auth';
import { getIsLoggedIn } from '../../store/reducers/auth';
import { compose } from '../HocUtils/compose';

import { InputAdapter } from '../Input/Input';
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

class UserRegistrationForm extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  }

  componentDidUpdate() {
    this.props.isLoggedIn && this.props.history.push('/');
  }

  onInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  onSubmitForm = () => {
    const { email, password, name } = this.state;
    const firstName = name.replace(/ [\s\S]+/, '');
    const lastName = name.replace(/[^ ]+ /, '');

    this.props.register(email, password, firstName, lastName);
    this.props.history.push('/');
  }

  render() {
    const { email, password, name } = this.state;

    return (
      <Form
        onSubmit={this.onSubmitForm}
        validate={() => {
          const errors = {};

          !email && (errors.email = 'Введите e-mail');
          !email.includes('@') && (errors.email = 'Введите корректный e-mail');
          !name && (errors.name = 'Введите ваше имя');
          !password && (errors.password = 'Введите пароль');
          password.length < 3 && (errors.password = 'Пароль должен быть не менее 3-х символов');

          return errors
        }}
        render={({ handleSubmit }) => (
          <AuthForm onSubmit={handleSubmit}>
            <Field name="email"
                   component={InputAdapter}
                   inputType={'email'}
                   inputName={'email'}
                   labelText={'Email*'}
                   placeholderText={'mail@mail.ru'}
                   currentValue={email}
                   onInputChange={this.onInputChange} />
            <Field name="name"
                   component={InputAdapter}
                   inputType={'text'}
                   inputName={'name'}
                   labelText={'Как вас зовут?*'}
                   placeholderText={'Петр Александрович'}
                   currentValue={name}
                   onInputChange={this.onInputChange} />
            <Field name="password"
                   component={InputAdapter}
                   inputType={'password'}
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
        )}
      />
    );
  }
}

UserRegistrationForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
};

export const UserRegistrationFormWithAuth = compose(
  withRouter,
  connect(
    (state) => ({ isLoggedIn: getIsLoggedIn(state) }),
    { register }
  )
)(UserRegistrationForm);