import { useState } from "react";
import Menu from "../components/Menu";
import DifficultyMenu from "../components/DifficultyMenu";
import Button from "../components/Button";
import Canvas from "../components/Canvas";
import "../UI/Canvas.scss";
import "../UI/App.scss";
import { useDispatch } from "react-redux";
import ScoreCounter from "../components/ScoreCounter";
import TimeCounter from "../components/TimeCounter.jsx";
import { setGameOver, setGamePaused, resetGame } from "../store/gameSlice";
import Record from "../components/Record";
import { Trans, useTranslation } from "react-i18next";
import LangSwitcher from "../components/LangSwitcher.jsx";

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [diffucultyMenuActive, setDiffucultyMenuActive] = useState(false);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  return (
    <div className="app">
      <main className="top-bar">
        <Button
          id="open-menu"
          onClick={() => {
            setMenuActive(true);
            dispatch(setGamePaused());
          }}
        >
          <Trans i18nKey="description.MenuText"></Trans>
        </Button>

        <Menu
          active={menuActive}
          setActive={setMenuActive}
          setDiffucultyMenuActive={setDiffucultyMenuActive}
        >
          {" "}
        </Menu>

        <DifficultyMenu
          active={diffucultyMenuActive}
          setActive={setDiffucultyMenuActive}
          setMenuActive={setMenuActive}
        ></DifficultyMenu>

        <div className="counter-wrapper">
          <ScoreCounter className="counter" id="score-counter"></ScoreCounter>
          <TimeCounter className="counter" id="time-counter"></TimeCounter>
        </div>

        <LangSwitcher
          id="lang-switcher"
          i18n={i18n}
          onClick={() => i18n.changeLanguage()}
        ></LangSwitcher>
      </main>

      <Canvas id="game-field" className="game-field" />

      <div className="wrapper">
        <Button
          id="start-game-btn"
          onClick={() => {
            dispatch(resetGame());
          }}
        >
          <Trans i18nKey="description.StartGameText"></Trans>
        </Button>
        <Record></Record>
        <Button id="quit-game-btn" onClick={() => dispatch(setGameOver())}>
          <Trans i18nKey="description.EndGameText"></Trans>
        </Button>
      </div>
    </div>
  );
};

export default App;
