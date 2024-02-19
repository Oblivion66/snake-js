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
  newHead: {
    x: 0,
    y: 0,
  },
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
    setFood: (state) => {
      state.food = { 
        x: Math.floor(Math.random() * (state.grid.width - 1) + 1) * state.box,
        y: Math.floor(Math.random() * (state.grid.height - 1) + 1) * state.box,
      };
    },
    setSnake: (state) => {
      state.snake = [{
        x: 18 * state.box,
        y: 9 * state.box,
      }];
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    moveSnake: (state, action) => {
      // state.newHead = { x: state.snake[0].x, y: state.snake[0].y };
      // switch (state.direction) {
      //   case 'up':
      //     newHead.y -= state.box;
      //     break;
      //   case 'down':
      //     newHead.y += state.box;
      //     break;
      //   case 'left':
      //     newHead.x -= state.box;
      //     break;
      //   case 'right':
      //     newHead.x += state.box;
      //     break;
      //   default:
      //     break;
    },
    increaseScore: (state, action) => {
      state.score += action.payload;
    },
    timer: (state, action) => {
      state.time += action.payload;
    },
    setGameOver: (state, action) => {
      state.isGameOver = action.payload;
    },
    setPause: (state, action) => {
      state.isGamePaused = action.payload;
    },
    resetGame: (state) => {
      state.food = initialState.food;
      state.snake = initialState.snake;
      state.score = 0;
      state.isGameOver = false;
      state.isGamePaused = false;
    },
    setRecord: (state) => {
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
  setPause,
  resetGame,
  setRecord,
  setDirection,
  timer,
} = gameSlice.actions;

export default gameSlice.reducer;
