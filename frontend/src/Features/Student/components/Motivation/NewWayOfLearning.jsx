import React from "react";
import img4 from "../../../../assets/img4.png";
import img5 from "../../../../assets/img5.png";
import img6 from "../../../../assets/img6.png";
import img7 from "../../../../assets/img7.png";
import { useTranslation } from "react-i18next";

const NewWayOfLearning = () => {
  const { t ,i18n } = useTranslation();
  const cards = [
    {
      title: t("motivation.activitiesTitle"),
      description: t("motivation.activitiesDesc"),
      image: img4,
    },
    {
      title: t("motivation.weightTitle"),
      description: t("motivation.weightDesc"),
      image: img5,
    },
    {
      title: t("motivation.gradeTitle"),
      description: t("motivation.gradeDesc"),
      image: img7,
    },
    {
      title: t("motivation.timeTitle"),
      description: t("motivation.timeDesc"),
      image: img6,
    },
  ];

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="p-6 mt-6 grid grid-cols-1 pb-0 gap-6 items-center">
        <div>
          <button className="relative text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
            {t("motivation.newWayTitle")}
            <span className={`absolute bottom-[-9px] h-[4px] w-[85px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] ${
                i18n.language === 'ar' ? 'right-0' : 'left-0'
              }`}></span>
        
          </button>
          <p className={`mt-8 px-4 font-poppins text-lg font-medium text-gray-700 dark:text-gray-300 md:px-4 ${
  i18n.language === 'ar' ? 'md:text-right' : 'md:text-left'
}`}>
            {t("motivation.scoreFactors")}
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 p-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border-2 min-h-[330px] overflow-hidden hover:shadow-lg transition duration-300 dark:border-[#A3BFFA] dark:hover:shadow-none"
            style={{
              borderImage: "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
            }}
          >
            {/* Card Header */}
            <div className="bg-gray-200 dark:bg-[#281459] border-b-2 pb-12 border-[#919191] dark:border-[#A3BFFA] p-4 flex flex-col items-center">
              <img
                src={card.image}
                alt={card.title}
                className="h-20 w-20 mb-4 object-contain"
              />
              <h2 className="text-lg font-poppins font-bold text-[#db6a2d] dark:text-white text-center">
                {card.title}
              </h2>
            </div>

            {/* Card Description */}
            <div className="p-4 bg-white dark:bg-transparent">
              <p className={`mt-4 text-center font-poppins text-sm text-gray-600 dark:text-gray-300 ${
                i18n.language === 'ar' ? 'text-right' : 'text-left'
              }`}>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewWayOfLearning;