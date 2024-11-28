import React, { useState } from "react";

const Header = ({ onSearchChange, onFilterChange }) => {
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
    <div className="max-w-full px-4 md:px-6 lg:px-0 lg:w-[1000px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 space-y-2 sm:space-y-0">
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#244856]">
            Students
          </h1>
          <div className="mt-1 w-[80px] lg:w-[120px] h-[3px] lg:h-[4px] bg-[#244856] rounded-t-md"></div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
          <button className="text-[#244856] text-xs sm:text-sm py-2 px-4 hover:bg-[#117C90] hover:text-white rounded-md transition">
            Export CSV
          </button>
          <button className="bg-[#117C90] text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-[#0E6B7A] transition">
            Add Student
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full">
        <div className="relative w-full sm:w-auto">
          <select
            onChange={handleFilterChange}
            value={selectedFilter}
            className="text-[#244856] bg-white px-3 py-2 w-full sm:w-auto rounded-md border focus:outline-none focus:ring-2 focus:ring-[#117C90] text-xs sm:text-sm"
          >
            <option value="">Select Filter</option>
            <option value="name">Name</option>
            <option value="class">Class</option>
            <option value="gender">Gender</option>
          </select>
        </div>

        <div className="relative flex-grow">
          <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xs sm:text-sm"></i>
          <input
            type="text"
            placeholder="Search for a student by name or email"
            className="w-full px-3 py-2 bg-[#117C90] text-white rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-[#117C90] text-xs sm:text-sm"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
