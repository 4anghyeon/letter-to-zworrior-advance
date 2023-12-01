import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      return {...state, ...action.payload, visible: true};
    },
    hideAlert: (state, action) => {
      return {...state, ...action.payload, visible: false};
    },
  },
});

export const {showAlert, hideAlert} = alertSlice.actions;
export default alertSlice.reducer;
