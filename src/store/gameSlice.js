import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: 1000,
  height: 500,
  direction: '',
  box: 25,
  grid: {
    width: 40,
    height: 20,
  },
  food: { 
    x: Math.floor(Math.random() * (40- 1) + 1) * 25,
    y: Math.floor(Math.random() * (20 - 1) + 1) * 25,
  },
  snake: [],
  snakeX: 18 * 25,
  snakeY: 18 * 25,
  score: 0,
  recordScore: 0,
  time: 0,
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
    setSnake: (state, action) => {
      state.snake = action.payload;
    },
    moveSnake: (state, action) => {
      
    },
    increaseScore: (state, action) => {
      state.score += action.payload;
    },
    timer: (state, action) => {
      state.time += action.payload;
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
  setSnake,
  moveSnake,
  increaseScore,
  setGameOver,
  togglePause,
  resetGame,
  setRecord
} = gameSlice.actions;

export default gameSlice.reducer;
