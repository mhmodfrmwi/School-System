import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeStudent,
  fetchStudents,
  clearMessage,
} from "./AdminRedux/studentSlice";
import Pagination from "./Pagination";
import Header from "../components/Header";

const StudentTable = () => {
  const { students, message } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  console.log(students);

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

    if (!filterOption || filterOption === "") {
      return (
        student.name.toLowerCase().includes(lowerSearchText) ||
        student.email.toLowerCase().includes(lowerSearchText)
      );
    }

    if (filterOption === "name") {
      return student.name.toLowerCase().includes(lowerSearchText);
    }
    if (filterOption === "class") {
      return student.class.toLowerCase().includes(lowerSearchText);
    }
    if (filterOption === "gender") {
      return student.gender.toLowerCase().includes(lowerSearchText);
    }

    return false;
  });

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );
    if (isConfirmed) {
      dispatch(removeStudent(id));
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
          <tbody className=" ">
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                    <img
                      src={student.image}
                      alt="Profile"
                      className="mr-2 h-8 rounded-full sm:h-10 md:h-12 md:w-12"
                    />
                    <span className="truncate font-poppins">
                      {student.name}
                    </span>
                  </td>
                  <td className="max-w-4 truncate px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {student.studentID}
                  </td>
                  <td className="truncate px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {student.email}
                  </td>
                  <td className="truncate px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {student.class}
                  </td>
                  <td className="truncate px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {student.gender}
                  </td>
                  <td className="space-x-2 px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    <button
                      onClick={() => {}}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit" style={{ fontSize: "16px" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                    >
                      <i
                        className="far fa-trash-alt"
                        style={{ fontSize: "16px" }}
                      />
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
                  <span className="font-poppins">No Students Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

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
