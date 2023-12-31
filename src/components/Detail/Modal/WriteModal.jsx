import React, {useRef} from 'react';
import Modal from '../../Common/Modal';
import LetterModalContent from '../../Common/LetterModalContent';
import {AlertOption, MAX_FROM_NAME_LENGTH, validation} from '../../../shared/common';
import * as S from './styles/WriteModal.styled';
import {usePopup} from '../../../hooks/usePopup';
import {useSelector} from 'react-redux';
import {useCheckToken} from '../../../hooks/useCheckToken';
import {useMutation, useQueryClient} from 'react-query';
import {addLetter} from '../../../api/letters';
import {useModal} from '../../../hooks/useModal';

const WriteModal = ({name}) => {
  const {nickname, userId, avatar} = useSelector(state => state.auth);
  const fromNameRef = useRef(null); // 쓰는 사람 이름

  const queryClient = useQueryClient();
  const mutation = useMutation(addLetter, {
    onSuccess: () => {
      queryClient.invalidateQueries('lettersByName');
    },
  });

  const popup = usePopup();
  const {hideModal} = useModal();
  const checkToken = useCheckToken();

  // 등록 버튼 이벤트
  const onClickEnrollButton = async () => {
    const isTokenAvailable = await checkToken();
    if (!isTokenAvailable) return;
    const $content = document.getElementById('content');
    const contentValue = $content.value;

    if (!validation(contentValue, fromNameRef.current.value, popup)) return;

    mutation.mutate({name, content: contentValue, from: nickname, userId: userId, avatar: avatar});
    hideModal();

    popup('등록 되었습니다.', {}, AlertOption.SUCCESS, 800, null);
  };

  return (
    <Modal>
      <LetterModalContent content="" isEdit={true}></LetterModalContent>
      <S.ModalButtonContainer>
        <S.ModalEnrollButton onClick={onClickEnrollButton}>등록</S.ModalEnrollButton>
        <div>
          <label htmlFor="fromName">From.</label>
          <input
            id="fromName"
            ref={fromNameRef}
            value={nickname}
            disabled={true}
            placeholder={`최대 ${MAX_FROM_NAME_LENGTH}자 까지 가능 합니다.`}
          />
        </div>
      </S.ModalButtonContainer>
    </Modal>
  );
};

export default WriteModal;
