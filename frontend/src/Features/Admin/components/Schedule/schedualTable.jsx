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

const SchedualTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    schedules = [],
    message,
    loading,
  } = useSelector((state) => state.schedules || {});
  const { teachers = [] } = useSelector((state) => state.teachers || {});

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
      "Are you sure you want to delete this schedule?",
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
    return teacher ? teacher.fullName : "Unknown Teacher";
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
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Subject Name
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Teacher
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Grade
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Day
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  From
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  To
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Actions
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
                        : "Unknown Teacher"}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.grade_id?.gradeName || "No grade"}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.day_of_week || "No day"}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.start_time || "No start time"}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {schedule?.end_time || "No end time"}
                    </td>
                    <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                      <button
                        aria-label="Edit schedule"
                        onClick={() => handleEdit(schedule?._id)}
                        className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                      >
                        <i className="far fa-edit text-lg" />
                      </button>
                      <button
                        aria-label="Delete schedule"
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
                      No Schedules Found
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      It seems like there are no schedules in the database at
                      the moment.
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
