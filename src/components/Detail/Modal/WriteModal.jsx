import React, {useEffect, useRef} from 'react';
import Modal from '../../Common/Modal';
import LetterModalContent from '../../Common/LetterModalContent';
import {AlertOption, MAX_FROM_NAME_LENGTH, validation} from '../../../shared/common';
import * as S from './styles/WriteModal.styled';
import {__addLetter} from '../../../redux/modules/lettersSlice';
import {hideModal} from '../../../redux/modules/modalSlice';
import {usePopup} from '../../../hooks/usePopup';
import {useDispatch, useSelector} from 'react-redux';

const WriteModal = ({name, setIsWrite}) => {
  const modalOption = useSelector(state => state.modal);
  const fromNameRef = useRef(null); // 쓰는 사람 이름

  const popup = usePopup();
  const dispatch = useDispatch();

  // 등록 버튼 이벤트
  const onClickEnrollButton = () => {
    const $content = document.getElementById('content');
    const contentValue = $content.value;

    if (!validation(contentValue, fromNameRef.current.value, popup)) return;

    dispatch(__addLetter({name, content: contentValue, from: fromNameRef.current.value}));
    dispatch(hideModal());

    popup('등록 되었습니다.', {}, AlertOption.SUCCESS, 800, null);
  };

  useEffect(() => {
    return () => {
      setIsWrite(false);
    };
  }, [modalOption.visible]);

  return (
    <Modal>
      <LetterModalContent content="" isEdit={true}></LetterModalContent>
      <S.ModalButtonContainer>
        <S.ModalEnrollButton onClick={onClickEnrollButton}>등록</S.ModalEnrollButton>
        <div>
          <label htmlFor="fromName">From.</label>
          <input id="fromName" ref={fromNameRef} placeholder={`최대 ${MAX_FROM_NAME_LENGTH}자 까지 가능 합니다.`} />
        </div>
      </S.ModalButtonContainer>
    </Modal>
  );
};

export default WriteModal;
