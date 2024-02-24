import { useSelector } from "react-redux";
import "../UI/Record.scss"
import { useTranslation, Trans } from "react-i18next";


const Record = () => {
    const record = useSelector((state) => state.game.recordScore);

    return (
        <div className="counter-record">
            <Trans i18nKey="description.RecordText"></Trans>{record}
            </div>
    );
};

export default Record;