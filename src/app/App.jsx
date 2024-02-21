import { useState } from "react";
import Menu from "../components/Menu";
import DifficultyMenu from "../components/DifficultyMenu";
import Button from "../components/Button";
import Canvas from "../components/Canvas";
import "../UI/Canvas.scss";
import "../UI/App.scss";
import { useDispatch } from "react-redux";
import Counter from "../components/Counter";
import {
  setGameRunning,
  setGameOver,
  setGamePaused,
  resetGame,
  setDiffucultyLevel,
} from "../store/gameSlice";
import Record from "../components/Record";
import MenuButton from "../components/MenuButton";

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [diffucultyMenuActive, setDiffucultyMenuActive] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="app">
      <div className="content">
        <main className="top-bar">
          <Button
            id="open-menu"
            onClick={() => {
              setMenuActive(true);
              dispatch(setGamePaused());
            }}
          >
            Меню
          </Button>

          <Menu active={menuActive} setActive={setMenuActive}>
            <MenuButton
              className="menu-button"
              onClick={() => {
                setMenuActive(false);
                dispatch(setGameRunning());
              }}
            >
              Продолжить
            </MenuButton>

            <MenuButton
              className="menu-button"
              onClick={() => {
                setMenuActive(false);
                dispatch(resetGame());
              }}
            >
              Начать заново
            </MenuButton>

            <MenuButton
              className="menu-button"
              onClick={() => {
                setMenuActive(false);
                setDiffucultyMenuActive(true);
                dispatch(setGamePaused());
              }}
            >
              Выбрать уровень сложности
            </MenuButton>

            <MenuButton
              className="menu-button"
              id="quit-game"
              onClick={() => {
                setMenuActive(false);
                dispatch(setGameOver());
              }}
            >
              Завершить игру
            </MenuButton>
          </Menu>

          <DifficultyMenu
            active={diffucultyMenuActive}
            setActive={setDiffucultyMenuActive}
          >
            <MenuButton
              className="menu-button"
              id="easy-button"
              onClick={() => {
                setDiffucultyMenuActive(false);
                dispatch(setDiffucultyLevel("easy"));
                dispatch(resetGame());
              }}
            >
              Легкий
            </MenuButton>

            <MenuButton
              className="menu-button"
              id="normal-button"
              onClick={() => {
                setDiffucultyMenuActive(false);
                dispatch(setDiffucultyLevel("normal"));
                dispatch(resetGame());
              }}
            >
              Нормальный
            </MenuButton>

            <MenuButton
              className="menu-button"
              id="hard-button"
              type="radio"
              onClick={() => {
                setDiffucultyMenuActive(false);
                dispatch(setDiffucultyLevel("hard"));
                dispatch(resetGame());
              }}
            >
              Сложный
            </MenuButton>

            <MenuButton
              className="menu-button"
              id="back-button"
              onClick={() => {
                setDiffucultyMenuActive(false);
                setMenuActive(true);
              }}
            >
              Назад
            </MenuButton>
          </DifficultyMenu>

          <Counter className="score-counter"></Counter>
        </main>

        <Canvas id="game-field" className="game-field" />

        <Button
          id="start-game-btn"
          onClick={() => {
            dispatch(resetGame());
          }}
        >
          Начать игру
        </Button>
        <Record></Record>
        <Button id="quit-game-btn" onClick={() => dispatch(setGameOver())}>
          Завершить игру
        </Button>
      </div>
    </div>
  );
};

export default App;
