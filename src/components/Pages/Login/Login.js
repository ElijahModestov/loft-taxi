import React from 'react';

import { UserAuthLayout } from '../../UserAuthLayout/UserAuthLayout';
import { UserLoginFormWithAuth } from '../../UserLoginForm/UserLoginForm';

export const LoginPage = () => {
  return (
    <UserAuthLayout>
      <UserLoginFormWithAuth />
    </UserAuthLayout>
  );
};