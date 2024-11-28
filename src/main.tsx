// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import i18n from "./i18n"; // Import i18n setup
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

// Ensure the correct language is set before rendering
const savedLanguage = localStorage.getItem("i18nextLng") || i18n.language;
i18n.changeLanguage(savedLanguage);

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>
);
