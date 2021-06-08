// import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) { 
      state.counter--; 
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  }
});

const store = configureStore({
  reducer: counterSlice.reducers
});

export const counterActions = counterSlice.actions;

// const counterReducer = (state = initialState, action) => {
//   if (action.type === 'increment') {
//     return { ...state, counter: state.counter + 1 };
//   }
  
//   if (action.type === 'increase') {
//     return { ...state, counter: state.counter + action.payload };
//   }
  
//   if (action.type === 'decrement') {
//     return { ...state, counter: state.counter - 1 };
//   }

//   if (action.type === 'toggle') {
//     return { ...state, showCounter: !state.showCounter };
//   }

//   return state;
// };



// const store = createStore(counterReducer);

export default store;
