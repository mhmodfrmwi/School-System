import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchScheduals,
  removeSchedual,
  clearMessage,
} from "../AdminRedux/scheduleSlice";
import { fetchTeachers } from "../AdminRedux/teacherSlice";
import Pagination from "../Pagination";
import Header from "./scheduleHeader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const SchedualTable = () => {
  const { t ,i18n} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    schedules = [],
    message,
    loading,
  } = useSelector((state) => state.schedules || {});
  const { teachers = [] } = useSelector((state) => state.teachers || {});
  const isRTL = i18n.language === 'ar';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchScheduals());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const filteredScheduals = schedules.filter((schedule) => {
    const lowerSearchText = searchText.toLowerCase();

    if (filterOption) {
      let filterValue = "";

      if (filterOption === "subject") {
        filterValue = schedule.subject_id?.subjectName || "";
      } else if (filterOption === "day") {
        filterValue = schedule.day_of_week || "";
      } else if (filterOption === "time") {
        filterValue = `${schedule.start_time} - ${schedule.end_time}`;
      }

      return filterValue.toLowerCase().includes(lowerSearchText);
    }

    // Default search if no filter is selected
    return (
      (schedule.subject_id?.subjectName || "")
        .toLowerCase()
        .includes(lowerSearchText) ||
      (schedule.teacher_id?.fullName || "")
        .toLowerCase()
        .includes(lowerSearchText) ||
      (schedule.day_of_week || "").toLowerCase().includes(lowerSearchText) ||
      (schedule.start_time || "").toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedScheduals = filteredScheduals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      t("schedule.table.deleteConfirm"),
    );
    if (confirmDelete) {
      try {
        await dispatch(removeSchedual(id));
      } catch (error) {}
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (search) => {
    setSearchText(search);
  };

  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  }, [message, dispatch]);

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((t) => t._id === teacherId);
    return teacher ? teacher.fullName : t("scheduleAdmin.table.unknownTeacher");
  };

  const handleEdit = (scheduleId) => {
    navigate(`/admin/edit-schedule/${scheduleId}`);
  };

  if (loading) {
    return <div className="h-full w-full"></div>; // Empty div during loading
  }
  return (
    <div className="relative mx-auto px-4 lg:px-0">
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <div className="mt-7">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-[#043B44]">
            <thead className="bg-[#117C90] text-white dark:bg-[#043B44]">
              <tr>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("scheduleAdmin.table.columns.subject")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("scheduleAdmin.table.columns.teacher")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("scheduleAdmin.table.columns.grade")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("scheduleAdmin.table.columns.day")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("scheduleAdmin.table.columns.from")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("scheduleAdmin.table.columns.to")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("scheduleAdmin.table.columns.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedScheduals.length > 0 ? (
                paginatedScheduals.map((schedule, index) => (
                  <tr
                    key={schedule?._id || index} // Fallback for missing `_id`
                    className={`${
                      index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                    } hover:bg-[#117C90]/70 dark:text-black dark:hover:bg-[#043B44]/70`}
                  >
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule.subject_id?.subjectName}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.teacher_id
                        ? getTeacherName(schedule.teacher_id._id)
                        : t("scheduleAdmin.table.unknownTeacher")}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.grade_id?.gradeName ||t("scheduleAdmin.table.noGrade")}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.day_of_week ||  t("scheduleAdmin.table.noDay")}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.start_time ||  t("scheduleAdmin.table.noStartTime")}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.end_time ||  t("scheduleAdmin.table.noEndTime")}
                    </td>
                    <td className={`px-3 py-2 text-xs sm:text-sm md:text-base ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                      <button
                        aria-label={t("sscheduleAdminchedule.table.editAriaLabel")}
                        onClick={() => handleEdit(schedule?._id)}
                        className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                      >
                        <i className="far fa-edit text-lg" />
                      </button>
                      <button
                        aria-label={t("scheduleAdmin.table.deleteAriaLabel")}
                        onClick={() => handleDelete(schedule?._id)}
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
                    colSpan="7"
                    className="rounded-lg border-2 border-[#E3E8F1] bg-[#F7FAFC] py-28 text-center shadow-md"
                  >
                    <p className="text-lg font-semibold text-gray-600">
                    {t("scheduleAdmin.table.noData.title")}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                    {t("scheduleAdmin.table.noData.message")}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {paginatedScheduals.length > 0 && (
          <div className="mt-7 flex justify-center lg:justify-end">
            <Pagination
              totalItems={filteredScheduals.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedualTable;
