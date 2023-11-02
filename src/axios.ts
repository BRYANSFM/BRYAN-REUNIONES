'use client'
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const TOKEN_KEY = "token";

function getToken() {
  return Cookies.get(TOKEN_KEY)
}

axios.interceptors.request.use(
  (request) => {
    const token = getToken();
    if (token) request.headers.Authorization =`Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data } = error.response;
    if (data.statusCode === 401 && data.message === 'Unauthorized') {
      Cookies.remove(TOKEN_KEY);
      Cookies.remove('idUser')
      window.location.href = '/'
    }
    return Promise.reject(error);
  }
);

export default axios;