import React from "react";
import { useNavigate } from "react-router-dom";
import librarybg from "../../../../assets/librarybg.png";
import { useTranslation } from 'react-i18next';
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

const LibraryPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>
    <div className="w-[90%] mx-auto min-h-screen flex flex-col items-center font-poppins mt-12 pt-12">

      {/* Header */}
      <h2 className="text-2xl text-center md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative z-10">
        {t('library.title')}
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-33px] w-[50%] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
      </h2>

      {/* Image */}
      <div className="mt-0 w-full h-[300px] flex justify-center items-center border rounded-lg border-[#BC6FFB] dark:border-[#AE45FB] relative z-10">
        <img
          src={librarybg}
          alt="Library"
          className="h-[80%] object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-wrap justify-center mt-8 w-full px-4 mb-12 relative z-10">
        {/* Books Section */}
        <div
          className="border p-8 w-full sm:w-[80%] md:w-[48%] h-[250px] flex items-center justify-center text-center cursor-pointer rounded-2xl border-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] transition-all transform hover:scale-105 hover:translate-y-2 mx-auto mt-4"
          onClick={() => handleNavigate("/student/librarybooks")}
        >
          <span className="text-[3rem] font-bold text-white gradient-stroke dark:gradient-stroke-dark">
            {t('library.books')}
          </span>
        </div>

        {/* Videos Section */}
        <div
          className="border p-8 w-full sm:w-[80%] md:w-[48%] h-[250px] flex items-center justify-center text-center cursor-pointer rounded-2xl border-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] transition-all transform hover:scale-105 hover:translate-y-2 mx-auto mt-4"
          onClick={() => handleNavigate("/student/libraryvideos")}
        >
          <span className="text-[3rem] font-bold text-white gradient-stroke dark:gradient-stroke-dark">
            {t('library.videos')}
          </span>
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .gradient-stroke {
            -webkit-text-stroke: 4px transparent;
            background-image: linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB);
            background-clip: text;
            -webkit-background-clip: text;
          }
          .gradient-stroke-dark {
            -webkit-text-stroke: 4px transparent;
            background-image: linear-gradient(to right, #CE4EA0, #BF4ACB, #AE45FB);
            background-clip: text;
            -webkit-background-clip: text;
          }
        `}
      </style>
    </div>
    </div>
  );
};

export default LibraryPage;