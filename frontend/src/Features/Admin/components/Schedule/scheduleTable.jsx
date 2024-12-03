import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSchedules,
  clearMessage,
} from "../AdminRedux/scheduleSlice";
import Pagination from "../Pagination";
import Header from "../Schedule/scheduleHeader";

const ScheduleTable = () => {
  const { schedules = [], message } = useSelector((state) => state.schedules || {});
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [setShowConfirm] = useState(false);
  const [setSelectedScheduleId] = useState(null);

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const filteredSchedules = schedules.filter((schedule) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return schedule[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      schedule.subjectName.toLowerCase().includes(lowerSearchText) ||
      schedule.teacher.toLowerCase().includes(lowerSearchText) ||
      schedule.grade.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedSchedules = filteredSchedules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setSelectedScheduleId(id);
    setShowConfirm(true);
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
        <table className="w-full table-auto border-collapse rounded-2xl bg-[#FBE9D1]">
          <thead className="bg-[#FFFFFF] text-black shadow-md shadow-[#117C90]">
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
                Class Name
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedSchedules.length > 0 ? (
              paginatedSchedules.map((schedule, index) => (
                <tr key={schedule.id} className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}>
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                    <span className="truncate font-poppins">{schedule.subjectName}</span>
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{schedule.teacher}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{schedule.grade}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{schedule.day}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{schedule.from}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{schedule.to}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{schedule.className}</td> {/* Added Class Name */}
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit schedule"
                      onClick={() => {}}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete schedule"
                      onClick={() => handleDelete(schedule.id)}
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
                  colSpan="8"
                  className="rounded-lg bg-[#FFEBEB] py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                >
                  <span className="font-poppins">No Schedules Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredSchedules.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
