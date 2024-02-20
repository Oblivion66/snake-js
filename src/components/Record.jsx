import { useSelector } from "react-redux";

const Record = () => {
    const record = useSelector((state) => state.game.recordScore);

    return (
        <div className="counter-score">Рекорд: {record}</div>
    );
};

export default Record;