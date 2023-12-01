import React from 'react';
import * as S from './styles/Modal.styled';
import {useSelector} from 'react-redux';
import {useModal} from '../../hooks/useModal';

const Modal = ({children}) => {
  const modalOption = useSelector(state => state.modal);
  const {hideModal} = useModal();

  const handleClickHide = () => {
    hideModal();
  };

  return (
    modalOption.visible && (
      <>
        <S.ModalContainer $show={modalOption.visible} style={modalOption.styleOption}>
          <S.ModalHeader>
            <button onClick={handleClickHide}>X</button>
          </S.ModalHeader>
          {children}
        </S.ModalContainer>
        <S.ModalShadow onClick={handleClickHide} $show={modalOption.visible}></S.ModalShadow>
      </>
    )
  );
};

export default Modal;
