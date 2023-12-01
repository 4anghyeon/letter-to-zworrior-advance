import {useDispatch} from 'react-redux';
import {hideModal, showModal} from '../redux/modules/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();

  const show = option => {
    dispatch(showModal(option));
  };

  const hide = () => {
    dispatch(hideModal());
  };

  return {showModal: show, hideModal: hide};
};
