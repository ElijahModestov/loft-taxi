import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authenticate } from '../../store/actions/auth';
import { getIsLoggedIn } from '../../store/reducers/auth';
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

class UserLoginForm extends Component {
  state = {
    email: '',
    password: ''
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

  render() {
    const { authenticate } = this.props;
    const { email, password } = this.state;
    const onSubmitForm = (e) => {
      e.preventDefault();
      authenticate(email, password);
      this.props.history.push('/');
    };

    return (
      <AuthForm onSubmit={onSubmitForm}>
        <Input inputType={'email'}
               inputName={'email'}
               labelText={'Email'}
               placeholderText={'mail@mail.ru'}
               currentValue={email}
               onInputChange={this.onInputChange} />
        <Input inputType={'password'}
               inputName={'password'}
               labelText={'Пароль'}
               placeholderText={'*************'}
               currentValue={password}
               onInputChange={this.onInputChange} />
        <RestorePassword>
          Забыли пароль?
        </RestorePassword>
        <Button buttonType={'submit'}
                buttonText={'Войти'}
                isButtonDisabled={!email || !password}/>
        <FormTypeChange>
          Новый пользователь? <FormTypeChangeBtn to="/registration">Регистрация</FormTypeChangeBtn>
        </FormTypeChange>
      </AuthForm>
    );
  }
}

UserLoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired
};

export const UserLoginFormWithAuth = compose(
  withRouter,
  connect(
    (state) => ({ isLoggedIn: getIsLoggedIn(state) }),
    { authenticate }
  )
)(UserLoginForm);