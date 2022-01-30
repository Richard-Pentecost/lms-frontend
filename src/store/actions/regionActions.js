import axios from 'axios';
import { regionActions } from '../slices/regionSlice';
import { getToken } from '../../utils/token-manager';

const URL = 'http://localhost:3000';

export const createRegion = region => {
  return async dispatch => {
    try {
      dispatch(regionActions.addRegionStart());
      const headers = { Authorization: getToken() };
      await axios.post(`${URL}/regions`, { region }, { headers });
      dispatch(regionActions.addRegionSuccess());
    } catch (error) {
      console.error(error);
      dispatch(regionActions.addRegionFail('Error adding region'));
    };
  };
};

export const fetchRegions = () => {
  return async dispatch => {
    try {
      dispatch(regionActions.fetchRegionsStart());
      const headers = { Authorization: getToken() };
      const { data: regions } = await axios.get(`${URL}/regions`, { headers });
      dispatch(regionActions.fetchRegionsSuccess(regions));
    } catch (error) {
      console.error(error);
      dispatch(regionActions.fetchRegionsFail('There was an error fetching regions'));
    };
  };
};

export const editRegion = (region, uuid) => {
  return async dispatch => {
    try {
      dispatch(regionActions.addRegionStart());
      const headers = { Authorization: getToken() };
      await axios.patch(`${URL}/regions/${uuid}`, { region }, { headers });
      dispatch(regionActions.addRegionSuccess());
    } catch (error) {
      console.error(error);
      dispatch(regionActions.addRegionFail('Error upating region'));
    };
  };
};

export const deleteRegion = uuid => {
  return async dispatch => {
    try {
      const headers = { Authorization: getToken() };
      await axios.delete(`${URL}/regions/${uuid}`, { headers });
      dispatch(fetchRegions());
    } catch (error) {
      console.error(error);
    };
  };
};

export const clearErrors = () => {
  return dispatch => {
    dispatch(regionActions.clearErrors());
  };
};

export const clearSuccessFlag = () => {
  return dispatch => {
    dispatch(regionActions.clearSuccessFlag());
  };
};
