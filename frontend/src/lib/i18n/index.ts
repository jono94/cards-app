import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Language is loaded from storage on app startup, this will be overridden
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});
