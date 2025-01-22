import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeParent,
  fetchParents,
  clearMessage,
  editParentAsync,
} from "../AdminRedux/parentSlice";
import Pagination from "../Pagination";
import Header from "../Parents/parentHeader";
import Loader from "@/ui/Loader";
import Swal from "sweetalert2";

const ParentTable = () => {
  const {
    parents = [],
    message,
    loading,
  } = useSelector((state) => state.parents || {});
  const dispatch = useDispatch();
  // console.log(parents);

  const [parentData, setParentData] = useState({
    name: "",
    studentID: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [editingParent, setEditingParent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [selectedParentId, setSelectedParentId] = useState(null);

  useEffect(() => {
    dispatch(fetchParents());
  }, [dispatch]);

  const filteredParents = parents.filter((parent) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return parent[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      parent.name.toLowerCase().includes(lowerSearchText) ||
      parent.email.toLowerCase().includes(lowerSearchText) ||
      parent.studentName?.toLowerCase().includes(lowerSearchText)
    );
  });

  // console.log('Filtered Parents:', filteredParents);
  const paginatedParents = filteredParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    setSelectedParentId(id);
    // setShowConfirm(true);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this parent?",
    );
    if (confirmDelete) {
      try {
        await dispatch(removeParent(id));
        alert("Parent deleted successfully");
      } catch (error) {
        console.error("Failed to delete parent:", error);
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

  const handleEditClick = (parent) => {
    setEditingParent(parent._id);
    setParentData({
      name: parent.name,
      email: parent.email,
      gender: parent.gender,
      studentID: parent.studentID,
      phone: parent.phone,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setParentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!parentData.name || !parentData.email || !parentData.gender) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const updatedParent = {
      name: parentData.name,
      email: parentData.email,
      gender: parentData.gender,
      studentID: parentData.studentID,
      phone: parentData.phone,
    };

    try {
      await dispatch(
        editParentAsync({ id: editingParent, updatedParent }),
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
    <div className="lg:px-0">
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
                Phone
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
            {paginatedParents.length > 0 ? (
              paginatedParents.map((parent, index) => (
                <tr
                  key={parent._id || index}
                  className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                >
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                    <img
                      src={parent.profileImage}
                      alt="Profile"
                      className="mr-2 h-8 rounded-full sm:h-10 md:h-12 md:w-12"
                    />
                    <span className="truncate font-poppins">{parent.name}</span>
                  </td>

                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {parent.SSN}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {parent.email}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {parent.phone}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {parent.gender}
                  </td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit parent"
                      onClick={() => handleEditClick(parent)}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete parent"
                      onClick={() => handleDelete(parent._id)}
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
                  <span className="font-poppins">No Parents Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredParents.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Edit parent</h3>
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
                  value={parentData.name}
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
                  value={parentData.email}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              {/* <div className="mb-4">
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
                  value={parentData.gender}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div> */}

              <div>
                <label className="mb-2 block font-semibold text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={parentData.gender}
                  onChange={handleEditChange}
                  className="w-full rounded-md border p-2 font-poppins text-gray-600"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="mt-2 block text-sm font-medium text-gray-700"
                >
                  phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={parentData.phone}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="studentID"
                  className="block text-sm font-medium text-gray-700"
                >
                  studentID
                </label>
                <input
                  type="number"
                  id="studentID"
                  name="studentID"
                  value={parentData.studentID}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
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

export default ParentTable;
