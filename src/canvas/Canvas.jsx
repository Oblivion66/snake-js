import React from 'react'
import useCanvas from './useCanvas'
import './Canvas.scss'

const Canvas = props => {  
  
  const { draw, ...rest } = props
  const ref = useCanvas(draw)
  
  return <canvas ref={ref} {...rest}/>
}

export default Canvas