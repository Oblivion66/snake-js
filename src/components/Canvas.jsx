import { useRef } from 'react'
import useCanvas from '../feauters/useCanvas.js'
import '../UI//Canvas.scss'
import Game from '../feauters/Game.js';
import Food from '../feauters/Food.js';
import Snake from '../feauters/Snake.js';
import Controls from '../feauters/Controls.js';

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