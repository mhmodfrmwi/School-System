import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ActivityToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="mx-auto mt-10 w-full px-4 font-poppins">
      <div className="mx-auto mb-20 flex max-w-[90%] flex-wrap overflow-hidden rounded-full border border-gray-300 bg-[#F5F5F5] md:w-[60%] md:flex-nowrap">
        <button
          onClick={() => navigate("/teacher/school-hubs")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-center text-xs font-medium transition-all md:px-6 md:py-3 md:text-sm ${
            isActive("/teacher/school-hubs")
              ? "bg-[#008394] font-bold text-white dark:bg-DarkManager"
              : "bg-[#f4f4f4] font-normal text-[#008394] dark:text-DarkManager"
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-DarkManager dark:text-DarkManager">
            1
          </span>
          {t("activities.tabs.schoolHubs")}
        </button>
        <button
          onClick={() => navigate("/teacher/contests")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-center text-xs font-medium transition-all md:px-6 md:py-3 md:text-sm ${
            isActive("/teacher/contests")
              ? "bg-[#008394] font-bold text-white dark:bg-DarkManager"
              : "bg-[#f4f4f4] font-normal text-[#008394] dark:text-DarkManager"
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-DarkManager dark:text-DarkManager">
            2
          </span>
          {t("activities.tabs.contests")}
        </button>
      </div>
    </div>
  );
};

export default ActivityToggle;
