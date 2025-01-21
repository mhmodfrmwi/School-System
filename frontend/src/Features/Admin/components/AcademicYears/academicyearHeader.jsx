import React from "react";
import { NavLink } from "react-router-dom";

const AcademicYearHeader = () => {
  return (
    <div className="mx-auto px-4 md:px-6 lg:px-0">
      <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
            All Years
          </h1>
          <div className="mt-1 h-[3px] w-[80px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[120px]"></div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">
          <NavLink
            to="/admin/academicyearform"
            className="flex items-center rounded-md bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
          >
            <i className="fa fa-plus mr-2"></i> Add Year
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default  AcademicYearHeader ;