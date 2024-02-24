import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector - для получения данных из хранилища, useDispatch - для отправки действий в хранилище
import { startTimer } from "../store/gameSlice";
import { spawnSnake } from "./Snake";

const Game = (ref) => {
  const dispatch = useDispatch();
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const isGamePaused = useSelector((state) => state.game.isGamepaused);
  const isGameRunning = useSelector((state) => state.game.isGameRunning);
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const box = useSelector((state) => state.game.box);
  const food = useSelector((state) => state.game.food);
  const snake = useSelector((state) => state.game.snake);
  const direction = useSelector((state) => state.game.direction);
  const level = useSelector((state) => state.game.diffucultyLevel);
  const score = useSelector(state => state.game.score);
  const recordScore = useSelector(state => state.game.recordScore);
  let t = useRef();

  useEffect(() => {
    if (isGameOver) {
      alert(`Игра окончена! \nВы набрали ${score} очков.\nРекорд: ${recordScore} очков.`);
      
    }
  }, [isGameOver, recordScore, score]);

  useEffect(() => {
    if (isGameRunning) {
      t.current = setInterval(() => {
        dispatch(startTimer());
      }, 1000);
    } else clearInterval(t.current);
  }, [dispatch, isGameOver, isGamePaused, isGameRunning]);

  useEffect(() => {
    function runGame() {
      if (isGameOver) return
      else {
        spawnSnake(direction, dispatch, level, width, height, food, box, snake);
      }
    }

    if (isGameRunning) {
      let game;

      switch (level) {
        case "easy":
          game = setInterval(runGame, 150);
          break;

        case "normal":
          game = setInterval(runGame, 100);
          break;

        case "hard":
          game = setInterval(runGame, 80);
          break;

        default:
          break;
      }

      return () => {
        clearInterval(game);
      };
    }
  }, [box, direction, dispatch, food, height, isGameOver, isGameRunning, level, snake, width]);

  return ref;
};

export default Game;