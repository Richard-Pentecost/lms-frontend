import { configureStore } from '@reduxjs/toolkit';
import farmReducer from './slices/farmSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    farmState: farmReducer,
    authState: authReducer,
  }
});

export default store;
