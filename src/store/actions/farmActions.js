import axios from 'axios';
import { farmActions } from '../slices/farmSlice';

const URL = 'http://localhost:3000';

export const createFarm = farm => {
  return async dispatch => {
    try {
      dispatch(farmActions.addFarmStart());
      await axios.post(`${URL}/farms`, { farm });
      dispatch(farmActions.addFarmSuccess());
    } catch (error) {
      console.error(error);
      dispatch(farmActions.addFarmFail('Error adding farm'));
    };
  };
};

export const fetchActiveFarms = () => {
  return async dispatch => {
    try {
      dispatch(farmActions.fetchFarmsStart());
      const { data: farms } = await axios.get(`${URL}/farms/active`);
      dispatch(farmActions.fetchFarmsSuccess(farms));
    } catch (error) {
      console.error(error);
      dispatch(farmActions.fetchFarmsFail('Error fetching active farms'));
    };
  };
};


export const fetchFarms = () => {
  return async dispatch => {
    try {
      dispatch(farmActions.fetchFarmsStart());
      const { data: farms } = await axios.get(`${URL}/farms`);
      dispatch(farmActions.fetchFarmsSuccess(farms));
    } catch (error) {
      console.error(error);
      dispatch(farmActions.fetchFarmsFail('Error fetching farms'));
    };
  };
};

export const editFarm = (farm, uuid) => {
  return async dispatch => {
    try {
      dispatch(farmActions.addFarmStart());
      await axios.patch(`${URL}/farms/${uuid}`, { farm });
      dispatch(farmActions.addFarmSuccess());
    } catch (error) {
      console.error(error);
      dispatch(farmActions.addFarmFail('Error updating farm'));
    };
  };
};

export const clearErrors = () => {
  return dispatch => {
    dispatch(farmActions.clearErrors());
  };
};

export const clearSuccessFlag = () => {
  return dispatch => {
    dispatch(farmActions.clearSuccessFlag());
  };
};
