import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GradeToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path; // Check active route

  return (
    <div className="w-full mx-auto mt-10">
    <div className="flex mb-20 border border-gray-300 rounded-full overflow-hidden w-[60%] mx-auto bg-[#F5F5F5]">
      <button
        onClick={() => navigate("/admin/gradeform")}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium rounded-full text-center transition-all ${
          isActive("/admin/gradeform")
            ? "bg-[#008394] text-white font-bold"
            : "bg-[#f4f4f4] text-[#008394] font-normal"
        }`}
      >
      <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            1
          </span>
        Add Grade
      </button>
      <button
        onClick={() => navigate("/admin/assigngrade")}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium rounded-full text-center transition-all ${
          isActive("/admin/assigngrade")
            ? "bg-[#008394] text-white font-bold"
            : "bg-[#f4f4f4] text-[#008394] font-normal"
        }`}
      >
      <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            2
          </span>
        Assign Grade
      </button>
    </div>
    </div>
  );
};

export default GradeToggle;
