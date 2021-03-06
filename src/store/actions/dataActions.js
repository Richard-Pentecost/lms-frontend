import axios from 'axios';
import { dataActions } from '../slices/dataSlice';
import { getToken } from '../../utils/token-manager';
import { API_URL } from '../../utils/get-api-url';

export const addData = (data, previousDataUuid) => {
  return async dispatch => {
    try {
      const { farmFk: farmId } = data;
      dispatch(dataActions.addDataStart());
      const headers = { Authorization: getToken() };
      await axios.post(`${API_URL}/farms/${farmId}/data`, { data, previousDataUuid }, { headers });
      dispatch(dataActions.addDataSuccess());
      dispatch(fetchData(farmId));
    } catch (error) {
      console.error(error);
      dispatch(dataActions.addDataFail('Error adding data'));
    };
  };
};

export const editData = (data, dataId, previousDataUuid) => {
  return async dispatch => {
    try {
      const { farmFk: farmId } = data;
      dispatch(dataActions.addDataStart());
      const headers = { Authorization: getToken() };
      await axios.patch(`${API_URL}/farms/${farmId}/data/${dataId}`, { data, previousDataUuid }, { headers });
      dispatch(dataActions.addDataSuccess());
      dispatch(fetchData(farmId));
    } catch (error) {
      console.error(error);
      dispatch(dataActions.addDataFail('There was an error updating data'));
    };
  };
};

export const fetchData = farmId => {
  return async dispatch => {
    try {
      dispatch(dataActions.fetchDataStart());
      const headers = { Authorization: getToken() };
      const response = await axios.get(`${API_URL}/farms/${farmId}/data`, { headers });
      dispatch(dataActions.fetchDataSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(dataActions.fetchDataFail('Error fetching data'));
    };
  };
};

export const deleteData = (farmId, dataId) => {
  return async dispatch => {
    try {
      const headers = { Authorization: getToken() };
      await axios.delete(`${API_URL}/farms/${farmId}/data/${dataId}`, { headers });
      dispatch(fetchData(farmId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const clearErrors = () => {
  return dispatch => {
    dispatch(dataActions.clearErrors());
  };
};

export const clearSuccessFlag = () => {
  return dispatch => {
    dispatch(dataActions.clearSuccessFlag());
  };
};