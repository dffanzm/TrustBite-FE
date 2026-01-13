import React from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Languages } from "lucide-react";
import Logo from "./Logo";
import { useGlobal } from "../context/GlobalContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme, language, toggleLanguage, t } = useGlobal();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* KIRI: Logo */}
        <Logo size="text-2xl" iconSize={26} />

        {/* KANAN: Menu & Tools */}
        <div className="flex items-center gap-8">
          {/* Menu Links */}
          <div className="hidden md:flex items-center gap-6 font-semibold text-sm">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-500"
                  : "text-slate-500 hover:text-emerald-500 transition-colors"
              }
            >
              {t("dashboard")}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-500"
                  : "text-slate-500 hover:text-emerald-500 transition-colors"
              }
            >
              {t("about")}
            </NavLink>
          </div>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>

          {/* Tombol-Tombol */}
          <div className="flex items-center gap-3">
            {/* Bahasa */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition"
            >
              <Languages size={14} />
              {language}
            </button>

            {/* Dark Mode */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-emerald-500 transition"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
