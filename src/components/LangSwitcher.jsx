import { useTranslation } from "react-i18next";
import { useState } from "react";
import "../UI/LangSwitcher.scss"

const LangSwitcher = () => {
    const { i18n } = useTranslation();
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
      setIsToggled(!isToggled);
      if (isToggled) {
        i18n.changeLanguage("ru")
      }
      else i18n.changeLanguage("en")
    };

    const buttonClass = `lang-switcher ${isToggled ? 'en' : 'ru'}`;
    
    return (
      <div>
        <button
        className={buttonClass}
        type="submit"
        onClick={handleToggle}>
          {isToggled ? 'EN' : 'RU'}
        </button>
      </div>
    );
};

export default LangSwitcher;
