import React from 'react';
import PropTypes from 'prop-types';

import UserAuthLayout from '../../UserAuthLayout';
import UserRegistrationFormWithAuth from '../../UserRegistrationForm';

const RegistrationPage = ({ onPageChange }) => {
  return (
    <UserAuthLayout>
      <UserRegistrationFormWithAuth onPageChange={onPageChange} />
    </UserAuthLayout>
  );
};

RegistrationPage.propTypes = {
  onPageChange: PropTypes.func.isRequired
};

export default RegistrationPage;