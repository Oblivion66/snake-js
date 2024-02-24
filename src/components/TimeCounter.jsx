import "../UI/Counter.scss";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";

function TimeCounter() {
  const timer = useSelector((state) => state.game.time);

  const formatTime = (timer) => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(timer % 60)
      .toString()
      .padStart(2, "0");
    return { minutes, seconds };
  };

  const { minutes, seconds } = formatTime(timer);

  return (
    <div className="counter" id="time-counter">
      <Trans i18nKey="description.TimeText"></Trans>
      {minutes}
      <Trans i18nKey="description.MinText"></Trans> 
      {seconds}
      <Trans i18nKey="description.SecText"></Trans>
    </div>
  );
}

export default TimeCounter;
