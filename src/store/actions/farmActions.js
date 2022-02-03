import axios from 'axios';
import { farmActions } from '../slices/farmSlice';
import { getToken } from '../../utils/token-manager';

const URL = 'http://localhost:3000';

export const createFarm = (farm, products) => {
  return async dispatch => {
    if (farm && products.length > 0) {
      try {
        dispatch(farmActions.addFarmStart());
        const headers = { Authorization: getToken() };
        await axios.post(`${URL}/farms`, { farm, products }, { headers });
        dispatch(farmActions.addFarmSuccess());
        dispatch(fetchActiveFarms());
      } catch (error) {
        console.error(error);
        dispatch(farmActions.addFarmFail('Error adding farm'));
      };
    } else {
      if (products.length === 0) {
        dispatch(farmActions.addFarmFail('At least one product must be included for farm'));
      } else {
        dispatch(farmActions.addFarmFail('There was an error'));
      }
    }
  };
};

export const fetchActiveFarms = () => {
  return async dispatch => {
    try {
      dispatch(farmActions.fetchFarmsStart());
      const headers = { Authorization: getToken() };
      const { data: farms } = await axios.get(`${URL}/farms/active`, { headers });
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
      dispatch(farmActions.fetchAllFarmsStart());
      const headers = { Authorization: getToken() };
      const { data: farms } = await axios.get(`${URL}/farms`, { headers });
      dispatch(farmActions.fetchAllFarmsSuccess(farms));
    } catch (error) {
      console.error(error);
      dispatch(farmActions.fetchAllFarmsFail('Error fetching farms'));
    };
  };
};

export const editFarm = (farm, uuid) => {
  return async dispatch => {
    try {
      dispatch(farmActions.addFarmStart());
      const headers = { Authorization: getToken() };
      await axios.patch(`${URL}/farms/${uuid}`, { farm }, { headers });
      dispatch(farmActions.addFarmSuccess());
      dispatch(fetchActiveFarms());
    } catch (error) {
      console.error(error);
      dispatch(farmActions.addFarmFail('Error updating farm'));
    };
  };
};

export const disableFarm = (farm, uuid) => {
  return async dispatch => {
    try {
      dispatch(farmActions.addFarmStart());
      const headers = { Authorization: getToken() };
      await axios.patch(`${URL}/farms/${uuid}/disable`, { farm }, { headers } );
      dispatch(farmActions.addFarmSuccess());
      dispatch(fetchActiveFarms());
      dispatch(fetchFarms());
    } catch (error) {
      console.error(error);
      dispatch(farmActions.addFarmFail('Error updating farm'));
    };
  };
};

export const deleteFarm = uuid => {
  return async dispatch => {
    try { 
      const headers = { Authorization: getToken() };
      await axios.delete(`${URL}/farms/${uuid}`, { headers });
      dispatch(fetchActiveFarms());
    } catch (error) {
      console.error(error);
    }
  }
}

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
