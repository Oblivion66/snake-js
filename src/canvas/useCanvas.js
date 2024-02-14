import { useRef, useEffect } from 'react';
import '../UI/styles.scss';
import { array } from 'prop-types';


const useCanvas = draw => {
  
  const ref = useRef(null)
  const foodImg = new Image;
  foodImg.src = '../assets/redFruit.png';
  const box = 25;
 
  
  useEffect(() => {
    
    const canvas = ref.current
    const ctx = canvas.getContext('2d')

    let count = 0
    
    
    let animationId
  
    let grid = {
      width:40,
      height:20,
    }



    function createCanvasGrid(grid) {


  
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

  createCanvasGrid(grid);
  
  


  function generateFood(ctx, grid) {

    let foodCoor = {
      x: Math.floor(Math.random()  * (grid.width - 1) + 1) * box,
      y: Math.floor(Math.random()  * (grid.height - 1) + 1) * box,
    }

    ctx.fillStyle = "red";
    ctx.fillRect(foodCoor.x, foodCoor.y, box, box);

  }


  function spawnSnake(ctx) {

    let snake = [];
    snake[0] = {
      x: 18 * box,
      y: 9 * box,
    }

    for(let i = 0; i < snake.length; i++) {
      ctx.fillStyle = "rgb(35, 130, 254)";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // let snakeX = snake[0].x;
    // let snakeY = snake[0].y;

    // snake.pop();

    // direction = calcDirection(e);

    // if(direction == "left") snakeX -= box;
    // if(direction == "right") snakeX += box;
    // if(direction == "up") snakeY-= box;
    // if(direction == "down") snakeY += box;

    // let newHead = {
    //   x: snakeX,
    //   y: snakeY,
    // };

    // snake.unshift(newHead);

    
  }
  
  let direction;

  let calcDirection = function(e) {

    
    if      (e.keyCode == 37 && direction != "right") direction = "left";
    else if (e.keyCode == 38 && direction != "down") direction = "up";
    else if (e.keyCode == 39 && direction != "left") direction = "right";
    else if (e.keyCode == 40 && direction != "up") direction = "down";

  }

  document.addEventListener("keydown", calcDirection);

  console.log(direction)





  function runGame() {
    generateFood(ctx, grid);
    spawnSnake(ctx);


  }

  runGame();

    
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [draw])
  
  return ref
}

export default useCanvas