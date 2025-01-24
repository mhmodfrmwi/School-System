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
    name: "",
    email: "",
    gender: "",
  });

  const [editingManager, setEditingManager] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  console.log(bosses);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  // const [selectedBosseId, setSelectedBosseId] = useState(null);
  
  const [setSelectedBosseId] = useState(null);

  useEffect(() => {
    dispatch(fetchBosses());
  }, [dispatch]);

  const filteredManagers = bosses.filter((bosse) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return bosse[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      bosse.name.toLowerCase().includes(lowerSearchText) ||
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
      name: manager.name,
      email: manager.email,
      gender: manager.gender,
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

    if (!managerData.name || !managerData.email || !managerData.gender) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const updatedManager = {
      name: managerData.name,
      email: managerData.email,
      gender: managerData.gender,
    };

    try {
      await dispatch(
        editManagerAsync({ id: editingManager, updatedManager }),
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
                      {manager.name}
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
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Edit Manager</h3>
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
                  value={managerData.name}
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
                  value={managerData.email}
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
                  value={managerData.gender}
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

export default ManagerTable;
