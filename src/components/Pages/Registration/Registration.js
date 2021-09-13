import React from 'react';

import { UserAuthLayout } from '../../UserAuthLayout/UserAuthLayout';
import { UserRegistrationFormWithAuth } from '../../UserRegistrationForm/UserRegistrationForm';

export const RegistrationPage = () => {
  return (
    <UserAuthLayout>
      <UserRegistrationFormWithAuth />
    </UserAuthLayout>
  );
};