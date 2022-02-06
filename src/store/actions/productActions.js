import axios from 'axios';
import { productActions } from '../slices/productSlice';
import { getToken } from '../../utils/token-manager';

// const URL = 'http://localhost:3000';
const URL = 'https://lms-app-api.herokuapp.com';

export const createProduct = product => {
  return async dispatch => {
    try {
      dispatch(productActions.addProductStart());
      const headers = { Authorization: getToken() };
      await axios.post(`${URL}/products`, { product }, { headers });
      dispatch(productActions.addProductSuccess());
      dispatch(fetchProducts());
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
      const headers = { Authorization: getToken() };
      const { data: products } = await axios.get(`${URL}/products`, { headers });
      dispatch(productActions.fetchProductsSuccess(products));
    } catch (error) {
      console.error(error);
      dispatch(productActions.fetchProductsFail('There was an error fetching products'));
    };
  };
};

export const editProduct = (product, uuid) => {
  return async dispatch => {
    try {
      dispatch(productActions.addProductStart());
      const headers = { Authorization: getToken() };
      await axios.patch(`${URL}/products/${uuid}`, { product }, { headers });
      dispatch(productActions.addProductSuccess());
      dispatch(fetchProducts())
    } catch (error) {
      console.error(error);
      dispatch(productActions.addProductFail('Error updating product'));
    }
  }
}

export const deleteProduct = uuid => {
  return async dispatch => {
    try {
      const headers = { Authorization: getToken() };
      await axios.delete(`${URL}/products/${uuid}`, { headers });
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
