import aboutScore from "../../../../assets/aboutScore.png";
import { useTranslation } from 'react-i18next';

const AboutScore = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6  mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      <div>
        <button className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
          {t('motivation.aboutScore')}
        </button>
        <p className="ms-1 w-24 rounded-xl mb-4 border-t-4 border-[#BC6FFB]"></p>
        <h3 className="text-xl font-poppins font-semibold mb-2">{t('motivation.newWayTitle')}</h3>
        <p className="text-gray-700 font-poppins mb-4">
          {t('motivation.newWayDesc')}
        </p>
        <h3 className="text-xl font-poppins font-semibold mb-2">{t('motivation.whyTitle')}</h3>
        <p className="text-gray-700 font-poppins font-medium">
          <br />
          {t('motivation.whyDesc')}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img
          src={aboutScore}
          alt={t('motivation.scoreIllustration')}
          className="w-60 h-75 "
        />
      </div>
    </div>
  );
};
export default AboutScore;  