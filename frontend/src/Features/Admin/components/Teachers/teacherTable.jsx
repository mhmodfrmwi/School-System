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
  console.log(teachers);
  const [teacherData, setTeacherData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    subject: "",
    dateOfBirth: "",
    address: "",
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

  const filteredTeachers = teachers.filter((teacher) => {
    const lowerSearchText = searchText.toLowerCase();

    // Safeguard for teacher[filterOption]
    if (filterOption) {
      const filterValue = teacher[filterOption];
      return filterValue && filterValue.toLowerCase().includes(lowerSearchText);
    }

    // Safeguards for fullName and email
    return (
      teacher.fullName?.toLowerCase().includes(lowerSearchText) ||
      teacher.email?.toLowerCase().includes(lowerSearchText)
    );
  });

  // console.log(filteredTeachers);

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
      fullName: teacher.fullName,
      email: teacher.email,
      gender: teacher.gender,
      address: teacher.address,
      subject: teacher.subject,
      dateOfBirth: teacher.dateOfBirth,
      phone: teacher.phone,
      password: teacher.password,
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

    if (!teacherData.fullName || !teacherData.email || !teacherData.gender) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const updatedTeacher = {
      fullName: teacherData.fullName,
      email: teacherData.email,
      gender: teacherData.gender,
      subject: teacherData.subject,
      address: teacherData.address,
      dateOfBirth: teacherData.dateOfBirth,
      phone: teacherData.phone,
      password: teacherData.password,
    };

    try {
      await dispatch(
        editTeacherAsync({ id: editingTeacher, updatedTeacher }),
      ).unwrap();
      setIsModalOpen(false);
      Swal.fire(
        "Success!",
        "The teacher has been updated successfully.",
        "success",
      );
    } catch (error) {
      Swal.fire(
        "Error!",
        error.message || "Failed to update the teacher.",
        "error",
      );
    }
    setTeacherData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      subject: "",
      dateOfBirth: "",
      address: "",
      // classes: [],
      // subjects: [""],
    });
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
      <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
          <thead className="bg-[#117C90]  text-white ">
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
                      {teacher.fullName}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                    {teacher.subject}
                  </td>
                  {/* <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.classes}
                  </td> */}
                  <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                    {teacher.class}
                  </td>

                  <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                    {teacher.email}
                  </td>
                  <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
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
          <div className="h-[90vh] w-96 overflow-y-scroll bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Edit teacher</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={teacherData.fullName}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block font-semibold text-gray-700"
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
              <div className="mb-2">
                <label className="mb-2 block font-semibold text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={teacherData.gender}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>

              <div className="mb-2 grid grid-cols-1">
                <label className="mb-2 block font-semibold text-gray-700">
                  Subject
                </label>
                <select
                  value={teacherData.subject}
                  onChange={handleEditChange}
                  name="subject"
                  className="w-full rounded-md border border-gray-300 p-2"
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

              <div className="mb-4">
                <label className="mb-2 block font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={teacherData.password}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={teacherData.phone}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block font-semibold text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={teacherData.address}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter Date of Birth"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block font-semibold text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={teacherData.dateOfBirth}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter Date of Birth"
                  required
                />
              </div>

              {/* 
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
              </div> */}

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
