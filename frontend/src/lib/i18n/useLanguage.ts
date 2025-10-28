import { useState } from "react";
import { changeLanguage as changeLanguageI18n } from "i18next";
import { getItem, setItem } from "../localStorage";
import { getLocales } from "expo-localization";

const LANGUAGE_KEY = "LANGUAGE";
let storageLanguage: string | null = null;

export function useLanguage() {
  const [internalLanguage, setInternalLanguage] = useState<string>(storageLanguage ?? "en");

  const setLanguage = (language: string) => {
    // Hook language
    setInternalLanguage(language);
    // Persist language to storage
    setItem(LANGUAGE_KEY, language);
    storageLanguage = language;
    // Change language in i18n
    changeLanguageI18n(language);
  };

  return { language: internalLanguage, setLanguage };
}

export async function loadLanguage() {
  const language = await getItem<string>(LANGUAGE_KEY);
  if (language) {
    storageLanguage = language;
  } else {
    storageLanguage = getLocales()[0].languageCode ?? "en";
  }
  changeLanguageI18n(storageLanguage);
}
