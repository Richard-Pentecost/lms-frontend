import decode from 'jwt-decode';
import moment from 'moment';

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
  return Boolean(token && ((!token.exp) || (moment().unix() < token.exp)));
};

export const removeToken = () => {
  window.localStorage.removeItem('apiToken');
};


