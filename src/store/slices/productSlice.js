import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: null,
  loading: false,
  errorMessage: '',
  addProductSuccess: false,
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
    addProductStart(state) {
      state.errorMessage = '';
      state.addProductSuccess = false;
      state.showButtonSpinner = true;
    },
    addProductSuccess(state) {
      state.addProductSuccess = true;
      state.showButtonSpinner = false;
    },
    addProductFail(state, action) {
      state.errorMessage = action.payload;
      state.addProductSuccess = false;
      state.showButtonSpinner = false;
    },
    clearErrors(state) {
      state.loading = false;
      state.errorMessage = '';
      state.showButtonSpinner = false;
    },
    clearSuccessFlag(state) {
      state.addProductSuccess = false;
    }
  }
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
