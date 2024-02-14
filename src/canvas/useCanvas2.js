import { useRef, useEffect } from 'react';
import '../UI/styles.scss';


const useCanvas = draw => {
  
  const ref = useRef(null)
 
  useEffect(() => {
    
  const canvas = ref.current
  const ctx = canvas.getContext('2d')
  const box = 25;
  let score = 0

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

  

  let food = {
    x: 1,
    y: 1,
  }
  let snake = [];
  snake[0] = {
    x: 18 * box,
    y: 9 * box,
  }

  let direction;

  document.addEventListener("keydown", function(event) {

    if (event.code == 'ArrowLeft' && direction != "right") {
      direction = "left";
      cheackDirection();
    };
    if (event.code == 'ArrowUp' && direction != "down") {
      direction = "up";
      cheackDirection();
    };
    if (event.code == 'ArrowRight' && direction != "left") {
      direction = "right";
      cheackDirection();
    };
    if (event.code == 'ArrowDown' && direction != "up") {
      direction = "down";
      cheackDirection();
    };
  })

  function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
      if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
  }


  function runGame() {

// -----------------------------------------------------------------------------------------------------
// --------------------------------------------Фрукт----------------------------------------------------
// -----------------------------------------------------------------------------------------------------

    food = {
        x: Math.floor(Math.random()  * (grid.width - 1) + 1) * box,
        y: Math.floor(Math.random()  * (grid.height - 1) + 1) * box,
      }
  
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);



// -----------------------------------------------------------------------------------------------------
// --------------------------------------------Змейка---------------------------------------------------
// -----------------------------------------------------------------------------------------------------
  
      for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "rgb(35, 130, 254)";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }
  
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;
    
      if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
          x: Math.floor((Math.random() * grid.width + 1)) * box,
          y: Math.floor((Math.random() * grid.height + 1)) * box,
        };
      } else
        snake.pop();
    
      if(snakeX < box || snakeX > box * grid.width
        || snakeY < 1 * box || snakeY > box * grid.height)
        clearInterval(game);
    
      if(direction == "left") snakeX -= box;
      if(direction == "right") snakeX += box;
      if(direction == "up") snakeY -= box;
      if(direction == "down") snakeY += box;
    
      let newHead = {
        x: snakeX,
        y: snakeY
      };
    
      eatTail(newHead, snake);
    
      snake.unshift(newHead);
  }

  let game = setInterval(runGame, 100);




    
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [draw])
  
  return ref

}

export default useCanvas