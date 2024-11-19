import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Detects browser language

import en from "./locales/en.json";
import ar from "./locales/ar.json";

// Initialize i18n
i18n
  .use(LanguageDetector) // Use the browser language detector
  .use(initReactI18next) // Integrate with React
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en", // Use English if the detected language is not available
    supportedLngs: ["en", "ar"], // Define supported languages
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    detection: {
      // Configure detection options
      order: ["localStorage", "navigator", "htmlTag"], // Check localStorage first, then browser settings
      caches: ["localStorage"], // Cache the language in localStorage
    },
  });

// Update the <html> tag's "lang" and "dir" attributes when language changes
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr"; // Change text direction
});

export default i18n;
