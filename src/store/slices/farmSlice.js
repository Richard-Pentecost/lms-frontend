import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  farms: [],
  allFarms: [],
  loading: false,
  errorMessage: '',
  addFarmSuccess: false,
};

const farmSlice = createSlice({
  name: 'farm',
  initialState,
  reducers: {
    fetchFarmsStart(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    fetchFarmsSuccess(state, action) {
      state.farms = action.payload;
      state.loading = false;
    },
    fetchFarmsFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload
    },
    fetchAllFarmsStart(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    fetchAllFarmsSuccess(state, action) {
      state.allFarms = action.payload;
      state.loading = false;
    },
    fetchAllFarmsFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    addFarmStart(state) {
      state.loading = true;
      state.error = '';
      state.addFarmSuccess = false;
    },
    addFarmSuccess(state) {
      state.loading = false;
      state.addFarmSuccess = true;
    },
    addFarmFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
      state.addFarmSuccess = false;
    },
    clearErrors(state) {
      state.loading = false;
      state.errorMessage = '';
    },
    clearSuccessFlag(state) {
      state.addFarmSuccess = false;
    }
  }
});

export const farmActions = farmSlice.actions;

export default farmSlice.reducer;
