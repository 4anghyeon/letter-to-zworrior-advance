import customAlert from '../modules/alertSlice';
import letters from '../modules/lettersSlice';
import modal from '../modules/modalSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {letters, modal, customAlert},
});

export default store;
