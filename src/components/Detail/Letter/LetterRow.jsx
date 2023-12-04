import React from 'react';
import * as S from './styles/LetterRow.styled';
import {TIME_FORMAT} from '../../../shared/common';
import moment from 'moment';
import envelopeCloseImg from 'assets/img/envelope-close.png';
import {useCheckToken} from '../../../hooks/useCheckToken';
import {useModal} from '../../../hooks/useModal';

const LetterRow = ({letter, setSelectedLetter}) => {
  let {content} = letter;
  const checkToken = useCheckToken();
  const {showModal} = useModal();

  // 편지 Row를 클릭할 경우
  // 모달 창 OPEN, EventBinding
  const handleClickLetter = async () => {
    const isTokenAvailable = await checkToken();
    if (isTokenAvailable) {
      setSelectedLetter(letter);
      showModal({
        key: 'letter',
        styleOption: {
          background: '#fff9db',
        },
        visible: true,
      });
    }
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

export default React.memo(LetterRow);
