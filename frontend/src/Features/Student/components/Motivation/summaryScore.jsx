import React from "react";
import about2 from "../../../../assets/about2.png";
import { useTranslation } from 'react-i18next';
function SummaryScore() {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 items-center gap-6 bg-white p-6 lg:grid-cols-2">
      <div className="p-4">
        <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent sm:text-2xl">
        {t('motivation.summaryTitle')}
        </button>

        <p className="mb-4 ms-1 w-16 rounded-xl border-t-4 border-[#BC6FFB] sm:w-24"></p>

        <p className="mb-4 font-poppins text-sm text-gray-700 sm:text-base">
        {t('motivation.summaryDesc')}
        </p>

        <section className="mb-4 flex items-center space-x-4">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm">
          {t('motivation.summaryPoint1')} <strong> {t('motivation.range1')}</strong> {t('motivation.summaryPoint2')}{" "}
            <strong className="text-base font-bold text-green-500 sm:text-lg">
            {t('badges.green')}
            </strong>{" "}
            {t('motivation.cardText')}
          </p>
        </section>

        <section className="mb-4 flex items-center space-x-4">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm">
          {t('motivation.summaryPoint1')}<strong> {t('motivation.range2')}</strong> {t('motivation.summaryPoint2')}{" "}
            <strong className="text-base font-bold text-yellow-500 sm:text-lg">
            {t('badges.gold')}
            </strong>{" "}
            {t('motivation.cardText')}
          </p>
        </section>

        <section className="mb-4 flex items-center space-x-4">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm">
          {t('motivation.summaryPoint1')} <strong> {t('motivation.range3')}</strong>  {t('motivation.summaryPoint2')}{" "}
            <strong className="text-base font-bold text-[#6a6969] sm:text-lg">
           {t('badges.diamond')}
            </strong>{" "}
            {t('motivation.cardText')}
          </p>
        </section>
      </div>
      <div className="flex items-center justify-center">
        <img src={about2}  alt={t('motivation.scoreIllustration')} className="w-70 h-80" />
      </div>
    </div>
  );
}

export default SummaryScore;
