import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAdmin, fetchAdmins, clearMessage } from "../AdminRedux/adminSlice";
import Pagination from "../Pagination";
import Header from "../Admins/adminHeader";
import { useNavigate } from "react-router-dom";


const AdminTable = () => {
  const navigate = useNavigate();
  const { admins, message } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const filteredAdmins = admins.filter((admin) => {
    const lowerSearchText = searchText.toLowerCase();
  
    if (filterOption) {
      const value = admin[filterOption];
      return value && value.toLowerCase().includes(lowerSearchText); // Check if value exists
    }
  
    return (
      (admin.name?.toLowerCase().includes(lowerSearchText) || // Safely check `name`
      admin.email?.toLowerCase().includes(lowerSearchText)) // Safely check `email`
    );
  });
  

  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      await dispatch(removeAdmin(id));
    }
  };

  const handleSearchChange = (search) => setSearchText(search);
  const handleFilterChange = (filter) => setFilterOption(filter);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  }, [message, dispatch]);
  const handleEditClick = (id) => {
    navigate(`/admin/editadminform/${id}`);
  };
  return (
    <div className="relative w-full px-4 sm:w-full lg:px-0">
      <Header onSearchChange={handleSearchChange} 
              onFilterChange={handleFilterChange} />
      <div className="mt-7">
      <div className="overflow-x-auto"> 
        <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
          <thead className="bg-[#117C90]  text-white">
            <tr>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
              Name</th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
              Email</th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
              Gender</th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
              Phone</th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
              Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((admin,index) => (
                <tr key={admin._id} 
                className={`${
                  index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                } hover:bg-[#117C90]/70`}>
                 
                <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                      <img
                        src={admin.profileImage}
                        alt="Profile"
                        className="mr-2 h-8 rounded-full sm:h-10 md:h-12 md:w-12"
                      />
                      <span className="truncate font-poppins">
                        {admin.fullName}
                      </span>
                    </td>
                  <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">{admin.email}</td>
                  <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">{admin.gender}</td>
                  <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">{admin.phone}</td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button  aria-label="Edit admin"
                    onClick={() => handleEditClick(admin._id)}
                    className="text-[#E74833] transition duration-300 hover:text-[#244856]">
                    <i className="far fa-edit text-lg" />
                    </button>
                    <button aria-label="Delete admin"
                    onClick={() => handleDelete(admin._id)}
                    className="text-[#E74833] transition duration-300 hover:text-[#244856]">
                    <i className="far fa-trash-alt text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
              <td colSpan="5" className="rounded-lg bg-[#F7FAFC] py-28 text-center shadow-md border-2 border-[#E3E8F1]">
                <p className="text-lg font-semibold text-gray-600">No Admin Found</p>
                <p className="text-sm text-gray-500 mt-2">It seems like there are no admins in the database at the moment.</p>
                
              </td>
            </tr>
            )}
          </tbody>
        </table>
        </div>
        {paginatedAdmins.length > 0 ? (
          
        
        <Pagination
          totalItems={filteredAdmins.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : null}
      </div>
        
    </div>
  );
};

export default AdminTable;
