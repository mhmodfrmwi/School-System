import React, { useEffect } from "react";
import Frame from "../../../../assets/Frame.png";
import ScheduleIcon from "../../../../assets/ScheduleIcon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReward,
  getSemesterReward,
} from "../StudentRedux/motivationSlice";
import { useTranslation } from "react-i18next";

function HeaderInfo() {
  const { t ,i18n} = useTranslation();
  const dispatch = useDispatch();
  const { reward, semesterReward } = useSelector((state) => state.motivation);

  useEffect(() => {
    dispatch(getAllReward());
    dispatch(getSemesterReward());
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <div className="mt-4 flex w-[97%] items-center justify-between rounded-2xl bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding dark:bg-[#312A5E] p-6 shadow-lg dark:shadow-gray-900">
        {/* Profile image and details on the left */}
        <div className={`flex items-center ${i18n.language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <img
            src={Frame}
            className="h-24 w-24 md:h-32 md:w-32"
            alt={t("motivation.profileFrame")}
          />
          <div className="flex flex-col">
            <h1
              className={`font-poppins text-xl font-semibold md:text-2xl ${
                semesterReward.badge === "Green"
                  ? "text-green-700 dark:text-green-400"
                  : semesterReward.badge === "Diamond"
                  ? "text-[#6a6969] dark:text-[#A3BFFA]"
                  : semesterReward.badge === "Gold"
                  ? "text-yellow-500 dark:text-yellow-400"
                  : "text-green-700 dark:text-green-400"
              }`}
            >
              {semesterReward.badge ? semesterReward.badge : t("badges.green")}
            </h1>
            <div className={`flex items-center ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <img
              src={ScheduleIcon}
              className="h-6 w-6"
              alt={t("motivation.scheduleIcon")}
            />
            <p className={`mt-1 text-3xl text-white dark:text-white ${i18n.language === 'ar' ? 'mr-2' : 'ml-2'}`}>
              {semesterReward.totalSemesterPoints}
            </p>
          </div>
        </div>
        </div>

        {/* Circular content on the most right */}
        <div
          className={`flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 text-gray-800 shadow-md md:h-36 md:w-36 ${
            reward.badges === "Green"
              ? "border-green-500 dark:border-green-400"
              : reward.badges === "Diamond"
              ? "border-[#6a6969] dark:border-[#A3BFFA]"
              : reward.badges === "Gold"
              ? "border-yellow-500 dark:border-yellow-400"
              : "border-green-500 dark:border-green-400"
          }`}
        >
          <p
            className={`font-poppins text-lg font-bold md:text-xl ${
              reward.badges === "Green"
                ? "text-green-700 dark:text-green-400"
                : reward.badges === "Diamond"
                ? "text-[#6a6969] dark:text-[#A3BFFA]"
                : reward.badges === "Gold"
                ? "text-yellow-500 dark:text-yellow-400"
                : "text-green-700 dark:text-green-400"
            }`}
          >
            {t("motivation.score")}
          </p>
          <p
            className={`font-poppins text-xs md:text-sm ${
              reward.badges === "Green"
                ? "text-green-700 dark:text-green-400"
                : reward.badges === "Diamond"
                ? "text-[#6a6969] dark:text-[#A3BFFA]"
                : reward.badges === "Gold"
                ? "text-yellow-500 dark:text-yellow-400"
                : "text-green-700 dark:text-green-400"
            }`}
          >
            {t("motivation.forAllSemesters")}
          </p>
          <p className="text-2xl font-extrabold text-white dark:text-white md:text-3xl">
            {reward.totalPoints}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeaderInfo;