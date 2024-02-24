import "../UI//Menu.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, setDiffucultyLevel } from "../store/gameSlice";
import MenuButton from "./MenuButton";
import { Trans } from "react-i18next";

const DifficultyMenu = ({ active, setActive, setMenuActive, children }) => {
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
        <MenuButton
          className="menu-button"
          id="easy-button"
          onClick={() => {
            setActive(false);
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
            setActive(false);
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
            setActive(false);
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
            setActive(false);
            setMenuActive(true);
          }}
        >
          <Trans i18nKey="description.BackText"></Trans>
        </MenuButton>
      </div>
    </div>
  );
};

export default DifficultyMenu;
