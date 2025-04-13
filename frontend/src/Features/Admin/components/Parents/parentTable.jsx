import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeParent,
  fetchParents,
  clearMessage,
} from "../AdminRedux/parentSlice";
import Pagination from "../Pagination";
import Header from "../Parents/parentHeader";
import { useNavigate } from "react-router-dom";

const ParentTable = () => {
  const navigate = useNavigate();
  const {
    parents = [],
    message,
    loading,
  } = useSelector((state) => state.parents || {});
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchParents());
  }, [dispatch]);

  const filteredParents = parents.filter((parent) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return parent[filterOption]?.toLowerCase().includes(lowerSearchText);
    }
    return (
      parent.fullName.toLowerCase().includes(lowerSearchText) ||
      parent.email.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedParents = filteredParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this parent?")) {
      await dispatch(removeParent(id));
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
    navigate(`/admin/editparentform/${id}`);
  };
  if (loading) {
    return <div className="h-full w-full"></div>; // Empty div during loading
  }
  return (
    <div className="relative lg:px-0">
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <div className="mt-7">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-[#043B44]">
            <thead className="bg-[#117C90] text-white dark:bg-[#043B44]">
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
            <tbody className=" ">
              {paginatedParents.length > 0 ? (
                paginatedParents.map((parent, index) => (
                  <tr
                    key={parent._id || index}
                    className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:hover:bg-[#043B44]/70`}
                  >
                    <td className="flex items-center px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      <img
                        src={parent.profileImage}
                        alt="Profile"
                        className="mr-2 h-8 rounded-full sm:h-10 md:h-12 md:w-12"
                      />
                      <span className="truncate font-poppins dark:text-black">
                        {parent.fullName}
                      </span>
                    </td>

                    <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      {parent.email}
                    </td>

                    <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      {parent.gender}
                    </td>
                    <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                      <button
                        aria-label="Edit parent"
                        onClick={() => handleEditClick(parent._id)}
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
                    colSpan="4"
                    className="rounded-lg border-2 border-[#E3E8F1] bg-[#F7FAFC] py-28 text-center shadow-md"
                  >
                    <p className="text-lg font-semibold text-gray-600">
                      No Parents Found
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      It seems like there are no parents in the database at the
                      moment.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {paginatedParents.length > 0 ? (
          <div className="mt-7 flex justify-center lg:justify-end">
            <Pagination
              totalItems={filteredParents.length}
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

export default ParentTable;
