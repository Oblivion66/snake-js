import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
         description: {
            MenuText: "Menu",
            StartGameText: "Start game",
            RecordText: "Record: ",
            EndGameText: "End Game",
            ScoreText: "Your score: ",
            TimeText: "Time: ",
            MinText: " min ",
            SecText: " sec ",
            ContinueText: "Continue",
            Restarttext: "Restart",
            ChooseText: "Choose difficulty level",
            EasyText: "Easy",
            NormalText: "Normal",
            HardText: "Hard",
            BackText: "Back",
         }
        }
      },

      ru: {
        translation: {
         description: {
          MenuText: "Меню",
          StartGameText: "Начать Игру",
          RecordText: "Рекорд: ",
          EndGameText: "Завершить Игру",
          ScoreText: "Ваш счет: ",
          TimeText: "Время: ",
          MinText: " мин ",
          SecText: " сек ",
          ContinueText: "Продолжить",
          Restarttext: "Начать заново",
          ChooseText: "Выбрать уровень сложности",
          EasyText: "Легкий",
          NormalText: "Нормальный",
          HardText: "Сложный",
          BackText: "Назад",
         }
        }
      }
    }
  });

export default i18n;