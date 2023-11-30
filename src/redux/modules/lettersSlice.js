import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import {instance} from '../../axios/api';

const initialState = {
  letters: [],
  isLoading: true,
  isError: false,
  error: null,
};

export const __findAllLetter = createAsyncThunk('letters/findAll', async (arg, thunkAPI) => {
  try {
    const {data} = await instance.get('/letters');
    return data;
  } catch (error) {
    return error;
  }
});

export const __findAllLetterByName = createAsyncThunk('letters/findAllByName', async arg => {
  const {data} = await instance.get(`/letters?to=${arg}`);
  return data;
});

export const __addLetter = createAsyncThunk('letters/addLetter', async arg => {
  await instance.post('/letters', {
    id: uuidv4(),
    to: arg.name,
    from: arg.from,
    content: arg.content,
    date: moment(),
  });
});

export const __removeLetterById = createAsyncThunk('letters/removeById', async (arg, thunkAPI) => {
  await instance.delete(`/letters/${arg}`);
});

export const __updateLetterById = createAsyncThunk('letters/updateById', async (arg, thunkAPI) => {
  await instance.patch(`/letters/${arg.id}`, {content: arg.content});
});

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(__findAllLetter.pending, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__findAllLetter.fulfilled, (state, action) => {
        state.letters = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__findAllLetter.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__findAllLetterByName.fulfilled, (state, action) => {
        state.letters = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__removeLetterById.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__removeLetterById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__addLetter.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__addLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__updateLetterById.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__updateLetterById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export default lettersSlice.reducer;
