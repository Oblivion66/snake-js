import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFood,
    setGameOver,
    setRecord,
    setSnake,
    increaseScore,
} from "../store/gameSlice";

function isEatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (head.x == arr[i].x && head.y == arr[i].y) {
        return true;
      }
    }
  }

  function spawnSnake(direction, dispatch, level, width, height, food, box, snake) {
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

const Snake = (ref) => {
    
  const dispatch = useDispatch();
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const box = useSelector((state) => state.game.box);
  const food = useSelector((state) => state.game.food);
  const snake = useSelector((state) => state.game.snake);
  const direction = useSelector((state) => state.game.direction);
  const level = useSelector((state) => state.game.diffucultyLevel);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i == 0 ? "rgb(35, 130, 254)" : "rgb(20, 93, 189)";
      ctx.fillRect(snake[i].x + 1, snake[i].y + 1, box - 1, box - 1);
      console.log("snake")
    }
  }, [box, direction, dispatch, food, height, level, ref, snake, width]);



  return ref;
};

export {spawnSnake, isEatTail}

export default Snake;