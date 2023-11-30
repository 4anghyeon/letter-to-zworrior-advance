import React, {useEffect, useState} from 'react';
import Modal from '../Common/Modal';
import LetterModalContent from '../Common/LetterModalContent';
import DetailModalFooter from './DetailModalFooter';
import {removeLetter, updateLetter} from '../../redux/modules/lettersSlice';
import {AlertOption, validation} from '../../shared/common';
import DeletePopup from './DeletePopup';
import {hideAlert} from '../../redux/modules/alertSlice';
import {useDispatch} from 'react-redux';
import {usePopup} from '../../shared/hooks';
import {hideModal} from '../../redux/modules/modalSlice';
import {createPortal} from 'react-dom';
import Swal from 'sweetalert2';

const DetailModal = ({selectedLetter}) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const popup = usePopup();
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(selectedLetter.content);
    return () => {
      setIsEdit(false);
    };
  }, [selectedLetter]);

  // 삭제 버튼을 누를 경우 동작하는 이벤트
  const handleClickDelete = () => {
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
        dispatch(removeLetter(selectedLetter.id));
        popup('삭제 되었습니다.', {}, AlertOption.SUCCESS, 800, null);
        dispatch(hideModal());
      }
    });
  };

  // 수정 버튼 누를 경우 동작하는 이벤트
  const handleClickEdit = () => {
    setIsEdit(true);
  };

  // 완료 버튼 누를 경우 동작하는 이벤트
  const handleClickComplete = () => {
    const $textarea = document.getElementById('content');

    if (!validation($textarea.value, selectedLetter.from, popup)) return;

    if (content === $textarea.value) {
      popup('수정 사항이 없습니다.', {}, AlertOption.WARN, 800, () => {
        setIsEdit(false);
      });

      return;
    }

    dispatch(updateLetter({id: selectedLetter.id, content: $textarea.value}));
    setIsEdit(false);
    setContent($textarea.value);
  };

  return createPortal(
    <Modal>
      <LetterModalContent content={content} isEdit={isEdit}></LetterModalContent>
      <DetailModalFooter
        letter={selectedLetter}
        handleClickDelete={handleClickDelete}
        handleClickEdit={handleClickEdit}
        handleClickComplete={handleClickComplete}
        isEdit={isEdit}
      ></DetailModalFooter>
    </Modal>,
    document.getElementById('modal'),
  );
};

export default DetailModal;
