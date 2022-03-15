import axios from 'axios';
import { farmActions } from '../slices/farmSlice';
import { getToken } from '../../utils/token-manager';
import { API_URL } from '../../utils/get-api-url';


export const createFarm = (farm, products) => {
  return async dispatch => {
    if (farm && products.length > 0) {
      try {
        dispatch(farmActions.addFarmStart());
        const headers = { Authorization: getToken() };
        await axios.post(`${API_URL}/farms`, { farm, products }, { headers });
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

export const fetchActiveFarms = (search = '') => {
  return async dispatch => {
    try {
      dispatch(farmActions.fetchFarmsStart());
      const headers = { Authorization: getToken() };
      const { data: farms } = await axios.get(`${API_URL}/farms/active/${search}`, { headers });
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
      const { data: farms } = await axios.get(`${API_URL}/farms`, { headers });
      dispatch(farmActions.fetchAllFarmsSuccess(farms));
    } catch (error) {
      console.error(error);
      dispatch(farmActions.fetchAllFarmsFail('Error fetching farms'));
    };
  };
};

export const editFarm = (farm, products, uuid) => {
  return async dispatch => {
    try {
      dispatch(farmActions.addFarmStart());
      const headers = { Authorization: getToken() };
      await axios.patch(`${API_URL}/farms/${uuid}`, { farm, products }, { headers });
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
      await axios.patch(`${API_URL}/farms/${uuid}/disable`, { farm }, { headers } );
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
      await axios.delete(`${API_URL}/farms/${uuid}`, { headers });
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
