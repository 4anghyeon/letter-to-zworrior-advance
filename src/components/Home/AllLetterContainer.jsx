import React, {useEffect, useState} from 'react';
import * as S from './styles/AllLetterContainer.styled';
import LetterRow from '../Detail/Letter/LetterRow';
import {useSelector} from 'react-redux';
import DetailModal from '../Detail/Modal/DetailModal';
import {useCheckToken} from '../../hooks/useCheckToken';
import {useQuery} from 'react-query';
import {findAllLetters} from '../../api/letters';

const AllLetterContainer = () => {
  const {data: letters} = useQuery('letters', findAllLetters);
  const [selectedLetter, setSelectedLetter] = useState({content: ''});
  const {key} = useSelector(state => state.modal);

  const checkToken = useCheckToken();

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <S.AllLetterSection>
      <S.LetterContainer>
        {letters?.map(letter => (
          <LetterRow key={letter.id} letter={letter} setSelectedLetter={setSelectedLetter} />
        ))}
      </S.LetterContainer>
      {key === 'letter' && <DetailModal selectedLetter={selectedLetter} />}
    </S.AllLetterSection>
  );
};

export default AllLetterContainer;
