import React, {useEffect, useState} from 'react';
import * as S from './styles/AllLetterContainer.styled';
import LetterRow from '../Detail/Letter/LetterRow';
import {useDispatch, useSelector} from 'react-redux';
import DetailModal from '../Detail/Modal/DetailModal';
import {__findAllLetter} from '../../redux/modules/lettersSlice';
import {useCheckToken} from '../../hooks/useCheckToken';

const AllLetterContainer = () => {
  const {letters, isLoading} = useSelector(state => state.letters);
  const [selectedLetter, setSelectedLetter] = useState({content: ''});
  const dispatch = useDispatch();
  const {key} = useSelector(state => state.modal);

  const checkToken = useCheckToken();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    dispatch(__findAllLetter());
  }, [isLoading]);

  return (
    <S.AllLetterSection>
      <S.LetterContainer>
        {letters.map(letter => (
          <LetterRow key={letter.id} letter={letter} setSelectedLetter={setSelectedLetter} />
        ))}
      </S.LetterContainer>
      {key === 'letter' && <DetailModal selectedLetter={selectedLetter} />}
    </S.AllLetterSection>
  );
};

export default AllLetterContainer;
