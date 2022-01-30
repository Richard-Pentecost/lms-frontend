import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  errorMessage: '',
  addUserSuccess: false,
  showButtonSpinner: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserByUuidStart(state) {
      state.loading = true;
      state.errorMessage = ''
    },
    fetchUserByUuidSuccess(state, action) {
      state.selectedUser = action.payload;
      state.loading = false;
    },
    fetchUserByUuidFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    fetchUsersStart(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    fetchUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    addUserStart(state) {
      state.errorMessage = '';
      state.addUserSuccess = false;
      state.showButtonSpinner = true;
    },
    addUserSuccess(state) {
      state.addUserSuccess = true;
      state.showButtonSpinner = false;
    },
    addUserFail(state, action) {
      state.errorMessage = action.payload
      state.addUserSuccess = false;
      state.showButtonSpinner = false;
    },
    clearErrors(state) {
      state.loading = false;
      state.errorMessage = '';
      state.showButtonSpinner = false;
    },
    clearSuccessFlag(state) {
      state.addUserSuccess = false;
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
