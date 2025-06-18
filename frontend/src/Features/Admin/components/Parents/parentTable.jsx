import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeParent,
  fetchParents,
  clearMessage,
} from "../AdminRedux/parentSlice";
import Pagination from "../Pagination";
import Header from "../Parents/parentHeader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as XLSX from 'xlsx';
const ParentTable = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    parents = [],
    message,
    loading,
  } = useSelector((state) => state.parents || {});
  const dispatch = useDispatch();
  const isRTL = i18n.language === "ar";

  console.log(parents);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchParents());
  }, [dispatch]);

  const filteredParents = parents.filter((parent) => {
    if (!searchText) return true;
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      if (filterOption === 'gender') {
        const genderText = parent.gender === 'M' ? t('genderOptions.male') : t('genderOptions.female');
        return genderText.toLowerCase().includes(lowerSearchText);
      }

      const fieldValue = String(parent[filterOption] || '').toLowerCase();
      return fieldValue.includes(lowerSearchText);
    }

    return (
      String(parent.fullName || '').toLowerCase().includes(lowerSearchText) ||
      String(parent.email || '').toLowerCase().includes(lowerSearchText) ||
      (parent.gender === 'M' ? t('genderOptions.male') : t('genderOptions.female')).toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedParents = filteredParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    if (window.confirm(t("parentTable.deleteConfirmation"))) {
      await dispatch(removeParent(id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (search) => {
    setSearchText(search);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter) => {
    setFilterOption(filter);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  }, [message, dispatch]);

  const handleEditClick = (id) => {
    navigate(`/admin/editparentform/${id}`);
  };

  const handleExportCSV = () => {

    const dataToExport = filteredParents.map(parent => ({
      [t("tableHeaders.name")]: parent.fullName,
      [t("tableHeaders.email")]: parent.email,
      [t("tableHeaders.gender")]: parent.gender === "M" ? t("genderOptions.male") : t("genderOptions.female"),
      [t("tableHeaders.children")]: parent.parentStudents && parent.parentStudents.length > 0
        ? parent.parentStudents
          .map(student => `${student.student_id?.fullName} (${student.student_id?.academic_number})`)
          .join(", ")
        : t("parentTable.noChildren")
    }));


    const ws = XLSX.utils.json_to_sheet(dataToExport);


    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parents");


    XLSX.writeFile(wb, "parents_export.xlsx");
  };

  if (loading) {
    return <div className="h-full w-full"></div>;
  }

  return (
    <div className="relative lg:px-0" dir={isRTL ? "rtl" : "ltr"}>
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onExportCSV={handleExportCSV}
      />

      <div className="mt-7">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-[#043B44]">
            <thead className="bg-[#117C90] text-white dark:bg-[#043B44]">
              <tr>
                <th
                  className={`px-3 py-2 text-${isRTL ? "right" : "left"} font-poppins text-xs font-medium sm:text-sm md:text-base`}
                >
                  {t("tableHeaders.name")}
                </th>
                <th
                  className={`px-3 py-2 text-${isRTL ? "right" : "left"} font-poppins text-xs font-medium sm:text-sm md:text-base`}
                >
                  {t("tableHeaders.email")}
                </th>
                <th
                  className={`px-3 py-2 text-${isRTL ? "right" : "left"} font-poppins text-xs font-medium sm:text-sm md:text-base`}
                >
                  {t("tableHeaders.gender")}
                </th>
                <th
                  className={`px-3 py-2 text-${isRTL ? "right" : "left"} font-poppins text-xs font-medium sm:text-sm md:text-base`}
                >
                  {t("tableHeaders.children")}
                </th>
                <th
                  className={`px-3 py-2 text-${isRTL ? "right" : "left"} font-poppins text-xs font-medium sm:text-sm md:text-base`}
                >
                  {t("tableHeaders.actions")}
                </th>
              </tr>
            </thead>
            <tbody className=" ">
              {paginatedParents.length > 0 ? (
                paginatedParents.map((parent, index) => (
                  <tr
                    key={parent._id || index}
                    className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:hover:bg-[#043B44]/70`}
                  >
                    <td className="flex items-center px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      <img
                        src={parent.profileImage}
                        alt="Profile"
                        className={`${isRTL ? "ml-2" : "mr-2"} h-8 w-8 rounded-full sm:h-10 sm:w-10`}
                      />
                      <span className="truncate font-poppins dark:text-black">
                        {parent.fullName}
                      </span>
                    </td>

                    <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      {parent.email}
                    </td>

                    <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      {parent.gender === "M"
                        ? t("genderOptions.male")
                        : t("genderOptions.female")}
                    </td>

                    <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      {parent.parentStudents &&
                        parent.parentStudents.length > 0 ? (
                        <div className="space-y-1">
                          {parent.parentStudents.map((student, i) => (
                            <div key={i} className="flex items-center">
                              <span className="truncate">
                                {student.student_id?.fullName} (
                                {student.student_id?.academic_number})
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">
                          {t("parentTable.noChildren")}
                        </span>
                      )}
                    </td>

                    <td
                      className={`px-3 py-2 text-xs sm:text-sm md:text-base ${isRTL ? "space-x-reverse" : ""} space-x-2`}
                    >
                      <button
                        aria-label="Edit parent"
                        onClick={() => handleEditClick(parent._id)}
                        className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                      >
                        <i className="far fa-edit text-lg" />
                      </button>
                      <button
                        aria-label="Delete parent"
                        onClick={() => handleDelete(parent._id)}
                        className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                      >
                        <i className="far fa-trash-alt text-lg" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="rounded-lg border-2 border-[#E3E8F1] bg-[#F7FAFC] py-28 text-center shadow-md"
                  >
                    <p className="text-lg font-semibold text-gray-600">
                      {t("parentTable.noParentsFound.title")}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {t("parentTable.noParentsFound.description")}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {paginatedParents.length > 0 ? (
          <div className="mt-7 flex justify-center lg:justify-end">
            <Pagination
              totalItems={filteredParents.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ParentTable;
