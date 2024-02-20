import React from "react";
import "../UI//Menu.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, setGameRunning } from "../store/gameSlice";

const DifficultyMenu = ({ active, setActive, children }) => {
  const dispatch = useDispatch();
  const isGameOver = useSelector((state) => state.game.isGameOver);

  return (
    <div
    className={active ? "menu active" : "menu"}
    onClick={() => {
      setActive(false);
      if (!isGameOver) dispatch(resetGame());
    }}
  >
    <div
      className={active ? "menu_content active" : "menu_content"}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
  );
};

export default DifficultyMenu;