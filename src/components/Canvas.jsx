import { useRef } from 'react'
import useCanvas from '../utils/Canvas.js'
import '../UI/Canvas.scss'
import Game from '../utils/Game.js';
import Food from '../utils/Food.js';
import Snake from '../utils/Snake.js';
import Controls from '../utils/Controls.js';

const Test = ({ refC }) => {
  useCanvas(refC);
  Controls(refC);
  Snake(refC);
  Food(refC);
  Game(refC);

  return null;
}

const Canvas = props => {  
  const ref = useRef();
  const {...rest } = props;

  return <>
  <canvas ref={ref} {...rest}/>
  <Test refC={ref} />
  </>
}

export default Canvas