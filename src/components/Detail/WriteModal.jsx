import React, {useEffect, useRef} from 'react';
import Modal from '../Common/Modal';
import LetterModalContent from '../Common/LetterModalContent';
import {AlertOption, MAX_FROM_NAME_LENGTH, validation} from '../../shared/common';
import styled from 'styled-components';
import {addLetter} from '../../redux/modules/lettersSlice';
import {hideModal} from '../../redux/modules/modalSlice';
import {usePopup} from '../../shared/hooks';
import {useDispatch, useSelector} from 'react-redux';

const WriteModal = ({name, setIsWrite}) => {
  const popup = usePopup();
  const dispatch = useDispatch();
  const fromNameRef = useRef(null); // 쓰는 사람 이름
  const modalOption = useSelector(state => state.modal);

  useEffect(() => {
    return () => {
      setIsWrite(false);
    };
  }, [modalOption.visible]);

  // 등록 버튼 이벤트
  const onClickEnrollButton = () => {
    const $content = document.getElementById('content');
    const contentValue = $content.value;

    if (!validation(contentValue, fromNameRef.current.value, popup)) return;

    dispatch(addLetter({name, content: contentValue, from: fromNameRef.current.value}));
    dispatch(hideModal());

    popup('등록 되었습니다.', {}, AlertOption.SUCCESS, 800, null);
  };

  return (
    <Modal>
      <LetterModalContent content="" isEdit={true}></LetterModalContent>
      <ModalButtonContainer>
        <ModalEnrollButton onClick={onClickEnrollButton}>등록</ModalEnrollButton>
        <div>
          <label htmlFor="fromName">From.</label>
          <input id="fromName" ref={fromNameRef} placeholder={`최대 ${MAX_FROM_NAME_LENGTH}자 까지 가능 합니다.`} />
        </div>
      </ModalButtonContainer>
    </Modal>
  );
};

const ModalButtonContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  font-size: 25px;

  & div {
    display: flex;
    align-items: center;
  }

  & button {
    border-radius: 5px;
  }

  & input {
    border: none;
    height: 30px;
    margin-left: 20px;
    background: transparent;
    border-bottom: 1px solid black;
    font-size: 20px;
  }
`;

const ModalEnrollButton = styled.button`
  font-size: 25px;
  padding: 10px;
  border: none;
  background: #37b24d;
  color: white;
  cursor: pointer;
`;

export default WriteModal;
