import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SEVER_URL,
  timeoutErrorMessage: '시간 초과',
});
