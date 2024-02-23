import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDirection, setGameRunning } from "../store/gameSlice";

const Controls = (ref) => {

  const { direction, isGameOver } = useSelector((state) => state.game);
  const dispatch = useDispatch();

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
  }, [direction, dispatch, isGameOver]);

  return ref;
};

export default Controls;
