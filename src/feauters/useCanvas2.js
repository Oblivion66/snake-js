import React, { useState, useRef, useEffect } from "react";
import store from "../store/store";
import actions, { increaseScore } from "../store/gameSlice";
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

  let food = useSelector(state => state.game.food)

  const [snake, setSnake] = useState([
    {
      x: 18 * box,
      y: 9 * box,
    },
  ]);

  let direction = useSelector(state => state.game.direction);

  document.addEventListener("keydown", function (event) {
    if (event.code == "ArrowLeft" && direction != "right") direction = "left";
    if (event.code == "ArrowUp" && direction != "down") direction = "up";
    if (event.code == "ArrowRight" && direction != "left") direction = "right";
    if (event.code == "ArrowDown" && direction != "up") direction = "down";
  });

  useEffect(() => {
    const canvas = ref.current;
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

    function eatTail(head, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game);
      }
    }

    function spawnSnake() {
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "rgb(35, 130, 254)" : "rgb(20, 93, 189)";
        ctx.fillRect(snake[i].x, snake[i].y, box - 1, box - 1);
      }

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (snakeX == food.x && snakeY == food.y) {
        score = dispatch(increaseScore(1))
        food = {
          x: Math.floor(Math.random() * (grid.width - 1) + 1) * box,
          y: Math.floor(Math.random() * (grid.height - 1) + 1) * box,
        };
      } else snake.pop();

      if (
        snakeX < 0 ||
        snakeX >= box * grid.width ||
        snakeY < 0 ||
        snakeY >= box * grid.height
      )
        clearInterval(game);

      if (direction == "left") snakeX -= box;
      if (direction == "right") snakeX += box;
      if (direction == "up") snakeY -= box;
      if (direction == "down") snakeY += box;

      let newHead = {
        x: snakeX,
        y: snakeY,
      };

      eatTail(newHead, snake);

      snake.unshift(newHead);
    }

    function runGame() {
      createCanvasGrid();
      spawnSnake();
      ctx.fillStyle = "rgb(209, 0, 66)";
      ctx.fillRect(food.x, food.y, box, box);
    }

    let game = setInterval(runGame, 200);


  });

  return ref;
};

export default useCanvas;
