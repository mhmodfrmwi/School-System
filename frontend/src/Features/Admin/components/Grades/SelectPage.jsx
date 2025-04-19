import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const GradeToggle = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mx-auto mt-10 w-full px-4">
      <div className="mx-auto mb-20 flex max-w-[90%] flex-wrap overflow-hidden rounded-full border border-gray-300 bg-[#F5F5F5] md:w-[60%] md:flex-nowrap">
        <button
          onClick={() => navigate("/admin/gradeform")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-center text-xs font-medium transition-all md:px-6 md:py-3 md:text-sm ${
            isActive("/admin/gradeform")
              ? "bg-[#008394] font-bold text-white dark:bg-[#043B44]"
              : "bg-[#f4f4f4] font-normal text-[#008394] dark:text-[#043B44]"
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-[#043B44] dark:text-[#043B44]">
            1
          </span>
          {t("grade.toggle.add")}
        </button>
        <button
          onClick={() => navigate("/admin/assigngrade")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-center text-xs font-medium transition-all md:px-6 md:py-3 md:text-sm ${
            isActive("/admin/assigngrade")
              ? "bg-[#008394] font-bold text-white dark:bg-[#043B44]"
              : "bg-[#f4f4f4] font-normal text-[#008394] dark:text-[#043B44]"
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-[#043B44] dark:text-[#043B44]">
            2
          </span>
          {t("grade.toggle.assign")}
        </button>
      </div>
    </div>
  );
};

export default GradeToggle;
