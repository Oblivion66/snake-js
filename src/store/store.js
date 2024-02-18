import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import gameSlice from './gameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
export default store;