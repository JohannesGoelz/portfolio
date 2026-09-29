import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { de } from "./de";
import { en } from "./en";
type Language = "de" | "en";
function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem("portfolio-language");
    if (saved === "de" || saved === "en") return saved;
  } catch {
    /* Storage may be disabled. */
  }
  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
}
const Context = createContext({
  language: "de" as Language,
  setLanguage: (_: Language) => {},
  t: de,
});
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* Continue without persistence. */
    }
    document.title =
      language === "de"
        ? "Johannes Gölz — Informatik & Mathematik"
        : "Johannes Gölz — Computer Science & Mathematics";
  }, [language]);
  return (
    <Context.Provider
      value={{ language, setLanguage, t: language === "de" ? de : en }}
    >
      {children}
    </Context.Provider>
  );
}
export const useLanguage = () => useContext(Context);
