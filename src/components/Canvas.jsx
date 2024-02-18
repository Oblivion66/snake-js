import React from 'react'
import useCanvas from '../feauters/useCanvas.js'
import '../UI//Canvas.scss'


const Canvas = props => {  
  
  const { draw, ...rest } = props;
  const ref = useCanvas(draw);

  return <canvas ref={ref} {...rest}/>
}

export default Canvas