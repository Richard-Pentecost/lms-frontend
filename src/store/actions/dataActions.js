import axios from 'axios';
import { dataActions } from '../slices/dataSlice';

const URL = 'http://localhost:3000/farms';

export const addData = data => {
  return async dispatch => {
    try {
      const { farmFk: farmId } = data;
      dispatch(dataActions.addDataStart());
      await axios.post(`${URL}/${farmId}/data`, { data });
      dispatch(dataActions.addDataSuccess());
    } catch (error) {
      console.error(error);
      dispatch(dataActions.addDataFail('Error adding data'));
    }
  };
};

export const editData = (data, dataId) => {
  return async dispatch => {
    try {
      const { farmFk: farmId } = data;
      await axios.patch(`${URL}/${farmId}/data/${dataId}`, { data });
      dispatch(dataActions.addDataSuccess());
    } catch (error) {
      console.error(error);
      dispatch(dataActions.addDataFail('There was an error updating data'));
    }
  }
}

export const fetchData = farmId => {
  return async dispatch => {
    try {
      dispatch(dataActions.fetchDataStart());
      const response = await axios.get(`${URL}/${farmId}/data`);
      dispatch(dataActions.fetchDataSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(dataActions.fetchDataFail('Error fetching data'));
    }
  }
}

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