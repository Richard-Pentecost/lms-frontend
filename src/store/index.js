import { configureStore } from '@reduxjs/toolkit';
import farmReducer from './slices/farmSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import dataReducer from './slices/dataSlice';
import regionReducer from './slices/regionSlice';

const store = configureStore({
  reducer: {
    farmState: farmReducer,
    authState: authReducer,
    userState: userReducer,
    dataState: dataReducer,
    regionState: regionReducer,
  }
});

export default store;
