import React from 'react';
import PropTypes from 'prop-types';

import { UserAuthLayout } from '../../UserAuthLayout/UserAuthLayout';
import { UserRegistrationFormWithAuth } from '../../UserRegistrationForm/UserRegistrationForm';

export const RegistrationPage = ({ onPageChange }) => {
  return (
    <UserAuthLayout>
      <UserRegistrationFormWithAuth onPageChange={onPageChange} />
    </UserAuthLayout>
  );
};

RegistrationPage.propTypes = {
  onPageChange: PropTypes.func.isRequired
};