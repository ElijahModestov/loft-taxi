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

const UserRegistrationForm = ({ currentEmail, currentName, currentPassword, onPageChange,
                                onInputChange, isButtonDisabled, handleSubmit }) => {
  return (
    <AuthForm onSubmit={handleSubmit}>
      <Input inputType={'email'}
             inputName={'email'}
             labelText={'Email*'}
             placeholderText={'mail@mail.ru'}
             onInputChange={onInputChange}
             currentValue={currentEmail} />
      <Input inputType={'text'}
             inputName={'name'}
             labelText={'Как вас зовут?*'}
             placeholderText={'Петр Александрович'}
             onInputChange={onInputChange}
             currentValue={currentName} />
      <Input inputType={'password'}
             inputName={'password'}
             labelText={'Придумайте пароль*'}
             placeholderText={'*************'}
             onInputChange={onInputChange}
             currentValue={currentPassword} />
      <Button buttonType={'button'}
              buttonText={'Зарегистрироваться'}
              onPageChange={onPageChange}
              isButtonDisabled={isButtonDisabled} />
      <FormTypeChange>
        Новый пользователь? <FormTypeChangeBtn onClick={() => {onPageChange(1)}}>Войти</FormTypeChangeBtn>
      </FormTypeChange>
    </AuthForm>
  );
};

export default UserRegistrationForm;