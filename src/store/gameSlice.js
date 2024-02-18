import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: 1000,
  height: 500,
  box: 25,
  grid: {
    width: 40,
    height: 20,
  },
  food: { x: 0, y: 0 },
  snake: [{ 
    x: 18 * 25, 
    y: 9 * 25 
  }],
  score: 0,
  recordScore: 0,
  isGameOver: false,
  isGamePaused: false,
  diffucultyLevel: 'normal',
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setFood: (state, action) => {
      state.food = action.payload;
    },
    moveSnake: (state, action) => {
      
    },
    increaseScore: (state, action) => {
      state.score += action.payload;
    },
    setGameOver: (state, action) => {
      state.isGameOver = true;
    },
    togglePause: (state, action) => {
      state.isGamePaused = !state.isGamePaused;
    },
    resetGame: (state, action) => {
      state.food = initialState.food;
      state.snake = initialState.snake;
      state.score = 0;
      state.isGameOver = false;
      state.isGamePaused = false;
    },
    setRecord: (state, action) => {
      if (state.record < state.score) {
        state.record += state.score
      }
    }
  },
});

export const {
  setFood,
  moveSnake,
  increaseScore,
  setGameOver,
  togglePause,
  resetGame,
  setRecord
} = gameSlice.actions;

export default gameSlice.reducer;
