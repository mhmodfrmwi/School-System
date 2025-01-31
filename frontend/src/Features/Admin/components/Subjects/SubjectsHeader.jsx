import React from "react";
import { NavLink } from "react-router-dom";

const SubjectsHeader = () => {
  return (
    <div className="mx-auto w-[90%]">
    <div className="space-y-2 mb-4 flex flex-row justify-between items-center sm:space-y-0 lg:mb-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-poppins font-semibold text-[#244856] ">
            Subjects
            </h1>
          <div className="mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856]"></div>
        </div>

        <div className="flex items-center gap-1">
          <NavLink
            to="/admin/addsubject" 
            className="flex items-center rounded-md bg-[#117C90] px-4 py-2 font-poppins text-sm text-white transition hover:bg-[#0E6B7A]"
          >
            <span className="block">Add Subject</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SubjectsHeader;
