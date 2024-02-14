import { useRef, useEffect } from 'react';
import Game from '../game/Game.jsx';
import '../UI/styles.scss'

const useCanvas = draw => {
  
  const ref = useRef(null)
  
  useEffect(() => {
    
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let count = 0
    let animationId


  function createCanvasGrid() {

    let grid = {
      width:40,
      height:20,
    }
  
    const canvasWidth = 1000;
    const canvasHeight = 500;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineStyle = "rgb(14, 18, 37);";

    let offsetX = Math.floor(canvasWidth / grid.width);
    let offsetY = Math.floor(canvasHeight / grid.height);

    for (let x = offsetX; x < canvasWidth; x += offsetX) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
    }
    
    for (let y = offsetY; y < canvasHeight; y += offsetY) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
    }
    
    ctx.stroke();
  
    return canvas;
  }
  
  createCanvasGrid();
    



    
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [draw])
  
  return ref
}

export default useCanvas