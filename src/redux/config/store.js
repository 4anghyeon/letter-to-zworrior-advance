import customAlert from '../modules/alertSlice';
import modal from '../modules/modalSlice';
import {configureStore} from '@reduxjs/toolkit';
import auth from '../modules/authSlice';

const store = configureStore({
  reducer: {modal, customAlert, auth},
});

export default store;
