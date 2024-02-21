import { useSelector } from "react-redux";
import "../UI/Record.scss"

const Record = () => {
    const record = useSelector((state) => state.game.recordScore);

    return (
        <div className="counter-record">Рекорд: {record}</div>
    );
};

export default Record;