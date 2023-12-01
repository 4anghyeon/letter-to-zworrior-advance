import axios from 'axios';
import Swal from 'sweetalert2';

export const ERROR_CONFLICT = 409;

export const letterApi = axios.create({
  baseURL: process.env.REACT_APP_SEVER_URL,
});

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_SERVER,
});

authApi.interceptors.response.use(
  // 오류 응답을 내보내기 전 수행되는 함수
  response => {
    return response;
  },
  error => {
    const {response} = error;
    if (response) {
      if (response.status === ERROR_CONFLICT) {
        Swal.fire({
          icon: 'error',
          title: '회원가입에 실패하였습니다.',
          text: response.data.message,
        });
      }
    }

    return Promise.reject(error);
  },
);
