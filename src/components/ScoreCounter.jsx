import "../UI/Counter.scss";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";

function ScoreCounter() {
  const score = useSelector((state) => state.game.score);

  return (
    <div className="counter" id="score-counter">
      <Trans i18nKey="description.ScoreText"></Trans>
      {score}
    </div>
  );
}

export default ScoreCounter;
