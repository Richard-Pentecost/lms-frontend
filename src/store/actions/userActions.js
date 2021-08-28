import axios from 'axios';
import { userActions } from '../slices/userSlice';

const URL = 'http://localhost:3000';

export const createUser = user => {
  return async dispatch => {
    const response = await axios.post(`${URL}/users`, { user });
    console.log(response);
  }
}

export const fetchUserById = id => {
  return async dispatch => {
    try {
      const { user } = await axios.get(`${URL}/users/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
}

