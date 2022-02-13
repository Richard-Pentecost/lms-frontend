import axios from 'axios';
import { productActions } from '../slices/productSlice';
import { getToken } from '../../utils/token-manager';
import { API_URL } from '../../utils/get-api-url';

export const createProduct = product => {
  return async dispatch => {
    try {
      dispatch(productActions.addProductStart());
      const headers = { Authorization: getToken() };
      await axios.post(`${API_URL}/products`, { product }, { headers });
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
      const { data: products } = await axios.get(`${API_URL}/products`, { headers });
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
      await axios.patch(`${API_URL}/products/${uuid}`, { product }, { headers });
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
      await axios.delete(`${API_URL}/products/${uuid}`, { headers });
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
