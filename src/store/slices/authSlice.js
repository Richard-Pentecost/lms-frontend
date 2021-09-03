import { createSlice } from '@reduxjs/toolkit';
import { isTokenValid, getTokenPayload } from '../../utils/token-manager';

const initialState = {
  token: isTokenValid() ? getTokenPayload() : null,
  loading: false,
  errorMessage: '',
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
      state.token = action.payload;
      state.loading = true;
      state.errorMessage = '';
    },
    loginUserFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    logoutUser(state) {
      state.token = null;
      state.loading = false;
      state.errorMessage = '';
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
