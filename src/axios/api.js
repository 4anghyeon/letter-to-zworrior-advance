import axios from 'axios';

export const ERROR_CONFLICT = 409;

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SEVER_URL,
});

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_SERVER,
});
