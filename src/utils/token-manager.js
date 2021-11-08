import decode from 'jwt-decode';
import dayjs from 'dayjs';

export const setToken = token => {
  window.localStorage.setItem('apiToken', token);
};

export const getToken = () => window.localStorage.getItem('apiToken');

export const getTokenPayload = () => {
  const token = getToken();
  return token && decode(token);
};

export const isTokenValid = () => {
  const token = getTokenPayload();
  return Boolean(token && ((!token.exp) || (dayjs().unix() < token.exp)));
};

export const removeToken = () => {
  window.localStorage.removeItem('apiToken');
};


