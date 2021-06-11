import { configureStore } from '@reduxjs/toolkit';
import farmReducer from './slices/farmSlice';

const store = configureStore({
  reducer: {
    farmState: farmReducer,
  }
});

export default store;
