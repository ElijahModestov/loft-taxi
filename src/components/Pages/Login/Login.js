import React from 'react';
import PropTypes from 'prop-types';

import UserAuthLayout from '../../UserAuthLayout';
import UserLoginFormWithAuth from '../../UserLoginForm';

const LoginPage = ({ onPageChange }) => {
  return (
    <UserAuthLayout>
      <UserLoginFormWithAuth onPageChange={onPageChange} />
    </UserAuthLayout>
  );
};

LoginPage.propTypes = {
  onPageChange: PropTypes.func.isRequired,
};

export default LoginPage;