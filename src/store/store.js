import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
  },
});
export default store;