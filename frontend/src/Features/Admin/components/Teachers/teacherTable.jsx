import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTeacher,
  fetchTeachers,
  clearMessage,
  editTeacherAsync,
} from "../AdminRedux/teacherSlice";
import Pagination from "../Pagination";
import Header from "../Teachers/teacherHeader";
import Swal from "sweetalert2";
import Loader from "@/ui/Loader";

const TeacherTable = () => {
  const {
    teachers = [],
    message,
    loading,
  } = useSelector((state) => state.teachers || {});
  const dispatch = useDispatch();

  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    gender: "",
    class: "",
    subject: "",
  });

  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      return teacher[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      teacher.name.toLowerCase().includes(lowerSearchText) ||
      teacher.email.toLowerCase().includes(lowerSearchText)
    );
  });

  // Paginate teachers based on current page
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Delete teacher
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?",
    );
    if (confirmDelete) {
      try {
        await dispatch(removeTeacher(id));
        alert("Teacher deleted successfully");
      } catch (error) {
        console.error("Failed to delete Teacher:", error);
        alert("Error occurred while deleting");
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

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher._id);
    setTeacherData({
      name: teacher.name,
      email: teacher.email,
      gender: teacher.gender,
      class: teacher.class,
      subject: teacher.subject,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!teacherData.name || !teacherData.email || !teacherData.gender) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const updatedTeacher = {
      name: teacherData.name,
      email: teacherData.email,
      gender: teacherData.gender,
      subject: teacherData.subject,
      class: teacherData.class,
    };

    try {
      await dispatch(
        editTeacherAsync({ id: editingTeacher, updatedTeacher }),
      ).unwrap();
      setIsModalOpen(false);
      Swal.fire(
        "Success!",
        "The term has been updated successfully.",
        "success",
      );
    } catch (error) {
      Swal.fire(
        "Error!",
        error.message || "Failed to update the term.",
        "error",
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <tbody className="relative">
            {loading && <Loader />}
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
                    <span className="truncate font-poppins">
                      {teacher.name}
                    </span>
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
                      onClick={() => handleEditClick(teacher)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Edit teacher</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={teacherData.name}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={teacherData.email}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={teacherData.gender}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div className="mt-6">
                <div className="mt-4 grid grid-cols-1">
                  <label className="mb-2 block font-semibold text-[#117C90]">
                    Subject
                  </label>
                  <select
                    value={teacherData.subject}
                    onChange={handleEditChange}
                    name="subject"
                    className="w-full rounded-2xl border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  >
                    <option value="" disabled>
                      Select subject
                    </option>
                    <option value="Math">Math</option>
                    <option value="English">English</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>
              </div>

              <div className="my-5">
                <label className="mb-2 block font-poppins text-gray-700">
                  Class
                </label>
                <select
                  name="class"
                  value={teacherData.class}
                  onChange={() => handleEditChange}
                  className="w-full rounded-2xl border bg-[#117C90] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                >
                  <option value="" className="font-poppins" disabled>
                    Select class
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-md bg-gray-300 p-2 text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 p-2 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherTable;
