import React, { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // 1. Logic Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Cek local storage biar user gak perlu set ulang tiap refresh
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 2. Logic Bahasa
  const [language, setLanguage] = useState("ID"); // 'ID' or 'EN'
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "ID" ? "EN" : "ID"));

  // Dictionary Sederhana
  const t = (key) => {
    const dictionary = {
      welcome_title: {
        ID: "Analisis Halal Cerdas",
        EN: "Smart Halal Analysis",
      },
      start_btn: { ID: "Mulai Sekarang", EN: "Get Started" },
      dashboard: { ID: "Dashboard", EN: "Dashboard" },
      about: { ID: "Tentang", EN: "About" },
      // Tambahin kata-kata lain disini sesuai kebutuhan
    };
    return dictionary[key] ? dictionary[key][language] : key; // Fallback ke key kalo gak ketemu
  };

  return (
    <GlobalContext.Provider
      value={{ isDarkMode, toggleTheme, language, toggleLanguage, t }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
