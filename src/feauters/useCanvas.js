import { useEffect, useRef } from "react";
import {
  increaseScore,
  setFood,
  setDirection,
  setGameOver,
  setSnake,
  startTimer,
  setGameRunning,
  setRecord,
} from "../store/gameSlice";
import "../UI/styles.scss";
import { useSelector, useDispatch } from "react-redux";

const useCanvas = (draw, ref) => {
  const dispatch = useDispatch();
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const box = useSelector((state) => state.game.box);
  const grid = useSelector((state) => state.game.grid);
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const isGamePaused = useSelector((state) => state.game.isGamepaused);
  const isGameRunning = useSelector((state) => state.game.isGameRunning);
  const food = useSelector((state) => state.game.food);
  const goldFood = useSelector(state => state.game.goldFood);
  const snake = useSelector((state) => state.game.snake);
  const direction = useSelector((state) => state.game.direction);
  const level = useSelector((state) => state.game.diffucultyLevel);
  const time = useSelector((state) => state.game.time);
  let t = useRef();

  useEffect(() => {
    if (isGameOver) {
      console.log("Игра окончена!");
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isGameRunning) {
      t.current = setInterval(() => {
        dispatch(startTimer());
      }, 1000);
    } else clearInterval(t.current);
  }, [dispatch, isGameOver, isGamePaused, isGameRunning]);

  useEffect(() => {
    const dir = function (event) {
      if (event.code == "ArrowLeft" && direction != "right") {
        dispatch(setDirection("left"));
        dispatch(setGameRunning());
      }
      if (event.code == "ArrowUp" && direction != "down") {
        dispatch(setDirection("up"));
        dispatch(setGameRunning());
      }
      if (event.code == "ArrowRight" && direction != "left") {
        dispatch(setDirection("right"));
        dispatch(setGameRunning());
      }
      if (event.code == "ArrowDown" && direction != "up") {
        dispatch(setDirection("down"));
        dispatch(setGameRunning());
      }
    };
    if (isGameOver == false) {
      document.addEventListener("keydown", dir);
    }

    return () => document.removeEventListener("keydown", dir);
  }, [direction, dispatch, isGameOver, isGamePaused, isGameRunning]);

  useEffect(() => {
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
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i == 0 ? "rgb(35, 130, 254)" : "rgb(20, 93, 189)";
      ctx.fillRect(snake[i].x+1, snake[i].y+1, box - 1, box - 1);
    }
  }, [box, ref, snake]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if(isGameRunning) {
      ctx.fillStyle = "rgb(209, 0, 66)";
      ctx.fillRect(food.x-1, food.y-1, box + 2, box + 2);
    }
  }, [box, food.x, food.y, goldFood.x, goldFood.y, isGameRunning, ref, snake, time]);

  useEffect(() => {
    function isEatTail(head, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
          return true;
        }
      }
    }

    function spawnSnake() {
      const newSnake = [...snake];
      let snakeX = newSnake[0].x;
      let snakeY = newSnake[0].y;

      if (!direction) return;

      if (snakeX == food.x && snakeY == food.y) {

        switch (level) {
          case "easy":
            dispatch(increaseScore(1));
            break;
          case "normal":
            dispatch(increaseScore(2));
            break;
          case "hard":
            dispatch(increaseScore(3));
            break;
          default:
            break;
        }
        
        dispatch(setRecord());
        dispatch(setFood(food));
      } else newSnake.pop();

      if (
        snakeX < 0 ||
        snakeX > width - box ||
        snakeY < 0 ||
        snakeY > height - box
      ) {
        if (level == "hard") {
          dispatch(setGameOver());
          return;
        } else {
          switch (direction) {
            case "left":
              snakeX = width;
              break;
            case "right":
              snakeX = 0 - box;
              break;
            case "up":
              snakeY = height;
              break;
            case "down":
              snakeY = 0 - box;
              break;

            default:
              break;
          }
        }
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
        dispatch(setGameOver());
        return;
      }

      newSnake.unshift(newHead);
      dispatch(setSnake(newSnake));
    }

    function runGame() {
      if (isGameOver) return;
      spawnSnake();
    }

    if (isGameRunning) {
      let game;

      switch (level) {
        case "easy":
          game = setInterval(runGame, 150);
          console.log("easy");
          break;

        case "normal":
          game = setInterval(runGame, 100);
          console.log("normal");
          break;

        case "hard":
          game = setInterval(runGame, 80);
          console.log("hard");
          break;

        default:
          break;
      }

      return () => {
        clearInterval(game);
      };
    }
  }, [box, direction, dispatch, food, goldFood, goldFood.x, goldFood.y, grid.height, grid.width, height, isGameOver, isGameRunning, level, ref, snake, width]);

  return ref;
};

export default useCanvas;
