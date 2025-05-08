import React from "react";
import about2 from "../../../../assets/about2.png";
import { useTranslation } from "react-i18next";

function SummaryScore() {
  const { t ,i18n} = useTranslation();
  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 p-6">
 
      <div className={`p-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="relative">
          <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] sm:text-2xl">
            {t("motivation.summaryTitle")}
          </button>
          <span className={`absolute bottom-[-9px] h-[4px] w-[85px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${
            i18n.language === 'ar' ? 'right-0' : 'left-0'
          }`}></span>
        </div>
        <p className="mb-4 mt-8 font-poppins text-sm font-medium text-gray-700 dark:text-gray-300 sm:text-base ml-4">
          {t("motivation.summaryDesc")}
        </p>
        <section className="mb-4 flex items-center space-x-4 ml-10 mt-4 pt-4">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:bg-[#A3BFFA] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            {t("motivation.summaryPoint1")} <strong>{t("motivation.range1")}</strong>{" "}
            {t("motivation.summaryPoint2")}{" "}
            <strong className="text-base font-bold text-green-500 dark:text-green-400 sm:text-lg">
              {t("badges.green")}
            </strong>{" "}
            {t("motivation.cardText")}
          </p>
        </section>
        <section className="mb-4 flex items-center space-x-4 ml-10">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:bg-[#A3BFFA] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            {t("motivation.summaryPoint1")} <strong>{t("motivation.range2")}</strong>{" "}
            {t("motivation.summaryPoint2")}{" "}
            <strong className="text-base font-bold text-yellow-500 dark:text-yellow-400 sm:text-lg">
              {t("badges.gold")}
            </strong>{" "}
            {t("motivation.cardText")}
          </p>
        </section>
        <section className="mb-4 flex items-center space-x-4 ml-10">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:bg-[#A3BFFA] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            {t("motivation.summaryPoint1")} <strong>{t("motivation.range3")}</strong>{" "}
            {t("motivation.summaryPoint2")}{" "}
            <strong className="text-base font-bold text-[#6a6969] dark:text-[#A3BFFA] sm:text-lg">
              {t("badges.diamond")}
            </strong>{" "}
            {t("motivation.cardText")}
          </p>
        </section>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={about2}
          alt={t("motivation.scoreIllustration")}
          className="w-70 h-80"
        />
      </div>
    </div>
  );
}

export default SummaryScore;