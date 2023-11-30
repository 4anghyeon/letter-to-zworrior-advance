import React from 'react';
import * as S from './styles/Header.styled';
import {Link} from 'react-router-dom';

const Header = () => {
  const logoImage = require('assets/img/logo.png');

  return (
    <S.HeaderContainer>
      <Link to={'/'}>
        <img src={logoImage} alt={'logo image'} />
      </Link>
    </S.HeaderContainer>
  );
};

export default Header;
