import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchBosses,
  removeBosse,
  clearMessage,
} from "../AdminRedux/managerSlice";
import Pagination from "../Pagination";
import Header from "../Managers/managerHeader";
import Loader from "@/ui/Loader";

const ManagerTable = () => {
  const navigate = useNavigate();
  const {
    bosses = [],
    message,
    loading,
  } = useSelector((state) => state.bosses || {});


  const dispatch = useDispatch();
  console.log(bosses);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  // const [selectedBosseId, setSelectedBosseId] = useState(null);

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
     if (window.confirm("Are you sure you want to delete this manager?")) {
         await dispatch(removeBosse(id));
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

  const handleEditClick = (id) => {
    navigate(`/admin/editmanagerform/${id}`);
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
      <div className="overflow-x-auto"> 
        <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
          <thead className="bg-[#117C90] text-white ">
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
                  <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                    {manager.email}
                  </td>
                  <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                    {manager.gender}
                  </td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit manager"
                      onClick={() => handleEditClick(manager._id)}
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
        </div>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredManagers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerTable;
