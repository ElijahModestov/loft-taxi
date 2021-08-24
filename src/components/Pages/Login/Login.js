import React from 'react';
import PropTypes from 'prop-types';

import { UserAuthLayout } from '../../UserAuthLayout/UserAuthLayout';
import { UserLoginFormWithAuth } from '../../UserLoginForm/UserLoginForm';

export const LoginPage = ({ onPageChange }) => {
  return (
    <UserAuthLayout>
      <UserLoginFormWithAuth onPageChange={onPageChange} />
    </UserAuthLayout>
  );
};

LoginPage.propTypes = {
  onPageChange: PropTypes.func.isRequired,
};