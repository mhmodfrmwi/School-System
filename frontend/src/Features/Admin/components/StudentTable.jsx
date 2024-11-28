import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeStudent, fetchStudents, clearMessage } from "../studentSlice";
import Pagination from "./Pagination";
import Header from "../components/Header";

const StudentTable = () => {
  const { students, message } = useSelector((state) => state.students);
  const dispatch = useDispatch();

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
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");
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
    <div className="max-w-full px-4 lg:px-0 lg:w-[1000px] mx-auto">
      <Header onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

      {message && (
        <div className="bg-green-100 text-green-800 p-3 mb-4 rounded-lg shadow-md border-l-4 border-green-500 mt-6">
          {message}
        </div>
      )}

      <div className="overflow-x-auto mt-7">
        <table className="table-auto w-full min-w-[600px] border-collapse bg-[#FBE9D1] rounded-2xl">
          <thead className="bg-[#FFFFFF] shadow-md shadow-[#117C90] text-black">
            <tr>
              <th className="py-2 px-3 text-left text-xs sm:text-sm md:text-base font-medium">Name</th>
              <th className="py-2 px-3 text-left text-xs sm:text-sm md:text-base font-medium">Student ID</th>
              <th className="py-2 px-3 text-left text-xs sm:text-sm md:text-base font-medium">Email</th>
              <th className="py-2 px-3 text-left text-xs sm:text-sm md:text-base font-medium">Class</th>
              <th className="py-2 px-3 text-left text-xs sm:text-sm md:text-base font-medium">Gender</th>
              <th className="py-2 px-3 text-left text-xs sm:text-sm md:text-base font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="py-2 px-3 text-xs sm:text-sm md:text-base flex items-center">
                    <img
                      src={student.image}
                      alt="Profile"
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full mr-2"
                    />
                    <span className="truncate">{student.name}</span>
                  </td>
                  <td className="py-2 px-3 text-xs sm:text-sm md:text-base truncate">{student.studentID}</td>
                  <td className="py-2 px-3 text-xs sm:text-sm md:text-base truncate">{student.email}</td>
                  <td className="py-2 px-3 text-xs sm:text-sm md:text-base truncate">{student.class}</td>
                  <td className="py-2 px-3 text-xs sm:text-sm md:text-base truncate">{student.gender}</td>
                  <td className="py-2 px-3 text-xs sm:text-sm md:text-base space-x-2">
                    <button
                      onClick={() => {}}
                      className="text-[#117C90] hover:text-[#244856] transition duration-300"
                    >
                      <i className="far fa-edit" style={{ fontSize: "16px" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-[#E74833] hover:text-[#244856] transition duration-300"
                    >
                      <i className="far fa-trash-alt" style={{ fontSize: "16px" }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-xs sm:text-sm md:text-base text-[#244856] bg-[#FFEBEB] rounded-lg"
                >
                  <span className="font-semibold">No Students Found</span>
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
