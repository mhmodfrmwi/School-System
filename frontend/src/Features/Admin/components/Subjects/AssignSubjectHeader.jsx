import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SubjectHeader = ({ onSearchChange, onFilterChange }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="mx-auto px-0">
      <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-poppins font-semibold text-[#244856]">
            Subjects
          </h1>
          <div className="mt-1 h-[4px] w-[95px] rounded-t-md bg-[#244856]"></div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">
          <button className="rounded-md px-4 py-2 font-poppins text-sm text-[#244856] transition hover:bg-[#117C90] hover:text-white">
            Export CSV
          </button>

          <NavLink
            to="/admin/addsubject"
            className="rounded-md bg-[#117C90] px-4 py-2 font-poppins text-sm text-white transition hover:bg-[#0E6B7A]"
          >
            Add Subject
          </NavLink>
        </div>
      </div>

      <div className="flex w-full flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative w-full sm:w-auto">
          <select
            onChange={handleFilterChange}
            value={selectedFilter}
            className="w-full rounded-md border bg-white px-3 py-2 font-poppins text-sm text-[#244856] focus:outline-none focus:ring-2 focus:ring-[#117C90] sm:w-auto"
          >
            <option value="" className="font-poppins">Select Filter</option>
            <option value="term" className="font-poppins">Term</option>
            <option value="gradeName" className="font-poppins">Grade</option>
          </select>
        </div>

        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by term or grade"
            className="w-full rounded-md bg-[#FCFAFA] px-3 py-2 pl-10 font-poppins text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectHeader;
