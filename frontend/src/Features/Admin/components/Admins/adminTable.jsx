import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeAdmin,
  fetchAdmins,
  clearMessage,
} from "../AdminRedux/adminSlice";
import Pagination from "../Pagination";
import Header from "../Admins/adminHeader";
import Loader from "@/ui/Loader";

const AdminTable = () => {
  const {
    admins = [],
    message,
    loading,
  } = useSelector((state) => state.admins || {});
  const dispatch = useDispatch();
  console.log(admins);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [selectedAdminId, setSelectedAdminId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const filteredAdmins = admins.filter((admin) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return admin[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      admin.name.toLowerCase().includes(lowerSearchText) ||
      admin.email.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    setSelectedAdminId(id);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Admin?",
    );
    if (confirmDelete) {
      try {
        await dispatch(removeAdmin(id));
        alert("Admin deleted successfully");
      } catch (error) {
        console.error("Failed to delete Admin:", error);
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

  return (
    <div className="mx-auto px-4 lg:px-0">
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
            {paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((admin, index) => (
                <tr
                  key={admin._id || index}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="flex items-center px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    <img
                      src={admin.profileImage}
                      alt="Profile"
                      className="mr-2 h-8 rounded-full sm:h-10 md:h-12 md:w-12"
                    />
                    <span className="truncate font-poppins">{admin.name}</span>
                  </td>
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {admin.email}
                  </td>
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {admin.gender}
                  </td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit admin"
                      onClick={() => {}}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete admin"
                      onClick={() => handleDelete(admin._id)}
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
                  <span className="font-poppins">No Admins Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredAdmins.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
