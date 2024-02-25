import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
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