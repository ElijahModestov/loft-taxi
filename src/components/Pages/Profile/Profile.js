import React, { useState } from 'react';
import styled from "styled-components";

import bg_map from '../../../assets/bg_map_shadowed.jpg';

import { ProfileDataWithAuth } from '../../ProfileForm/ProfileForm';
import { ProfileMsg } from '../../ProfileMsg/ProfileMsg';

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 102px);
  background: url(${bg_map}) no-repeat center;
  background-size: cover;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  margin: 0 auto;
  padding: 58px 44px 66px;
  width: 888px;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fff;
`;

const FormHeader = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
`;

export const ProfilePage = () => {
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const onProfileSubmit = (e) => {
    e.preventDefault();
    setIsProfileChanged(true);
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormHeader>Профиль</FormHeader>
        {isProfileChanged ?
          <ProfileMsg/> :
          <ProfileDataWithAuth onProfileSubmit={onProfileSubmit}/>
        }
      </FormContainer>
    </PageContainer>
  );
};