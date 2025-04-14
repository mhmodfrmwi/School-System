import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CourseToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const { t } = useTranslation();

  return (
    <div className="w-full mx-auto mt-10 px-4">
      <div className="flex flex-wrap md:flex-nowrap mb-20 border border-gray-300 rounded-full overflow-hidden max-w-[90%] md:w-[60%] mx-auto bg-[#F5F5F5]">
        <button
          onClick={() => navigate("/teacher/currentcourse")}
          className={`flex-1 flex items-center font-poppins justify-center gap-2 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-full text-center transition-all ${
            isActive("/teacher/currentcourse")
              ? "bg-[#008394] text-white font-bold"
              : "bg-[#f4f4f4] text-[#008394] font-normal"
          }`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            1
          </span>
          {t('coursest.CurrentCourse')}
        </button>
        <button
          onClick={() => navigate("/teacher/allcourses")}
          className={`flex-1 flex items-center font-poppins justify-center gap-2 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-full text-center transition-all ${
            isActive("/teacher/allcourses")
              ? "bg-[#008394] text-white font-bold"
              : "bg-[#f4f4f4] text-[#008394] font-normal"
          }`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            2
          </span>
          {t('coursest.AllCourses')}
        </button>
      </div>
    </div>
  );
};

export default CourseToggle;
