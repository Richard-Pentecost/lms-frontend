import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  errorMessage: '',
  addRegionSuccess: false,
  showButtonSpinner: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.errorMessage = '';
    },
    fetchProductsSuccess(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFail(state, action) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  }
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
