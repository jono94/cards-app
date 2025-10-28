import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";
import { getLocales } from "expo-localization";

i18n.use(initReactI18next).init({
  resources,
  lng: getLocales()[0].languageCode ?? "en", // TODO: Support changing language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});
