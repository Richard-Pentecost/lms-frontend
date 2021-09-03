import { configureStore } from '@reduxjs/toolkit';
import farmReducer from './slices/farmSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    farmState: farmReducer,
    authState: authReducer,
    userState: userReducer,
  }
});

export default store;
