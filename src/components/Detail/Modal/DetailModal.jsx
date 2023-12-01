import React, {useEffect, useState} from 'react';
import Modal from '../../Common/Modal';
import LetterModalContent from '../../Common/LetterModalContent';
import {AlertOption, TIME_FORMAT, validation} from '../../../shared/common';
import {useSelector} from 'react-redux';
import {usePopup} from '../../../hooks/usePopup';
import {createPortal} from 'react-dom';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import * as S from './styles/DetailModal.styled';
import {useCheckToken} from '../../../hooks/useCheckToken';
import {WriterImg} from './styles/DetailModal.styled';
import defaultAvatar from 'assets/img/dragonball.png';
import {useMutation, useQueryClient} from 'react-query';
import {removeLetterById, updateLetterById} from '../../../api/letters';
import {useModal} from '../../../hooks/useModal';

const DetailModal = ({selectedLetter}) => {
  const {userId} = useSelector(state => state.auth);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState('');
  const checkToken = useCheckToken();
  const {hideModal} = useModal();

  const popup = usePopup();
  const queryClient = useQueryClient();

  const mutationRemove = useMutation(removeLetterById, {
    onSuccess: () => {
      queryClient.invalidateQueries('lettersByName');
      console.log('성공 하였습니다.');
    },
  });

  const mutationUpdate = useMutation(updateLetterById, {
    onSuccess: () => {
      queryClient.invalidateQueries('lettersByName');
      console.log('성공 하였습니다.');
    },
  });

  // 삭제 버튼을 누를 경우 동작하는 이벤트
  const handleClickDelete = async () => {
    const isTokenAvailable = await checkToken();
    if (!isTokenAvailable) return;
    Swal.fire({
      title: '삭제 하시겠습니까?',
      text: '삭제하면 복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(result => {
      if (result.isConfirmed) {
        mutationRemove.mutate(selectedLetter.id);
        popup('삭제 되었습니다.', {}, AlertOption.SUCCESS, 800, null);
        hideModal();
      }
    });
  };

  // 수정 버튼 누를 경우 동작하는 이벤트
  const handleClickEdit = () => {
    setIsEdit(true);
  };

  // 수정 완료 버튼 누를 경우 동작하는 이벤트
  const handleClickComplete = async () => {
    const isTokenAvailable = await checkToken();
    if (!isTokenAvailable) return;
    const $textarea = document.getElementById('content');

    if (!validation($textarea.value, selectedLetter.from, popup)) return;

    if (content === $textarea.value) {
      popup('수정 사항이 없습니다.', {}, AlertOption.WARN, 800, () => {
        setIsEdit(false);
      });
      return;
    }

    mutationUpdate.mutate({id: selectedLetter.id, content: $textarea.value});
    setIsEdit(false);
    setContent($textarea.value);
  };

  useEffect(() => {
    setContent(selectedLetter.content);
    return () => {
      setIsEdit(false);
    };
  }, [selectedLetter]);

  return createPortal(
    <Modal>
      <LetterModalContent content={content} isEdit={isEdit}></LetterModalContent>
      <S.LetterModalFooter>
        <div>
          {selectedLetter.userId === userId && (
            <>
              {!isEdit ? (
                <S.ModalButton onClick={handleClickEdit} $background={'#69db7c'}>
                  수정
                </S.ModalButton>
              ) : (
                <S.ModalButton onClick={handleClickComplete} $background={'#228be6'}>
                  완료
                </S.ModalButton>
              )}
              {!isEdit && (
                <S.ModalButton onClick={handleClickDelete} $background={'#f03e3e'}>
                  삭제
                </S.ModalButton>
              )}
            </>
          )}
        </div>

        <div>
          <div>
            <span>{moment(selectedLetter.date).format(TIME_FORMAT)}</span>
          </div>
          <S.WriteInfoWrapper>
            <WriterImg $img={selectedLetter.avatar === null ? defaultAvatar : selectedLetter.avatar} />
            <span>From. {selectedLetter.from}</span>
          </S.WriteInfoWrapper>
        </div>
      </S.LetterModalFooter>
    </Modal>,
    document.getElementById('modal'),
  );
};

export default DetailModal;
