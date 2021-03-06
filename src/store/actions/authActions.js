import axios from 'axios';
import { setToken, getToken, getTokenPayload, removeToken } from '../../utils/token-manager';
import { authActions } from '../slices/authSlice';
import { API_URL } from '../../utils/get-api-url';

export const loginUser = credentials => {
  return async dispatch => {
    if (!credentials.email || !credentials.password) {
      dispatch(authActions.loginUserFail('Email and password required'))
    } else {
      try {
        dispatch(authActions.loginUserStart());
        const response = await axios.post(`${API_URL}/login`, credentials);
        setToken(response.data.token);
        const token = getTokenPayload();
        dispatch(authActions.loginUserSuccess({ token, user: response.data.user }));
      } catch (error) {
        console.error(error);
        dispatch(authActions.loginUserFail('Error'))
      };
    };
  };
};

export const fetchLoggedInUser = uuid => {
  return async dispatch => {
    try {
      dispatch(authActions.fetchLoggedInUserStart());
      const headers = { Authorization: getToken() };
      const { data } = await axios.get(`${API_URL}/users/${uuid}`, { headers });
      dispatch(authActions.fetchLoggedInUserSuccess(data.user));
    } catch (error) {
      console.error(error);
      dispatch(authActions.fetchLoggedInUserFail('There was an error getting the logged in user'));
    }
  }
};

export const logoutUser = () => {
  return dispatch => { 
    dispatch(authActions.logoutUser());
    removeToken();
  }
}