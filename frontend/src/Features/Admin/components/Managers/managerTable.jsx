import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBosses,
  removeBosse,
  clearMessage,
  editManagerAsync,
} from "../AdminRedux/managerSlice";
import Pagination from "../Pagination";
import Header from "../Managers/managerHeader";
import Loader from "@/ui/Loader";
import Swal from "sweetalert2";

const ManagerTable = () => {
  const {
    bosses = [],
    message,
    loading,
  } = useSelector((state) => state.bosses || {});

  const [managerData, setManagerData] = useState({
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
  });

  const [editingManager, setEditingManager] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  console.log(bosses);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [selectedBosseId, setSelectedBosseId] = useState(null);

  useEffect(() => {
    dispatch(fetchBosses());
  }, [dispatch]);

  const filteredManagers = bosses.filter((bosse) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return bosse[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      bosse.fullName.toLowerCase().includes(lowerSearchText) ||
      bosse.email.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedManagers = filteredManagers.slice(
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
        await dispatch(removeBosse(id));
        alert("manager deleted successfully");
      } catch (error) {
        console.error("Failed to delete manager:", error);
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

  const handleEditClick = (manager) => {
    setEditingManager(manager._id);
    setManagerData({
      fullName: manager.fullName,
      email: manager.email,
      gender: manager.gender,
      phone: manager.phone,
      password: manager.password,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setManagerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!managerData.fullName || !managerData.email || !managerData.gender) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const updatedManager = {
      fullName: managerData.fullName,
      email: managerData.email,
      gender: managerData.gender,
      phone: managerData.phone,
      password: managerData.password,
    };

    try {
      await dispatch(
        editManagerAsync({ id: editingManager, updatedManager }),
      ).unwrap();
      setIsModalOpen(false);
      Swal.fire(
        "Success!",
        "The manager has been updated successfully.",
        "success",
      );
    } catch (error) {
      Swal.fire(
        "Error!",
        error.message || "Failed to update the manager.",
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
          <tbody>
            {paginatedManagers.length > 0 ? (
              paginatedManagers.map((manager, index) => (
                <tr
                  key={manager._id}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                    <img
                      src={manager.profileImage}
                      alt="Profile"
                      className="mr-2 h-8 rounded-full sm:h-10 md:h-12 md:w-12"
                    />
                    <span className="truncate font-poppins">
                      {manager.fullName}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {manager.email}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {manager.gender}
                  </td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit manager"
                      onClick={() => handleEditClick(manager)}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete manager"
                      onClick={() => handleDelete(manager._id)}
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
                  <span className="font-poppins">No Managers Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredManagers.length}
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
                  value={managerData.fullName}
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
                  value={managerData.email}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={managerData.gender}
                  onChange={handleEditChange}
                  className="w-full rounded-md border p-2 font-poppins text-gray-600 focus:outline-none"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="M" className="font-poppins">
                    M
                  </option>
                  <option value="F" className="font-poppins">
                    F
                  </option>
                </select>
              </div>

              <div className="my-2">
                <label className="mb-2 block font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={managerData.password}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="my-2">
                <label className="mb-2 block font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={managerData.phone}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter phone number"
                  required
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

export default ManagerTable;
