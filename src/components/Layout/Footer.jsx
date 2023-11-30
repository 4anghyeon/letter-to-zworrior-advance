import React from 'react';
import * as S from './styles/Footer.styled';

const Footer = () => {
  const image = require(`assets/img/cloud.png`);
  return (
    <S.FooterContainer>
      <img src={image} alt="cloud" />
    </S.FooterContainer>
  );
};
export default Footer;
