import React , { useState, useEffect } from "react";
import ThemeSwitcher from "../../ui/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import languageE from "../../assets/icons/languageS.svg";
import languageA from "../../assets/icons/languageA.svg";
import languageAO from "../../assets/icons/languageAO.svg";
import languageEO from "../../assets/icons/languageEO.svg";

const Toggles = () => {
  const { i18n } = useTranslation();

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.body.classList.contains("dark");
          setCurrentTheme(isDark ? "dark" : "light");
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    const isDark = document.body.classList.contains("dark");
    setCurrentTheme(isDark ? "dark" : "light");

    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };


  const getLanguageIcon = () => {
    if (currentTheme === "dark") {
      return i18n.language === "en" ? languageA : languageE;
    } else {
      return i18n.language === "en" ? languageAO : languageEO;
    }
  };

  return (
    <div className="flex items-center">
      <ThemeSwitcher />
      <button
        className="mx-auto ms-6 p-2 text-gray-500 dark:text-[#E0AAEE]"
        onClick={toggleLanguage}
      >
        <ReactSVG
          src={getLanguageIcon()} 
          className="h-auto w-auto"
        />
      </button>
    </div>
  );
};

export default Toggles;
