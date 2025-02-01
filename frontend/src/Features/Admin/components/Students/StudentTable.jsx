import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeStudent,
  fetchStudents,
  clearMessage,
} from "../AdminRedux/studentSlice";
import Pagination from "../Pagination";
import Header from "./studentHeader";
import { useNavigate } from "react-router-dom";

const StudentTable = () => {
  const { students, message } = useSelector((state) => state.students);
  const { classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = students.length;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    console.log(fetchStudents);
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = students.filter((student) => {
    const lowerSearchText = searchText.toLowerCase();

    // Check for required properties to avoid runtime errors
    if (!student.gender || !student.FullName || !student.email) {
      return false;
    }

    if (!filterOption || filterOption === "") {
      return (
        student.name.toLowerCase().includes(lowerSearchText) ||
        student.email.toLowerCase().includes(lowerSearchText)
      );
    }

    if (filterOption === "fullName") {
      return student.name.toLowerCase().includes(lowerSearchText);
    }
    if (filterOption === "class") {
      return (
        student.class && student.class.toLowerCase().includes(lowerSearchText)
      );
    }
    if (filterOption === "gender") {
      return (
        student.gender && student.gender.toLowerCase().includes(lowerSearchText)
      );
    }

    return false;
  });

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      await dispatch(removeStudent(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-student/${id}`);
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
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90]">
            <thead className="bg-[#117C90] text-white">
              <tr>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Name
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Student ID
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Email
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Class
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Gender
                </th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="relative">
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                  >
                    <td className="flex items-center px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      <img
                        src={student.profileImage}
                        alt="Profile"
                        className="mr-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
                      />
                      {student.FullName}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {student.academic_number}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {student.email}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {student.classId.className}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                      {student.gender}
                    </td>
                    <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                      <button
                        onClick={() => handleEdit(student._id)}
                        className="text-[#117C90] transition hover:text-[#244856]"
                      >
                        <i className="far fa-edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="text-[#E74833] transition hover:text-[#244856]"
                      >
                        <i className="far fa-trash-alt" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                  >
                    No Students Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
