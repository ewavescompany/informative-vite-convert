import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import i18n from "./i18n"; // Import i18n setup
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";

// Ensure the correct language is set before rendering
const savedLanguage = localStorage.getItem("i18nextLng") || i18n.language;
i18n.changeLanguage(savedLanguage);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
