import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import de from "./de.json";

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language.startsWith('de') ? 'de' : 'en';
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: "en",
    supportedLngs: ['de', 'en'],
    load: 'languageOnly',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
