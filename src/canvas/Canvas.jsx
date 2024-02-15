import React from 'react'
import useCanvas from './useCanvas2.js'
//import useCanvas from './useCanvas.js'
import './Canvas.scss'

const Canvas = props => {  
  
  const { draw, ...rest } = props;
  const ref = useCanvas(draw);

  return <canvas ref={ref} {...rest}/>
}

export default Canvas