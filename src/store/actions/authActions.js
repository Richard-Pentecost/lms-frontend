import axios from 'axios';
import { setToken, getTokenPayload, removeToken } from '../../utils/token-manager';
import { authActions } from '../slices/authSlice';

const URL = 'http://localhost:3000';

export const loginUser = credentials => {
  return async dispatch => {
    if (!credentials.email || !credentials.password) {
      dispatch(authActions.loginUserFail('Email and password required'))
    } else {
      try {
        dispatch(authActions.loginUserStart());
        const response = await axios.post(`${URL}/login`, credentials);
        setToken(response.data.token);
        const token = getTokenPayload();
        dispatch(authActions.loginUserSuccess(token));
      } catch (error) {
        console.log(error);
        dispatch(authActions.loginUserFail('Error'))
      }
    }
  }
};

export const logoutUser = () => {
  return dispatch => { 
    removeToken();
    dispatch(authActions.logoutUser());
  }
}