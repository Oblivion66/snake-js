import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  record: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.score += action.payload;
    },
    decrement: (state) => {
      state.score -= 1;
    },
    reset: (state) => {
      state.score = 0;
    },
    incrementByAmount: (state, action) => {
      state.score += action.payload;
    },
    setRecordd: (state) => {
      if (state.record < state.score) {
        state.record = state.score;
      }
    },
  },
});

export const { increment, decrement, reset, incrementByAmount, setRecordd } =
  counterSlice.actions;

export default counterSlice.reducer;
