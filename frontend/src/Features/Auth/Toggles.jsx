import React from "react";
import ThemeSwitcher from "../../ui/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import languageE from "../../assets/icons/languageS.svg";
import languageA from "../../assets/icons/languageA.svg";

const Toggles = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <div className="flex items-center">
      <ThemeSwitcher />
      <button
        className="mx-auto ms-6 p-2 text-gray-500 dark:text-[#E0AAEE]"
        onClick={toggleLanguage}
      >
        <ReactSVG
          src={i18n.language === "en" ? languageA : languageE}
          className="h-auto w-auto"
        />
      </button>
    </div>
  );
};

export default Toggles;
