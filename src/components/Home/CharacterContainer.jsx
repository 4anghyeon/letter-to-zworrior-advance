import React from 'react';
import * as S from './styles/CharacterContainer.styled';
import {warriors} from '../../shared/data';
import CharacterCard from './CharacterCard';

const CharacterContainer = () => {
  return (
    <S.Container>
      {warriors.map(warrior => (
        <CharacterCard key={warrior.name} character={warrior} />
      ))}
    </S.Container>
  );
};

export default CharacterContainer;
