import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  regions: null,
  loading: false,
  errorMessage: '',
  addRegionSuccess: false,
  showButtonSpinner: false,
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    fetchRegionsStart(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    fetchRegionsSuccess(state, action) {
      state.regions = action.payload;
      state.loading = false;
    },
    fetchRegionsFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    addRegionStart(state) {
      state.errorMessage = '';
      state.addRegionSuccess = false;
      state.showButtonSpinner = true;
    },
    addRegionSuccess(state) {
      state.addRegionSuccess = true;
      state.showButtonSpinner = false;
    },
    addRegionFail(state, action) {
      state.errorMessage = action.payload;
      state.addRegionSuccess = false;
      state.showButtonSpinner = false;
    },
    clearErrors(state) {
      state.loading = false;
      state.errorMessage = '';
      state.showButtonSpinner = false;
    },
    clearSuccessFlag(state) {
      state.addRegionSuccess = false;
    }
  }
});

export const regionActions = regionSlice.actions;

export default regionSlice.reducer;
