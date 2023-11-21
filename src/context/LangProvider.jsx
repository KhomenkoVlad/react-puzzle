import React, { createContext, useState } from "react";

export const LangContext = createContext();
const browserLang = navigator.language;
const defaultLanguage = browserLang.includes("uk") || browserLang.includes("ru") ? "uk" : "en";

export const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState(defaultLanguage);

  const tr = stringObject => stringObject[language] || stringObject.en || "NO TEXT";

  return (
    <LangContext.Provider value={{ language, setLanguage, tr }}>{children}</LangContext.Provider>
  );
};
