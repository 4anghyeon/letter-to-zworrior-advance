import React from 'react';
import * as S from './styles/LetterRow.styled';
import {TIME_FORMAT} from '../../../shared/common';
import {useDispatch} from 'react-redux';
import {showModal} from '../../../redux/modules/modalSlice';
import moment from 'moment';
import envelopeCloseImg from 'assets/img/envelope-close.png';

const LetterRow = ({letter, setSelectedLetter}) => {
  let {content} = letter;
  const dispatch = useDispatch();

  // 편지 Row를 클릭할 경우
  // 모달 창 OPEN, EventBinding
  const handleClickLetter = () => {
    setSelectedLetter(letter);
    dispatch(
      showModal({
        content,
        styleOption: {
          background: '#fff9db',
        },
        visible: true,
      }),
    );
  };

  return (
    <S.LetterContainer onClick={handleClickLetter}>
      <S.ProfileImg src={envelopeCloseImg} />
      <div>
        <S.LetterContent>{content}</S.LetterContent>
        <span>{moment(letter.date).format(TIME_FORMAT)}</span>
        <span>From. {letter.from}</span>
      </div>
    </S.LetterContainer>
  );
};

export default LetterRow;
