import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeStudent,
  fetchStudents,
  clearMessage,
} from "../AdminRedux/studentSlice";
import Pagination from "../Pagination";
import Header from "./studentHeader";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const StudentTable = () => {
  const { students, message, loading } = useSelector((state) => state.students);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = students.length;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = students.filter((student) => {
    const lowerSearchText = searchText.toLowerCase();

    // Check if student is valid before accessing its properties
    if (!student) return false;

    // Filter by fullName or email if no filter option is selected
    if (!filterOption || filterOption === "") {
      return (
        student.fullName.toLowerCase().includes(lowerSearchText) ||
        student.email.toLowerCase().includes(lowerSearchText)
      );
    }

    // Filter by specific field if a filter option is selected
    if (filterOption === "fullName") {
      return student.fullName.toLowerCase().includes(lowerSearchText);
    }
    if (filterOption === "class") {
      return student.classId?.className
        ?.toLowerCase()
        .includes(lowerSearchText);
    }
    if (filterOption === "gender") {
      return student.gender?.toLowerCase().includes(lowerSearchText);
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

  const handleExportCSV = () => {
    const csvData = students.map((student) => ({
      "Student ID": student.academic_number,
      Name: student.fullName,
      Gender: student.gender,
      "Date of Birth": student.dateOfBirth,
      Grade: student.gradeId?.gradeName || "N/A",
      Class: student.classId?.className || "N/A",
      Email: student.email,
      Phone: student.phone,
      Address: student.address,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative mx-auto px-4 lg:px-0">
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onExportCSV={handleExportCSV}
      />
      {/* {message && (
        <div className="mb-4 mt-6 rounded-lg border-l-4 border-green-500 bg-green-100 p-3 text-green-800 shadow-md">
          {message}
        </div>
      )} */}
      <div className="mt-7">
        {/* Loading state check */}
        {loading ? (
          <div className="h-full w-full"></div> // Show loading text or spinner
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-[#043B44]">
              <thead className="bg-[#117C90] text-white dark:bg-[#043B44]">
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
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className={`${
                        index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                      } hover:bg-[#117C90]/70 dark:hover:bg-[#043B44]/70`}
                    >
                      <td className="flex items-center px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                        <img
                          src={student.profileImage}
                          alt="Profile"
                          className="mr-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
                        />
                        {student.fullName}
                      </td>
                      <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                        {student.academic_number}
                      </td>
                      <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                        {student.email}
                      </td>
                      <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                        {student.classId.className}
                      </td>
                      <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
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
                      className="rounded-lg border-2 border-[#E3E8F1] bg-[#F7FAFC] py-28 text-center shadow-md"
                    >
                      <p className="text-lg font-semibold text-gray-600">
                        No Students Found
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        It seems like there are no students in the database at
                        the moment.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination only shows when students are found */}
        {paginatedStudents.length > 0 && !loading && (
          <div className="mt-7 flex justify-center lg:justify-end">
            <Pagination
              totalItems={totalItems}
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

export default StudentTable;
