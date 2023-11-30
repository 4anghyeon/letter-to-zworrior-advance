import React from 'react';
import * as S from './styles/CharacterCard.styled';
import {Link} from 'react-router-dom';

const CharacterCard = ({character}) => {
  const {id, name, enName} = character;
  const image = require(`assets/img/${enName.replace(/\s/g, '')}.png`);

  return (
    <S.Card name={name}>
      <Link to={`/detail/${id}`}>
        <S.Img $img={image}></S.Img>
      </Link>
    </S.Card>
  );
};

export default CharacterCard;
