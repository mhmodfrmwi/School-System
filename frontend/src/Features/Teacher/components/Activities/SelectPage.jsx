import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ActivityToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full mx-auto mt-10 px-4">
      <div className="flex flex-wrap md:flex-nowrap mb-20 border border-gray-300 rounded-full overflow-hidden max-w-[90%] md:w-[60%] mx-auto bg-[#F5F5F5]">
        <button
          onClick={() => navigate("/teacher/school-hubs")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-full text-center transition-all ${
            isActive("/teacher/school-hubs")
              ? "bg-[#008394] text-white font-bold"
              : "bg-[#f4f4f4] text-[#008394] font-normal"
          }`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            1
          </span>
          School Hubs
        </button>
        <button
          onClick={() => navigate("/teacher/contests")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-full text-center transition-all ${
            isActive("/teacher/contests")
              ? "bg-[#008394] text-white font-bold"
              : "bg-[#f4f4f4] text-[#008394] font-normal"
          }`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            2
          </span>
          Contests
        </button>
      </div>
    </div>
  );
};

export default ActivityToggle;
