import axios from 'axios';
import { farmActions } from '../slices/farmSlice';

const URL = 'http://localhost:3000';

export const createFarm = farm => {
  return async dispatch => {
    const response = await axios.post(`${URL}/farms`, { farm });
    console.log(response);
  };
};

export const fetchFarms = () => {
  return async dispatch => {
    try {
      const { data: farms } = await axios.get(`${URL}/farms`);
      dispatch(farmActions.fetchFarms(farms));
    } catch (err) {
      console.log(err);
    }
  }
};

export const updateFarm = (farm, id) => {
  return async dispatch => {
    const response = await axios.patch(`${URL}/farms/${id}`, { farm });
    console.log(response);
  }
}
