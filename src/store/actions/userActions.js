import axios from 'axios';
import { userActions } from '../slices/userSlice';
import { getToken } from '../../utils/token-manager';

const URL = 'http://localhost:3000';

export const createUser = user => {
  const { name, email, password, confirmPassword } = user;

  return async dispatch => {
    if (name && email && password && password === confirmPassword) {
      try {
        dispatch(userActions.addUserStart());
        const { confirmPassword, ...userData} = user;
        const headers = { Authorization: getToken() };
        await axios.post(`${URL}/users`, { user: userData }, { headers });
        dispatch(userActions.addUserSuccess());
        dispatch(fetchUsers());
      } catch (error) { 
        console.error(error);
        dispatch(userActions.addUserFail(error.response.data.error));
      }
    } else {
      if (!name || !email || !password || !confirmPassword) {
        dispatch(userActions.addUserFail('All fields must be filled out'));
      } else {
        dispatch(userActions.addUserFail('The password must match'));
      }
    };
  };
};

export const fetchUserByUuid = uuid => {
  return async dispatch => {
    try {
      dispatch(userActions.fetchUserByUuidStart());
      const headers = { Authorization: getToken() };
      const { data } = await axios.get(`${URL}/users/${uuid}`, { headers });
      dispatch(userActions.fetchUserByUuidSuccess(data.user));
    } catch (error) {
      console.error(error);
      dispatch(userActions.fetchUserByUuidFail('There was an error getting the user'));
    };
  };
};

export const fetchUsers = () => {
  return async dispatch => {
    try {
      dispatch(userActions.fetchUsersStart());
      const headers = { Authorization: getToken() };
      const { data: users } = await axios.get(`${URL}/users`, { headers });
      dispatch(userActions.fetchUsersSuccess(users));
    } catch (error) {
      console.error(error);
      dispatch(userActions.fetchUsersFail('There was an error fetching users'));
    };
  };
};

export const editUser = (user, uuid) => {
  return async dispatch => {
    try {
      dispatch(userActions.addUserStart());
      const headers = { Authorization: getToken() };
      await axios.patch(`${URL}/users/${uuid}`, { user }, { headers });
      dispatch(userActions.addUserSuccess());
      dispatch(fetchUserByUuid(uuid));
    } catch (error) {
      console.error(error);
      dispatch(userActions.addUserFail('Error adding a user'));
    };
  };
};

export const updatePassword = (data, uuid) => {
  const { oldPassword, password, confirmPassword } = data; 
  return async dispatch => {
    if (oldPassword && password && password === confirmPassword) {
      try {
        dispatch(userActions.addUserStart());
        const passwordData = {
          existingPassword: oldPassword,
          newPassword: password, 
        };
        const headers = { Authorization: getToken() };
        await axios.patch(`${URL}/users/${uuid}/security`, passwordData, { headers });
        dispatch(userActions.addUserSuccess());
      } catch (error) {
        console.error(error);
        dispatch(userActions.addUserFail(error.response.data.error));
      }
    } else {
      if(!password || !oldPassword) {
        dispatch(userActions.addUserFail('All fields must be filled out'));
      } else {
        dispatch(userActions.addUserFail('New password and confirm password must match'));
      }
    };
  };
};

export const deleteUser = uuid => {
  return async dispatch => {
    try {
      const headers = { Authorization: getToken() };
      await axios.delete(`${URL}/users/${uuid}`, { headers });
      dispatch(fetchUsers());
    } catch (error) {
      console.error(error);
    }
  }
}

export const clearErrors = () => {
  return dispatch => {
    dispatch(userActions.clearErrors());
  };
};

export const clearSuccessFlag = () => {
  return dispatch => {
    dispatch(userActions.clearSuccessFlag());
  };
};
