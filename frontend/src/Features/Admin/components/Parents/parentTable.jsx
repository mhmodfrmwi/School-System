import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeParent,
  fetchParents,
  clearMessage,
} from "../AdminRedux/parentSlice";
import Pagination from "../Pagination";
import Header from "../Parents/parentHeader";

const ParentTable = () => {
  const { parents = [], message, status } = useSelector((state) => state.parents || {});
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState(null);

  useEffect(() => {
    dispatch(fetchParents());
  }, [dispatch]);

  useEffect(() => {
    console.log(parents); // عرض البيانات في الكونسول
  }, [parents]);
  useEffect(() => {
    console.log('Parents from Redux:', parents); // تأكد من أن البيانات تصل بشكل صحيح
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

  console.log('Filtered Parents:', filteredParents); 
  const paginatedParents = filteredParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setSelectedParentId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(removeParent(selectedParentId));
    setShowConfirm(false);
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
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      {message && (
        <div className="mb-4 mt-6 rounded-lg border-l-4 border-green-500 bg-green-100 p-3 text-green-800 shadow-md">
          {message}
        </div>
      )}

      {/* عرض البيانات مباشرة هنا للتأكد من صحتها */}
      {/* <div>
        <h3>Parents Data:</h3>
        <pre>{JSON.stringify(parents, null, 2)}</pre>
      </div> */}

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
                SSN
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Phone
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Gender
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Profile Image
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedParents.length > 0 ? (
              paginatedParents.map((parent, index) => (
                <tr key={parent._id} className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}>
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                    <span className="truncate font-poppins">{parent.name}</span>
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{parent.email}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{parent.SSN}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{parent.phone}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{parent.gender}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    <img src={parent.profileImage} alt="Profile" className="h-10 w-10 rounded-full" />
                  </td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit parent"
                      onClick={() => {}}
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
    </div>
  );
};


export default ParentTable;
