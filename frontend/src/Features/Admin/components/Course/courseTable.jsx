import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../AdminRedux/parentSlice";
import Pagination from "../Pagination";
import Header from "./courseHeader";
import { fetchCourses, removeCourse } from "../AdminRedux/courseSlice";

const CourseTable = () => {
  const { courses = [], message } = useSelector((state) => state.courses || {});
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter((course) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return course[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      course.name.toLowerCase().includes(lowerSearchText) ||
      course.email.toLowerCase().includes(lowerSearchText) ||
      course.studentName?.toLowerCase().includes(lowerSearchText)
    );
  });

  // console.log('Filtered Parents:', filteredParents);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    setSelectedCourseId(id);
    // setShowConfirm(true);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );
    if (confirmDelete) {
      try {
        await dispatch(removeCourse(id));
        alert("course deleted successfully");
      } catch (error) {
        console.error("Failed to delete course:", error);
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
                Grade
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                term
              </th>

              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course, index) => (
                <tr
                  key={course._id || index}
                  className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                >
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                    <span className="truncate font-poppins">{course.name}</span>
                  </td>

                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {course.grade}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {course.term}
                  </td>

                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit parent"
                      onClick={() => {}}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete parent"
                      onClick={() => handleDelete(course._id)}
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
                  className="rounded-lg bg-[#FFEBEB] py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                >
                  <span className="font-poppins">No courses Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredCourses.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
