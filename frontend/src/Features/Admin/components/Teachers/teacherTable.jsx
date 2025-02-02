import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers, removeTeacher } from "../AdminRedux/teacherSlice";
import Pagination from "../Pagination";
import Header from "../Teachers/teacherHeader";
import { Link } from "react-router-dom";

const TeacherTable = () => {
  const { teachers = [] } = useSelector((state) => state.teachers || {});
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const filteredTeachers = teachers.filter((teacher) => {
    const lowerSearchText = searchText.toLowerCase();

    if (filterOption) {
      const filterValue = teacher[filterOption];
      return filterValue && filterValue.toLowerCase().includes(lowerSearchText);
    }

    return (
      teacher.fullName?.toLowerCase().includes(lowerSearchText) ||
      teacher.email?.toLowerCase().includes(lowerSearchText) ||
      teacher.academicNumber?.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (confirmDelete) {
      try {
        await dispatch(removeTeacher(id));
      } catch (error) {
        console.error("Failed to delete Teacher:", error);
      }
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearchChange = (search) => setSearchText(search);
  const handleFilterChange = (filter) => setFilterOption(filter);



  return (
    <div className="relative w-full px-4 sm:w-full lg:px-0">
      <Header onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

      <div className="mt-7">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
            <thead className="bg-[#117C90] text-white">
              <tr>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Name</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Subject</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Email</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Academic Number</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Gender</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTeachers.length > 0 ? (
                paginatedTeachers.map((teacher, index) => (
                  <tr key={teacher._id} className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}>
                    <td className="flex items-center px-3 py-2">
                      <img src={teacher.profileImage} alt="Profile" className="mr-2 h-8 rounded-full" />
                      <span className="truncate font-poppins">{teacher.fullName}</span>
                    </td>
                    <td className="px-3 py-2">{teacher.subjectId?.subjectName}</td>
                    <td className="px-3 py-2">{teacher.email}</td>
                    <td className="px-3 py-2">{teacher.academicNumber}</td>
                    <td className="px-3 py-2">{teacher.gender}</td>
                    <td className="px-3 py-2">
                      <div className="inline-flex space-x-2">
                      <Link
                          to={`/admin/allteachers/${teacher._id}`}
                          className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                        >
                          <i className="fas fa-eye text-lg" />
                        </Link>
                        <Link
                          to={`/admin/edit-teacher/${teacher._id}`}
                          className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                        >
                          <i className="far fa-edit text-lg" />
                        </Link>
                        <button
                          aria-label="Delete teacher"
                          onClick={() => handleDelete(teacher._id)}
                          className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                        >
                          <i className="far fa-trash-alt text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                <td colSpan="6" className="rounded-lg bg-[#F7FAFC] py-28 text-center shadow-md border-2 border-[#E3E8F1]">
                  <p className="text-lg font-semibold text-gray-600">No Teachers Found</p>
                  <p className="text-sm text-gray-500 mt-2">It seems like there are no Teachers in the database at the moment.</p>
                  
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredTeachers.length > 0 ? (

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredTeachers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        ) : null}
      </div>
    </div>
  );
};

export default TeacherTable;
