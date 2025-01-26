import React from "react";
import { NavLink } from "react-router-dom";

const TermHeader = () => {
  return (
    <div className="mx-auto px-4 md:px-6 lg:px-0 w-4/5">
      <div className="space-y-2 mb-4 flex flex-row gap-2  justify-between items-center sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
        <div className="flex flex-col">
          <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
            Terms
          </h1>
          <div className="mt-1 h-[3px] w-[80px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[80px]"></div>
        </div>

        <div className="flex items-center gap-2 sm:flex-nowrap sm:gap-4">
          <NavLink
            to="/admin/termform"
            className="flex items-center rounded-md bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
          >
          <i className="fa fa-plus mr-2 sm:hidden"></i>
          <span className="hidden sm:block">Add Term</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TermHeader;
