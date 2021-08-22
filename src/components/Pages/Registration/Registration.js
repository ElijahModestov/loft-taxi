import React from 'react';

import UserAuthLayout from '../../UserAuthLayout';
import UserRegistrationForm from '../../UserRegistrationForm';

const RegistrationPage = ({ onPageChange, onInputChange, onRegSubmit,
                            email, name, password }) => {
  return (
    <UserAuthLayout>
      <UserRegistrationForm currentEmail={email}
                            currentName={name}
                            currentPassword={password}
                            onPageChange={onPageChange}
                            onInputChange={onInputChange}
                            isButtonDisabled={!email || !name || !password}
                            handleSubmit={onRegSubmit}/>
    </UserAuthLayout>
  );
};

export default RegistrationPage;