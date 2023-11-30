import React from 'react';
import * as S from './styles/Modal.styled';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal} from '../../redux/modules/modalSlice';

const Modal = ({children}) => {
  const modalOption = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const handleClickHide = () => {
    dispatch(hideModal());
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
