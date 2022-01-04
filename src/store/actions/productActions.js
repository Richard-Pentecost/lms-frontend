import axios from 'axios';
import { productActions } from '../slices/productSlice';

const URL = 'http://localhost:3000';

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
    }
  }
};
