import { useState, useEffect } from "react";
import { increaseScore, setFood, setDirection, setGameOver, setPause, setSnake } from "../store/gameSlice";
import "../UI/styles.scss";
import { useSelector, useDispatch } from "react-redux";


const useCanvas = (draw, ref) => {
  const dispatch = useDispatch();
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const box = useSelector((state) => state.game.box);
  const grid = useSelector((state) => state.game.grid);
  const isGameOver = useSelector(state => state.game.isGameOver);
  const isGamePaused = useSelector(state => state.game.isGamepaused);
  const food = useSelector((state) => state.game.food);
  const snake = useSelector((state) => state.game.snake);

  const direction = useSelector((state) => state.game.direction);

  useEffect(() => {
    if (isGameOver) {
      alert("Game over")
    }
  }, [isGameOver])

  useEffect(() => {
    if (isGamePaused) {
      console.log('game is paused')
    }
  })

  useEffect(() => {
    if (!isGamePaused) {
      const dir = function (event) {
        if (event.code == "ArrowLeft" && direction != "right") dispatch(setDirection("left"));
        if (event.code == "ArrowUp" && direction != "down") dispatch(setDirection("up"));
        if (event.code == "ArrowRight" && direction != "left") dispatch(setDirection("right"));
        if (event.code == "ArrowDown" && direction != "up") dispatch(setDirection("down"));
      };
    
      document.addEventListener("keydown", dir);
      return () => document.removeEventListener('keydown', dir)
    }
  }, [direction, dispatch, isGamePaused]);

  useEffect(() => {
    console.log('createCanvasGrid');
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const canvasWidth = width;
    const canvasHeight = height;

    function createCanvasGrid() {
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
  }, [grid.height, grid.width, height, ref, width, snake]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    console.log('snake 2', snake);
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "rgb(35, 130, 254)" : "rgb(20, 93, 189)";
        ctx.fillRect(snake[i].x, snake[i].y, box - 1, box - 1);
      }
  }, [box, ref, snake]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

      ctx.fillStyle = "rgb(209, 0, 66)";
      ctx.fillRect(food.x, food.y, box, box);
  }, [box, food.x, food.y, ref, snake]);

  useEffect(() => {
    function isEatTail(head, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
          console.log("eating tail", game)
          return true;
        }
      }
    }

    function spawnSnake() {
      const newSnake = [...snake];
      let snakeX = newSnake[0].x;
      let snakeY = newSnake[0].y;

      console.log('direction', direction);

      if (!direction) return;

      if (snakeX == food.x && snakeY == food.y) {
        dispatch(increaseScore(1));
        dispatch(setFood(food));
      } else newSnake.pop();

      if (
        snakeX < 0 ||
        snakeX >= box * grid.width ||
        snakeY < 0 ||
        snakeY >= box * grid.height
      ) {
        console.log("wall", game)
        dispatch(setGameOver(true));
        return;
      }
      
 
      if (direction == "left") snakeX -= box;
      if (direction == "right") snakeX += box;
      if (direction == "up") snakeY -= box;
      if (direction == "down") snakeY += box;
    

      let newHead = {
        x: snakeX,
        y: snakeY,
      };

      const isFailed = isEatTail(newHead, newSnake);
      if (isFailed) {
        dispatch(setGameOver(true))
        return;
      };

      newSnake.unshift(newHead);
      dispatch(setSnake(newSnake));
    }

    function runGame() {
      if (isGameOver) return;
      spawnSnake();
      
    }

    let game = setInterval(runGame, 100);

    return () => {
      clearInterval(game);
    }
  }, [box, direction, dispatch, food, grid.height, grid.width, height, isGameOver, ref, snake, width]);

  return ref;
};

export default useCanvas;