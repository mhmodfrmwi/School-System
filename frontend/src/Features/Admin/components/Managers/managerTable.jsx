import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchManagers,
  removeManager,
} from "../AdminRedux/managerSlice";
import Pagination from "../Pagination";
import Header from "../Managers/managerHeader";

const ManagerTable = () => {
  const navigate = useNavigate();
  const { managers = [] , loading} = useSelector((state) => state.managers || {});
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

const filteredManagers = managers.filter((manager) => {
  const lowerSearchText = searchText.toLowerCase();

  if (filterOption) {
    const value = manager[filterOption];
    return value && value.toLowerCase().includes(lowerSearchText); 
  }

  return (
    (manager.fullName?.toLowerCase().includes(lowerSearchText) || // Safely check `name`
    manager.email?.toLowerCase().includes(lowerSearchText)) // Safely check `email`
  );
});

  
  const paginatedManagers = filteredManagers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      try {
        await dispatch(removeManager(id));
      } catch (error) {
        console.error(error);
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

  const handleEditClick = (id) => {
    navigate(`/admin/editmanagerform/${id}`);
  };
  if (loading) {
    return <div className="w-full h-full"></div>; // Empty div during loading
  }
  return (
    <div className="relative w-full px-4 sm:w-full lg:px-0">
      <Header onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

      <div className="mt-7">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
            <thead className="bg-[#117C90] text-white">
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
                <td colSpan="4" className="rounded-lg bg-[#F7FAFC] py-28 text-center shadow-md border-2 border-[#E3E8F1]">
                  <p className="text-lg font-semibold text-gray-600">No Manager Found</p>
                  <p className="text-sm text-gray-500 mt-2">It seems like there are no managers in the database at the moment.</p>
                  
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
{paginatedManagers.length > 0 ? (
  
        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredManagers.length}
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

export default ManagerTable;
