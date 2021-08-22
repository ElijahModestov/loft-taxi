import React from 'react';
import styled from 'styled-components';

import Input from '../Input';
import Button from '../Button';

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

const UserLoginForm = ({ currentEmail, currentPassword, onPageChange,
                         onInputChange, isButtonDisabled, handleSubmit }) => {
  return (
    <AuthForm onSubmit={handleSubmit}>
      <Input inputType={'email'}
             inputName={'email'}
             labelText={'Email'}
             placeholderText={'mail@mail.ru'}
             onInputChange={onInputChange}
             currentValue={currentEmail} />
      <Input inputType={'password'}
             inputName={'password'}
             labelText={'Пароль'}
             placeholderText={'*************'}
             onInputChange={onInputChange}
             currentValue={currentPassword} />
      <RestorePassword>
        Забыли пароль?
      </RestorePassword>
      <Button buttonType={'button'}
              buttonText={'Войти'}
              onPageChange={onPageChange}
              isButtonDisabled={isButtonDisabled}/>
      <FormTypeChange>
        Новый пользователь? <FormTypeChangeBtn onClick={() => {onPageChange(2)}}>Регистрация</FormTypeChangeBtn>
      </FormTypeChange>
    </AuthForm>
  );
};

export default UserLoginForm;