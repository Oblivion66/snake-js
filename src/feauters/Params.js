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

const dispatch = null;
const width = null;
const height = null;
const box = null;
const food = null;
const snake = null;
const direction = null;
const level = null;
const isGameOver = null;
const isGamePaused = null;
const isGameRunning = null;



const Params = () => {
    dispatch = useDispatch();
    width = useSelector((state) => state.game.width);
    height = useSelector((state) => state.game.height);
    box = useSelector((state) => state.game.box);
    grid = useSelector((state) => state.game.grid);
    isGameOver = useSelector((state) => state.game.isGameOver);
    isGamePaused = useSelector((state) => state.game.isGamepaused);
    isGameRunning = useSelector((state) => state.game.isGameRunning);
    food = useSelector((state) => state.game.food);
    goldFood = useSelector((state) => state.game.goldFood);
    snake = useSelector((state) => state.game.snake);
    direction = useSelector((state) => state.game.direction);
    level = useSelector((state) => state.game.diffucultyLevel);
    time = useSelector((state) => state.game.time);
    t = useRef();

  return <div></div>;
};

export default Params;
