import React, { useState, useRef, useEffect } from "react";
import store from "../store/store";
import {
  setFood,
  moveSnake,
  increaseScore,
  setGameOver,
  togglePause,
  resetGame,
  setRecord,
} from "../store/gameSlice";
import "../UI/styles.scss";
import { useSelector, useDispatch } from "react-redux";

const useCanvas = () => {
  const ref = useRef(null);
  const width = 1000;
  const height = 500;
  const box = 25;
  const dispatch = useDispatch();
  const score = 0;


  const grid = {
    width: 40,
    height: 20,
  };

  const randomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * (grid.width - 1) + 1) * box,
      y: Math.floor(Math.random() * (grid.height - 1) + 1) * box,
    };
    return position;
  };

  const [snake, setSnake] = useState([
    {
      x: 18 * box,
      y: 9 * box,
    },
  ]);

  let direction = "";
  const [food, setFood] = useState(randomPosition);

  const changeDirectionWithKeys = (e) => {
    var { keyCode } = e;
    if (keyCode == "37" && direction != "right") direction = "left";
    if (keyCode == "38" && direction != "down") direction = "up";
    if (keyCode == "39" && direction != "left") direction = "right";
    if (keyCode == "40" && direction != "up") direction = "down";
  };

  document.addEventListener("keydown", changeDirectionWithKeys, false);

  useEffect(() => {
    const eatTail = (head, arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game);
      }
    };

    const spawnSnake = () => {
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "rgb(35, 130, 254)" : "rgb(20, 93, 189)";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (
        snakeX < 0 ||
        snakeX >= box * grid.width ||
        snakeY < 0 ||
        snakeY >= box * grid.height
      )
        clearInterval(game);

      if (snakeX == food.x && snakeY == food.y) {
        score++;
        setFood(randomPosition);
      } else snake.pop();

      switch (direction) {
        case "left":
          snakeX -= box;
          break;
        case "right":
          snakeX += box;
          break;
        case "up":
          snakeY -= box;
          break;
        case "down":
          snakeY += box;
      }

      // if (direction == "left") snakeX -= box;
      // if (direction == "right") snakeX += box;
      // if (direction == "up") snakeY -= box;
      // if (direction == "down") snakeY += box;

      let newHead = {
        x: snakeX,
        y: snakeY,
      };

      eatTail(newHead, snake);
      snake.unshift(newHead);
    };

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    function createCanvasGrid(grid) {
      canvas.width = width;
      canvas.height = height;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.lineStyle = "rgb(14, 18, 37);";

      let offsetX = Math.floor(width / grid.width);
      let offsetY = Math.floor(height / grid.height);

      for (let x = offsetX; x < width; x += offsetX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      for (let y = offsetY; y < height; y += offsetY) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();

      return canvas;
    }

    function runGame() {
      createCanvasGrid(grid);

      ctx.fillStyle = "rgb(209, 0, 66)";
      ctx.fillRect(food.x, food.y, box, box);
      spawnSnake();
    }

    let game = setInterval(runGame, 100);
  });

  return ref;
};

export default useCanvas;
