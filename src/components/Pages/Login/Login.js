import React from 'react';

import UserAuthLayout from '../../UserAuthLayout';
import UserLoginForm from '../../UserLoginForm';

const LoginPage = ({ onPageChange, onInputChange, onRegSubmit,
                     email, password }) => {
  return (
    <UserAuthLayout>
      <UserLoginForm currentEmail={email}
                     currentPassword={password}
                     onPageChange={onPageChange}
                     onInputChange={onInputChange}
                     isButtonDisabled={!email || !password}
                     handleSubmit={onRegSubmit}/>
    </UserAuthLayout>
  );
};

export default LoginPage;