import axios from 'axios';
import { userActions } from '../slices/userSlice';

const URL = 'http://localhost:3000';

export const createUser = user => {
  return async dispatch => {
    const response = await axios.post(`${URL}/users`, { user });
    console.log(response);
  }
}

export const fetchUserByUuid = uuid => {
  return async dispatch => {
    try {
      dispatch(userActions.fetchUserByUuidStart());
      const { data } = await axios.get(`${URL}/users/${uuid}`);
      dispatch(userActions.fetchUserByUuidSuccess(data.user));
    } catch (error) {
      console.error(error);
      dispatch(userActions.fetchUserByUuidFail('There was an error getting the user'));
    }
  }
};

export const fetchUsers = () => {
  return async dispatch => {
    try {
      dispatch(userActions.fetchUsersStart());
      const { data: users } = await axios.get(`${URL}/users`);
      dispatch(userActions.fetchUsersSuccess(users));
    } catch (error) {
      console.error(error);
      dispatch(userActions.fetchUsersFail('There was an error fetching users'));
    }
  }
}

export const editUser = (user, uuid) => {
  return async dispatch => {
    try {
      dispatch(userActions.addUserStart());
      await axios.patch(`${URL}/users/${uuid}`, { user });
      dispatch(userActions.addUserSuccess());
    } catch (error) {
      console.error(error);
      dispatch(userActions.addUserFail('Error adding a user'));
    }
  }
}

