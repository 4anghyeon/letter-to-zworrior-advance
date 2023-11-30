import React from 'react';
import styled from 'styled-components';
import {convertDateToDateTimeString} from '../../shared/common';
import {useDispatch} from 'react-redux';
import {showModal} from '../../redux/modules/modalSlice';
import moment from 'moment';

const LetterRow = ({letter, setSelectedLetter}) => {
  let {content} = letter;

  const dispatch = useDispatch();
  const envelopeCloseImg = require('assets/img/envelope-close.png');

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
    <LetterContainer onClick={handleClickLetter}>
      <ProfileImg src={envelopeCloseImg} />
      <div>
        <LetterContent>{content}</LetterContent>
        <span>{moment(letter.date).format('YYYY-MM-DD HH:mm:ss')}</span>
        <span>From. {letter.from}</span>
      </div>
    </LetterContainer>
  );
};

const LetterContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  & span {
    font-style: italic;
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 80%;
    color: white;
    font-weight: bold;
    overflow: hidden;
  }
  & div span {
    text-align: end;
    margin-right: 50px;
  }
  border: 1px solid white;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
`;

const ProfileImg = styled.img`
  height: 100px;
  margin-right: 4vw;
`;

const LetterContent = styled.article`
  margin-bottom: 10px;
  padding: 10px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;

export default LetterRow;
