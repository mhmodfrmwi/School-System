import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pagination from "../Pagination";

import Loader from "@/ui/Loader";
import Swal from "sweetalert2";
import {
  editClassTeacher,
  fetchClassTeacher,
  removeClassTeacher,
} from "../AdminRedux/classTeacherSlice";
import { clearMessage } from "../AdminRedux/studentSlice";
import ManagerHeader from "./classTeacherHeader";
import ClassTeacherHeader from "./classTeacherHeader";

const ClassTeacherTable = () => {
  const {
    classesteacher = [],
    message,
    loading,
  } = useSelector((state) => state.classesteacher || {});

  console.log(classesteacher);
  const [classTeacherData, setClassTeacherData] = useState({
    className: "",
    subjectName: "",
    teacherName: "",
    academicYear: "",
  });

  const [editingClassTeacher, setEditingClassTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  console.log(classesteacher);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [setSelectedBosseId] = useState(null);

  useEffect(() => {
    dispatch(fetchClassTeacher());
  }, [dispatch]);

  const filteredClassTeachers = classesteacher.filter((classteacher) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return classteacher[filterOption]
        ?.toLowerCase()
        .includes(lowerSearchText);
    }
    return (
      classteacher.className.toLowerCase().includes(lowerSearchText) ||
      classteacher.subjectName.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedClassTeachers = filteredClassTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    setSelectedBosseId(id);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this manager?",
    );
    if (confirmDelete) {
      try {
        await dispatch(removeClassTeacher(id));
        alert("class teacher deleted successfully");
      } catch (error) {
        console.error("Failed to delete class teacher:", error);
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

  const handleEditClick = (classteacher) => {
    setEditingClassTeacher(classteacher._id);
    setClassTeacherData({
      className: classteacher.className,
      subjectName: classteacher.subjectName,
      teacherName: classteacher.teacherName,
      academicYear: classteacher.academicYear,
      password: classteacher.password,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setClassTeacherData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (
      !classTeacherData.fullName ||
      !classTeacherData.email ||
      !classTeacherData.gender
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const updateClassTeacher = {
      className: classTeacherData.className,
      subjectName: classTeacherData.subjectName,
      teacherName: classTeacherData.teacherName,
      academicYear: classTeacherData.academicYear,
    };

    try {
      await dispatch(
        editClassTeacher({ id: editingClassTeacher, updateClassTeacher }),
      ).unwrap();
      setIsModalOpen(false);
      Swal.fire(
        "Success!",
        "The classTeacher has been updated successfully.",
        "success",
      );
    } catch (error) {
      Swal.fire(
        "Error!",
        error.message || "Failed to update the class Teacher.",
        "error",
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-dvw px-4 sm:w-[100%] lg:px-0">
      {loading && <Loader />}
      <ClassTeacherHeader
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
                Class Name
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Subject Name
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                teacher Name
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClassTeachers.length > 0 ? (
              paginatedClassTeachers.map((classteacher, index) => (
                <tr
                  key={classteacher._id}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {classteacher.className}
                  </td>

                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {classteacher.subjectName}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {classteacher.teacherName}
                  </td>

                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit clas"
                      teacher
                      onClick={() => handleEditClick(classteacher)}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete clas"
                      teacher
                      onClick={() => handleDelete(classteacher._id)}
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
                  colSpan="4"
                  className="rounded-lg bg-[#FFEBEB] py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                >
                  <span className="font-poppins">No classteacher Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={paginatedClassTeachers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="h-[85vh] w-96 overflow-y-scroll bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Edit Manager</h3>
            <form onSubmit={handleEditSubmit}>
              <div>
                <label className="mb-2 block font-semibold text-[#117C90]">
                  className
                </label>
                <select
                  value={classTeacherData.className}
                  name="className"
                  onChange={handleEditChange}
                  placeholder="Enter class name"
                  required
                  className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                >
                  <option value="" disabled>
                    Select className
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#117C90]">
                  subjectName
                </label>
                <select
                  value={classTeacherData.subjectName}
                  name="subjectName"
                  onChange={handleEditChange}
                  placeholder="Enter subject name"
                  required
                  className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                >
                  <option value="" disabled>
                    Select Subject name
                  </option>
                  <option value="Arabic">Arabic</option>
                  <option value="English">English</option>
                  <option value="Franch">Franch</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#117C90]">
                  Teacher Name
                </label>
                <select
                  value={classTeacherData.teacherName}
                  name="teacherName"
                  onChange={handleEditChange}
                  placeholder="Enter teacher name"
                  required
                  className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                >
                  <option value="" disabled>
                    Select teacherName
                  </option>
                  <option value="ahmed">ahmed</option>
                  <option value="ali">ali</option>
                  <option value="omar">omar</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#117C90]">
                  academicYear
                </label>
                <select
                  value={classTeacherData.academicYear}
                  name="academicYear"
                  onChange={handleEditChange}
                  placeholder="Enter academic name"
                  required
                  className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                >
                  <option value="" disabled>
                    Select academicYear
                  </option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
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

export default ClassTeacherTable;
