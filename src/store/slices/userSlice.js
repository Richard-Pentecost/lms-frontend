import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserById(state, action) {
      state.currentUser = action.payload;
    },
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
