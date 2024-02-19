import { useRef } from 'react'
import useCanvas from '../feauters/useCanvas2.js'
import '../UI//Canvas.scss'

const Test = ({ draw, refC }) => {
  useCanvas(draw, refC);

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