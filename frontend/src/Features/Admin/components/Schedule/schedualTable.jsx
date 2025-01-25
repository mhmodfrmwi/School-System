import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchScheduals,
  removeSchedual,
  clearMessage,
} from "../AdminRedux/scheduleSlice";
import { fetchTeachers } from "../AdminRedux/teacherSlice"; // Import fetchTeachers
import Pagination from "../Pagination";
import Header from "./scheduleHeader";

const SchedualTable = () => {
  const dispatch = useDispatch();
  const { scheduals = [], message } = useSelector((state) => state.schedule || {});
  const { teachers = [] } = useSelector((state) => state.teachers || {}); // Access teachers from Redux

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchScheduals());
    dispatch(fetchTeachers()); // Fetch teachers when the component mounts
  }, [dispatch]);

  const filteredScheduals = scheduals.filter((schedule) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return schedule[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      schedule.subjectName.toLowerCase().includes(lowerSearchText) ||
      schedule.teacher.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedScheduals = filteredScheduals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this schedule?');
    if (confirmDelete) {
      try {
        await dispatch(removeSchedual(id));
        alert('Schedule deleted successfully');
      } catch (error) {
        console.error('Failed to delete schedule:', error);
        alert('Error occurred while deleting');
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

  // Function to get teacher's name based on the teacher ID
  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((t) => t._id === teacherId);
    return teacher ? teacher.name : "Unknown Teacher";
  };

  return (
    <div className="mx-auto px-4 lg:px-0">
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      {message && (
        <div className="mb-4 mt-6 rounded-lg border-l-4 border-green-500 bg-green-100 p-3 text-green-800 shadow-md">
          {message}
        </div>
      )}

      <div className="mt-7">
        <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
          <thead className="bg-[#117C90]  text-white ">
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
                  key={schedule._id}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {schedule.subjectName}
                  </td>
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {getTeacherName(schedule.teacher)} {/* Display teacher's name */}
                  </td>
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {schedule.grade}
                  </td>
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {schedule.day} 
                  </td>
                  
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {schedule.from}
                  </td>
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {schedule.to}
                  </td>
                  <td className="space-x-2 px-3  py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit schedule"
                      onClick={() => {}}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete schedule"
                      onClick={() => handleDelete(schedule._id)}
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
                  className="rounded-lg bg-[#FFEBEB]   py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                >
                  <span className="font-poppins">No Schedules Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredScheduals.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedualTable;
