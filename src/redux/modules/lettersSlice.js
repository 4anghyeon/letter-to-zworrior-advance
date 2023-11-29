import {initLetters} from '../../shared/data';
import {createSlice} from '@reduxjs/toolkit';

const data = localStorage.getItem('letters');
const initialState = JSON.parse(data) || initLetters;

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    addLetter: (state, action) => {
      state.push({name: action.payload.name, from: action.payload.from, content: action.payload.content});
      localStorage.setItem('letters', JSON.stringify(state));
      return state;
    },
    removeLetter: (state, action) => {
      const findIndex = action.payload && state.findIndex(v => v.id === action.payload);
      state.splice(findIndex, 1);
      localStorage.setItem('letters', JSON.stringify(state));
      return state;
    },
    updateLetter: (state, action) => {
      const findIndex = action.payload && state.findIndex(v => v.id === action.payload.id);
      state.splice(findIndex, 1, {...state[findIndex], ...{content: action.payload.content}});
      localStorage.setItem('letters', JSON.stringify(state));
      return state;
    },
  },
});

export const {addLetter, removeLetter, updateLetter} = lettersSlice.actions;
export default lettersSlice.reducer;
