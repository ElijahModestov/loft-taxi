import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../input';
import Button from '../button';

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

const FormTypeChangeBtn = styled.span`
  color: #FDBF5A;
  cursor: pointer;

  &:hover {
    color: #FFA842;
  }
`;

export default class UserAuthForm extends Component {
  state = {
    email: '',
    name: '',
    password: ''
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    const { regView, onPageChange } = this.props;

    return (
      <AuthForm>
        <Input inputType={'email'}
               labelText={regView ? 'Email*' : 'Email'}
               placeholderText={'mail@mail.ru'}
               onInputChange={this.onEmailChange}/>
        {regView &&
          <Input inputType={'text'}
                 labelText={'Как вас зовут?*'}
                 placeholderText={'Петр Александрович'}
                 onInputChange={this.onNameChange}/>
        }
        <Input inputType={'password'}
               labelText={regView ? 'Придумайте пароль*' : 'Пароль'}
               placeholderText={'*************'}
               onInputChange={this.onPasswordChange}/>
        {!regView &&
          <RestorePassword>
            Забыли пароль?
          </RestorePassword>
        }
        <Button buttonText={regView ? 'Зарегистрироваться' : 'Войти'}
                onPageChange={onPageChange}
                isButtonDisabled={regView ?
                  (!this.state.email || !this.state.name || !this.state.password) :
                  (!this.state.email || !this.state.password)}/>
        <FormTypeChange>
          Новый пользователь? <FormTypeChangeBtn onClick={() => {onPageChange(regView ? 1 : 2)}}>{regView ? 'Регистрация' : 'Войти'}</FormTypeChangeBtn>
        </FormTypeChange>
      </AuthForm>
    );
  }
}