import customAlert from '../modules/alertSlice';
import letters from '../modules/lettersSlice';
import modal from '../modules/modalSlice';
import {configureStore} from '@reduxjs/toolkit';
import auth from '../modules/authSlice';

const store = configureStore({
  reducer: {letters, modal, customAlert, auth},
});

export default store;
