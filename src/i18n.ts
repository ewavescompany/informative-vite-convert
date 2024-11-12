import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(initReactI18next) // Integrates i18next with React
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if selected language is not available
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
