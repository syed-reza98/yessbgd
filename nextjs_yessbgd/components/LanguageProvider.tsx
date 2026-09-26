"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import en from "@/dictionaries/en.json";
import bn from "@/dictionaries/bn.json";

export type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const dictionaries: Record<Language, any> = { en, bn };

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Read from localStorage or cookie if available
    const saved = localStorage.getItem("yess_lang") as Language | null;
    if (saved === "en" || saved === "bn") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    startTransition(() => {
      setLanguageState(lang);
      localStorage.setItem("yess_lang", lang);
      document.cookie = `yess_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    });
  };

  const t = (key: string, fallback?: string): string => {
    const keys = key.split(".");
    let current: any = dictionaries[language];
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to English if missing in Bengali
        let fallbackVal: any = dictionaries.en;
        for (const fk of keys) {
          if (fallbackVal && typeof fallbackVal === "object" && fk in fallbackVal) {
            fallbackVal = fallbackVal[fk];
          } else {
            return fallback || key;
          }
        }
        return typeof fallbackVal === "string" ? fallbackVal : fallback || key;
      }
    }
    return typeof current === "string" ? current : fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
