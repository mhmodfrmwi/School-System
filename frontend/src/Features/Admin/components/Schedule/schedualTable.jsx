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
    message
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
      const filterValue = schedule?.[filterOption] || "";
      return filterValue.toLowerCase().includes(lowerSearchText);
    }
    return (
      (schedule?.subjectName || "").toLowerCase().includes(lowerSearchText) ||
      (schedule?.teacher || "").toLowerCase().includes(lowerSearchText)
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
        alert("Schedule deleted successfully");
      } catch (error) {
        console.error("Failed to delete schedule:", error);
        alert("Error occurred while deleting");
      }
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

  return (
    <div className="relative mx-auto px-4 lg:px-0">
      
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <div className="mt-7">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90]">
            <thead className="bg-[#117C90] text-white">
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
                    } hover:bg-[#117C90]/70`}
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
                        className="text-[#117C90] transition duration-300 hover:text-[#244856]"
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
                    className="rounded-lg bg-[#FFEBEB] py-28 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                  >
                    <span className="font-poppins">No Schedules Found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
{paginatedScheduals.length > 0 ?(
  

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredScheduals.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
):null}
      </div>
    </div>
  );
};

export default SchedualTable;
