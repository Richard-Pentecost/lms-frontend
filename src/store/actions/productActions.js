import axios from 'axios';
import { productActions } from '../slices/productSlice';

const URL = 'http://localhost:3000';

export const createProduct = product => {
  return async dispatch => {
    try {
      dispatch(productActions.addProductStart());
      await axios.post(`${URL}/products`, { product });
      dispatch(productActions.addProductSuccess());
    } catch (error) {
      console.error(error);
      dispatch(productActions.addProductFail('Error adding product'));
    };
  };
};

export const fetchProducts = () => {
  return async dispatch => {
    try {
      dispatch(productActions.fetchProductsStart());
      const { data: products } = await axios.get(`${URL}/products`);
      dispatch(productActions.fetchProductsSuccess(products));
    } catch (error) {
      console.error(error);
      dispatch(productActions.fetchProductsFail('There was an error fetching products'));
    };
  };
};

export const deleteProduct = uuid => {
  return async dispatch => {
    try {
      await axios.delete(`${URL}/products/${uuid}`);
      dispatch(fetchProducts());
    } catch (error) {
      console.error(error);
    };
  };
};

export const clearErrors = () => {
  return dispatch => {
    dispatch(productActions.clearErrors());
  };
};

export const clearSuccessFlag = () => {
  return dispatch => {
    dispatch(productActions.clearSuccessFlag());
  };
};
