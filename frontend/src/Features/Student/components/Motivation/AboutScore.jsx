import aboutScore from "../../../../assets/aboutScore.png";
import { useTranslation } from "react-i18next";

const AboutScore = () => {
  const { t,i18n } = useTranslation();
  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className=" p-6 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center ">
      <div className={i18n.language === 'ar' ? 'text-right' : 'text-left'}>
        <button className="relative text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
          {t("motivation.aboutScore")}
          <span className={`absolute bottom-[-9px] h-[4px] w-[85px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] ${
            i18n.language === 'ar' ? 'right-0' : 'left-0'
          }`}></span>
        </button>
        <h3 className="text-xl font-poppins font-semibold mb-2 text-gray-800 dark:text-white mt-8 ml-4">
          {t("motivation.newWayTitle")}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 font-poppins mb-4 ml-4">
          {t("motivation.newWayDesc")}
        </p>
        <h3 className="text-xl font-poppins font-semibold mb-2 text-gray-800 dark:text-white ml-4">
          {t("motivation.whyTitle")}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 font-poppins font-medium mb-4 ml-4">
          <br />
          {t("motivation.whyDesc")}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img
          src={aboutScore}
          alt={t("motivation.scoreIllustration")}
          className="w-60 h-75"
        />
      </div>
    </div>
  );
};

export default AboutScore;