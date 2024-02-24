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
import {
  setGameRunning,
  setGameOver,
  setGamePaused,
  resetGame,
  setDiffucultyLevel,
} from "../store/gameSlice";
import Record from "../components/Record";
import MenuButton from "../components/MenuButton";
import { useTranslation, Trans } from "react-i18next";

const lngs = {
  en: { nativeName: "English" },
  ru: { nativeName: "Russian" },
};

const App = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [diffucultyMenuActive, setDiffucultyMenuActive] = useState(false);
  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  return (
    <div className="app">
      <div className="content">
        <main className="top-bar">
          <div>
            {Object.keys(lngs).map((lng) => (
              <button
                key={lng}
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
                }}
                type="submit"
                onClick={() => i18n.changeLanguage(lng)}
              >
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>

          <Button
            id="open-menu"
            onClick={() => {
              setMenuActive(true);
              dispatch(setGamePaused());
            }}
          >
            <Trans i18nKey="description.MenuText"></Trans>
          </Button>

          <Menu active={menuActive} setActive={setMenuActive}>
            <MenuButton
              className="menu-button"
              onClick={() => {
                setMenuActive(false);
                dispatch(setGameRunning());
              }}
            >
              <Trans i18nKey="description.ContinueText"></Trans>
            </MenuButton>

            <MenuButton
              className="menu-button"
              onClick={() => {
                setMenuActive(false);
                dispatch(resetGame());
              }}
            >
              <Trans i18nKey="description.StartGameText"></Trans>
            </MenuButton>

            <MenuButton
              className="menu-button"
              onClick={() => {
                setMenuActive(false);
                setDiffucultyMenuActive(true);
                dispatch(setGamePaused());
              }}
            >
              <Trans i18nKey="description.ChooseText"></Trans>
            </MenuButton>

            <MenuButton
              className="menu-button"
              id="quit-game"
              onClick={() => {
                setMenuActive(false);
                dispatch(setGameOver());
              }}
            >
              <Trans i18nKey="description.EndGameText"></Trans>
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
               <Trans i18nKey="description.EasyText"></Trans>
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
              <Trans i18nKey="description.NormalText"></Trans>
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
              <Trans i18nKey="description.HardText"></Trans>
            </MenuButton>

            <MenuButton
              className="menu-button"
              id="back-button"
              onClick={() => {
                setDiffucultyMenuActive(false);
                setMenuActive(true);
              }}
            >
              <Trans i18nKey="description.BackText"></Trans>
            </MenuButton>
          </DifficultyMenu>

          <ScoreCounter className="counter" id="score-counter"></ScoreCounter>
          <TimeCounter className="counter" id="time-counter"></TimeCounter>
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
    </div>
  );
};

export default App;
