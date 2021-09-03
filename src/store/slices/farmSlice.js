import { createSlice } from '@reduxjs/toolkit';
import { clearSuccessFlag } from '../actions/farmActions';

const initialState = {
  farms: [],
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
