import "../UI//Menu.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setGameRunning,
  setGamePaused,
  setGameOver,
  resetGame,
} from "../store/gameSlice";
import MenuButton from "./MenuButton";
import { Trans } from "react-i18next";

const Menu = ({ active, setActive, setDiffucultyMenuActive, children }) => {
  const dispatch = useDispatch();
  const isGameOver = useSelector((state) => state.game.isGameOver);

  return (
    <div
      className={active ? "menu active" : "menu"}
      onClick={() => {
        setActive(false);
        if (!isGameOver) dispatch(setGameRunning());
      }}
    >
      <div
        className={active ? "menu_content active" : "menu_content"}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuButton
          className="menu-button"
          onClick={() => {
            setActive(false);
            dispatch(setGameRunning());
          }}
        >
          <Trans i18nKey="description.ContinueText"></Trans>
        </MenuButton>

        <MenuButton
          className="menu-button"
          onClick={() => {
            setActive(false);
            dispatch(resetGame());
          }}
        >
          <Trans i18nKey="description.StartGameText"></Trans>
        </MenuButton>

        <MenuButton
          className="menu-button"
          onClick={() => {
            setActive(false);
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
            setActive(false);
            dispatch(setGameOver());
          }}
        >
          <Trans i18nKey="description.EndGameText"></Trans>
        </MenuButton>
      </div>
    </div>
  );
};

export default Menu;
