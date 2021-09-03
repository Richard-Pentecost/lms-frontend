import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
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
      state.currentUser = action.payload;
      state.loading = false;
    },
    fetchUserByUuidFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    fetchUsersStart(state) {
      state.loading = true;
      state.errorMessage = false;
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
      state.loading = true;
      state.errorMessage = '';
      state.addUserSuccess = false;
      state.showButtonSpinner = true;
    },
    addUserSuccess(state) {
      state.loading = false;
      state.addUserSuccess = true;
      state.showButtonSpinner = false;
    },
    addUserFail(state, action) {
      state.loading = false;
      state.erroMessage = action.payload
      state.addFarmSuccess = false;
      state.showButtonSpinner = false;
    },
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
