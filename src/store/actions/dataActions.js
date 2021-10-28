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

export const fetchData = farmId => {
  console.log("*********")
  console.log(farmId);
  console.log("***********");
  return async dispatch => {
    try {
      dispatch(dataActions.fetchDataStart());
      const { data } = await axios.get(`${URL}/${farmId}/data`)
      console.log(data);
      dispatch(dataActions.fetchDataSuccess(data));
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