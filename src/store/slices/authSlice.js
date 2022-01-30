import { createSlice } from '@reduxjs/toolkit';
import { isTokenValid, getTokenPayload } from '../../utils/token-manager';

const initialState = {
  token: isTokenValid() ? getTokenPayload() : null,
  loading: false,
  errorMessage: '',
  loggedInUser: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserStart(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    loginUserSuccess(state, action) {
      state.token = action.payload.token;
      state.loading = true;
      state.errorMessage = '';
      state.loggedInUser= action.payload.user;
    },
    loginUserFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    logoutUser(state) {
      state.token = null;
      state.loading = false;
      state.errorMessage = '';
      state.loggedInUser = null;
    },
    fetchLoggedInUserStart(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    fetchLoggedInUserSuccess(state, action) {
      state.loading = false;
      state.loggedInUser = action.payload;
    },
    fetchLoggedInUserFaii(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
