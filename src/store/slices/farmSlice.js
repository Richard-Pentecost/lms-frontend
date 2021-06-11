import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  farms: [],
};

const farmSlice = createSlice({
  name: 'farm',
  initialState,
  reducers: {
    fetchFarms(state, action) {
      state.farms = action.payload;
    },
  }
});

export const farmActions = farmSlice.actions;

export default farmSlice.reducer;
