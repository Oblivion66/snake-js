import React from 'react';
import '../UI/Counter.scss'
import Canvas from './Canvas';
import '../UI/Counter.scss'
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/gameSlice';

function Counter() {

  const record = useSelector((state) => state.game.recordScore);
  const score = useSelector((state) => state.game.score);
  const time = useSelector((state) => state.game.time);
  const dispatch = useDispatch();
    
  return (
    <div className='info'>
      <div className='counter-score'>Ваш счет: {score}</div>
      <div className='counter-time'>Время: {time} сек</div>
    </div>
  );
}

export default Counter;