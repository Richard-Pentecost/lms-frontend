import { configureStore, combineReducers } from '@reduxjs/toolkit';
import farmReducer from './slices/farmSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import dataReducer from './slices/dataSlice';
import regionReducer from './slices/regionSlice';
import productReducer from './slices/productSlice';

const combinedReducer = combineReducers({
  farmState: farmReducer,
  authState: authReducer,
  userState: userReducer,
  dataState: dataReducer,
  regionState: regionReducer,
  productState: productReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'auth/logoutUser') {
    state = undefined;
  }
  return combinedReducer(state, action);
}

const store = configureStore({
  reducer: rootReducer,
})

export default store;
