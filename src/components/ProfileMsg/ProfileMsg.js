import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileText = styled.div`
  margin: 13px 0 28px;
  font-size: 18px;
  text-align: center;
  color: #7B7B7B;
`;

const LinkButton = styled(Link)`
  margin: 50px auto 0;
  max-width: 353px;
  width: 100%;
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 70px;
  font-size: 24px;
  line-height: 28px;
  background: #FDBF5A;
  color: #000;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #FFA842;
  }
`;

export const ProfileMsg = () => {
  return (
    <>
      <ProfileText>
        Платежные данные обновлены. Теперь вы можете заказывать такси.
      </ProfileText>
      <LinkButton to="/">Перейти на карту</LinkButton>
    </>
  )
};