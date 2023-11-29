import React, {useEffect, useState} from 'react';
import Modal from '../Common/Modal';
import LetterModalContent from '../Common/LetterModalContent';
import DetailModalFooter from './DetailModalFooter';
import {removeLetter, updateLetter} from '../../redux/modules/letters';
import {AlertOption, validation} from '../../shared/common';
import DeletePopup from './DeletePopup';
import {hideAlert} from '../../redux/modules/customAlert';
import {useDispatch} from 'react-redux';
import {usePopup} from '../../shared/hooks';
import {hideModal} from '../../redux/modules/modal';
import {createPortal} from 'react-dom';

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
    const handleClick = () => {
      dispatch(removeLetter(selectedLetter.id));
      popup(<div>삭제 되었습니다.</div>, {}, AlertOption.SUCCESS, 800, null);
      dispatch(hideModal());
    };

    popup(
      <DeletePopup handleClickYes={handleClick} handleClickNo={() => dispatch(hideAlert())} />,
      {},
      AlertOption.DEFAULT,
      Number.POSITIVE_INFINITY,
      null,
    );
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
      popup(<div>수정 사항이 없습니다.</div>, {}, AlertOption.WARN, 800, () => {
        setIsEdit(false);
      });

      return;
    }

    dispatch(updateLetter(selectedLetter.id, $textarea.value));
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
