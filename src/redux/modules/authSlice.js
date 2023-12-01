import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState = {
  isLogin: !!localStorage.getItem('accessToken'),
  userId: localStorage.getItem('letter-app-userId'),
  nickname: localStorage.getItem('letter-app-nickname'),
  avatar: localStorage.getItem('letter-app-avatar'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      state.isLogin = action.payload.isLogin;
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.avatar = action.payload.avatar;

      localStorage.setItem('letter-app-userId', action.payload.userId);
      localStorage.setItem('letter-app-nickname', action.payload.nickname);
      localStorage.setItem('letter-app-avatar', action.payload.avatar);

      toast.success('로그인 성공!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
    logout: state => {
      localStorage.removeItem('accessToken');
      state.isLogin = false;
      state.nickname = '';
      state.avatar = null;
      state.userId = '';
      localStorage.removeItem('letter-app-userId');
      localStorage.removeItem('letter-app-nickname');
      localStorage.removeItem('letter-app-avatar');

      toast.error('로그아웃 하였습니다.', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
    updateProfile: (state, action) => {
      if (action.payload.nickname) {
        localStorage.setItem('letter-app-nickname', action.payload.nickname);
        state.nickname = action.payload.nickname;
      }
      if (action.payload.avatar) {
        localStorage.setItem('letter-app-avatar', action.payload.avatar);
        state.avatar = action.payload.avatar;
      }
    },
  },
});

export const {login, logout, updateProfile} = authSlice.actions;
export default authSlice.reducer;
