import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTeacher,
  fetchTeachers,
  clearMessage,
} from "../AdminRedux/teacherSlice";
import Pagination from "../Pagination";
import Header from "../Teachers/teacherHeader";

const TeacherTable = () => {
  const { teachers = [], message } = useSelector(
    (state) => state.teachers || {}
  );
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  // Fetch teachers on mount
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Filter teachers based on search and filter options
  const filteredTeachers = teachers.filter((teacher) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return (
        teacher[filterOption]?.toLowerCase().includes(lowerSearchText)
      );
    }
    return (
      teacher.name.toLowerCase().includes(lowerSearchText) ||
      teacher.email.toLowerCase().includes(lowerSearchText)
    );
  });

  // Paginate teachers based on current page
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete teacher
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
    if (confirmDelete) {
      try {
        await dispatch(removeTeacher(id)); 
        alert('Teacher deleted successfully');
      } catch (error) {
        console.error('Failed to delete Teacher:', error);
        alert('Error occurred while deleting');
      }
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (search) => {
    setSearchText(search);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };

  // Clear message after 5 seconds
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
                Name
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Subject
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Class
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Email
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Gender
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTeachers.length > 0 ? (
              paginatedTeachers.map((teacher, index) => (
                <tr
                  key={teacher._id || index}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                  <img
                      src={teacher.profileImage}
                      alt="Profile"
                      className="mr-2 h-8 rounded-full sm:h-10 md:h-12 md:w-12"
                    />
                    <span className="truncate font-poppins">{teacher.name}</span>
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.subject}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.classes}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.email}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.gender}
                  </td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit teacher"
                      onClick={() => {}}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete teacher"
                      onClick={() => handleDelete(teacher._id)}
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
                  colSpan="6"
                  className="rounded-lg bg-[#FFEBEB] py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                >
                  <span className="font-poppins">No Teachers Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredTeachers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherTable;
