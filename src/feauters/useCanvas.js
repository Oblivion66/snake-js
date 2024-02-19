import React, { useState, useRef, useEffect } from "react";
import store from "../store/store";
import actions from "../store/gameSlice";
import "../UI/styles.scss";
import { useSelector, useDispatch } from "react-redux";
import Snake from "./Snake";
import Game from "./Game";

const useCanvas = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const width = useSelector(state => state.game.width);
  const height = useSelector(state => state.game.height);
  const box = useSelector(state => state.game.box);
  let score = useSelector(state => state.game.score);
  const grid = useSelector(state => state.game.grid);

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

  let direction = useSelector(state => state.game.direction);
  const food = useSelector(state => state.game.food);

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
      ) clearInterval(game);

      if (snakeX == food.x && snakeY == food.y) {
        score = dispatch(game.increaseScore(1));
        food = randomPosition();
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
      console.log('rerun');
      createCanvasGrid(grid);

      ctx.fillStyle = "rgb(209, 0, 66)";
      ctx.fillRect(food.x, food.y, box, box);
      spawnSnake();
      console.log(score)
    }

    // let game = setInterval(runGame, 100);

    // return () => clearInterval(game);
  });

  return ref;
};

export default useCanvas;
