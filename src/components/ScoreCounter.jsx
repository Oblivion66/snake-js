import "../UI/Counter.scss";
import { useSelector } from "react-redux";


function ScoreCounter() {
  const score = useSelector((state) => state.game.score);
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
      <div className="counter" id="score-counter">Ваш счет: {score}</div>
  );
}

export default ScoreCounter;