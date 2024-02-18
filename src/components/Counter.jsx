import React from 'react';
import '../UI/Counter.scss'
import Canvas from './Canvas';
import '../UI/Counter.scss'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount, setRecordd } from '../store/counterSlice';
import {
    setFood,
    moveSnake,
    increaseScore,
    setGameOver,
    togglePause,
    resetGame,
    setRecord
  } from '../store/gameSlice';

function Counter() {
  const count = useSelector((state) => state.counter.score);
  const record = useSelector((state) => state.counter.record);
  const score = useSelector((state) => state.game.score)
  const dispatch = useDispatch();
    
  return (
    <div>
      <div>Count: {count}</div>
      <div >Record: {record}</div>
      <button onClick={() => dispatch(increment(5))}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(setRecordd())}>Increment by 5</button>
    </div>
  );
}

export default Counter;