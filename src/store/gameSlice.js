import { createSlice } from "@reduxjs/toolkit";

const width = 1000;
const height = 500;
const box = 25;
const grid = {
  width: 40,
  height: 20,
}
const snake = [{
  x: ( grid.width / 2 - 2 ) * box,
  y: ( grid.height / 2 - 1 ) * box,
}]
const easy = 'easy';
const normal = 'normal';
const hard = 'hard';

const initialState = {
  width: width,
  height: height,
  direction: '',
  box: box,
  grid: grid,
  food: { 
    x: Math.floor(Math.random() * (grid.width- 1) + 1) * box,
    y: Math.floor(Math.random() * (grid.height - 1) + 1) * box,
  },
  snake: [{
    x: snake[0].x,
    y: snake[0].y,
  }],
  score: 0,
  recordScore: 0,
  time: 0,
  isGameOver: false,
  isGameRunning: false,
  diffucultyLevel: normal,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setFood: (state) => {
      state.food = { 
        x: Math.floor(Math.random() * (state.grid.width - 1) + 1) * state.box,
        y: Math.floor(Math.random() * (state.grid.height - 1) + 1) * state.box,
      };
    },
    setSnake: (state, action) => {
      state.snake = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    increaseScore: (state, action) => {
      state.score += action.payload;
    },
    startTimer: (state) => {
      state.time += 1;
    },
    setTimer: (state, action) => {
      state.time = action.payload;
    },
    setGameRunning: (state) => {
      state.isGameRunning = true;
      state.isGameOver = false;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isGameRunning = false;
      state.time = 0;
    },
    setGamePaused: (state) => {

      state.isGameRunning = false;
    },
    resetGame: (state) => {
      state.food = initialState.food;
      state.snake = initialState.snake;
      state.score = 0;
      state.time = 0;
      state.direction = '';
      state.isGameRunning = true;
      state.isGameOver = false;
      state.isGamePaused = false;
    },
    setRecord: (state) => {
      if (state.recordScore < state.score) {
        state.recordScore = state.score
      }
    },
    setDiffucultyLevel: (state, action) => {
      state.diffucultyLevel = action.payload;
    }
  },
});

export const {
  setFood,
  setSnake,
  increaseScore,
  setGameRunning,
  setGameOver,
  setGamePaused,
  resetGame,
  setRecord,
  setDirection,
  startTimer,
  setTimer,
  setDiffucultyLevel,
} = gameSlice.actions;

export default gameSlice.reducer;
