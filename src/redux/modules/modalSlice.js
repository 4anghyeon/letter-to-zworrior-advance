import {ModalOption} from '../../shared/common';
import {createSlice} from '@reduxjs/toolkit';

const initialState = new ModalOption();

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      return {...state, ...action.payload, visible: true};
    },
    hideModal: state => {
      return {...state, visible: false};
    },
  },
});

export const {showModal, hideModal} = modalSlice.actions;
export default modalSlice.reducer;
