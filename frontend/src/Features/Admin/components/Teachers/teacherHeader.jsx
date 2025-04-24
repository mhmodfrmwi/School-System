import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const TeacherHeader = ({ onSearchChange, onFilterChange }) => {
  const { t } = useTranslation();
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
          <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          {t("dashboardadmin.users.teachers")}
          </h1>
          <div className="mt-1 h-[3px] w-[80px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[120px]"></div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">
          <button className="rounded-md px-4 py-2 font-poppins text-xs text-[#244856] transition hover:bg-[#117C90] hover:text-white dark:hover:bg-[#043B44] sm:text-sm">
          {t("Header.exportCSV")}
          </button>

          <NavLink
            to="/admin/teacherform"
            className="rounded-md bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] dark:bg-[#043B44] sm:text-sm"
          >
             {t("teacherHeader.add")}
          </NavLink>
        </div>
      </div>

      <div className="flex w-full flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative w-full sm:w-auto">
          <select
            onChange={handleFilterChange}
            value={selectedFilter}
            className="w-full rounded-md border bg-white px-3 py-2 font-poppins text-xs text-[#244856] focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:focus:ring-[#043B44] sm:w-auto sm:text-sm"
          >
            <option value="" className="font-poppins">
            {t("Header.selectFilter")}
            </option>
            <option value="name" className="font-poppins">
            {t("Header.filterOptions.name")}
            </option>
            <option value="email" className="font-poppins">
            {t("Header.filterOptions.email")}
            </option>
            <option value="subject" className="font-poppins">
            {t("Header.filterOptions.subject")}
            </option>
            <option value="gender" className="font-poppins">
            {t("Header.filterOptions.gender")}
            </option>
          </select>
        </div>

        <div className="relative flex-grow">
          <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 transform text-xs text-black dark:text-white sm:text-sm"></i>
          <input
            type="text"
            placeholder={t("teacherHeader.searchPlaceholder")}
            className="#043B44 w-full rounded-md bg-[#FCFAFA] px-3 py-2 pl-10 font-poppins text-xs text-black focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#043B44] dark:text-white dark:placeholder-white dark:focus:ring-[#043B44] sm:text-sm"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherHeader;
