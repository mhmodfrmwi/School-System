import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeAdmin,
  fetchAdmins,
  clearMessage,
} from "../AdminRedux/adminSlice";
import Pagination from "../Pagination";
import Header from "../Admins/adminHeader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const AdminTable = () => {
  const { t ,i18n} = useTranslation();
  const navigate = useNavigate();
  const { admins, message, loading } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  const isRTL = i18n.language === 'ar';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const filteredAdmins = admins.filter((admin) => {
    const lowerSearchText = searchText.toLowerCase();

    // Handle filter option when selected
    if (filterOption) {
      const value = admin[filterOption];
      return value && value.toLowerCase().includes(lowerSearchText);
    }

    // Default behavior if no filter is selected (name or email)
    return (
      admin.fullName?.toLowerCase().includes(lowerSearchText) ||
      admin.email?.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = async (id) => {
    if (window.confirm(t("adminTable.deleteConfirmation"))) {
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

  if (loading) {
    return <div className="h-full w-full"></div>; // Empty div during loading
  }
  return (
    <div className="relative w-full px-4 sm:w-full lg:px-0" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      <div className="mt-7">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-[#043B44]">
            <thead className="bg-[#117C90] text-white dark:bg-[#043B44]">
              <tr>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.name")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.email")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.gender")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.phone")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmins.length > 0 ? (
                paginatedAdmins.map((admin, index) => (
                  <tr
                    key={admin._id}
                    className={`${
                      index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                    } hover:bg-[#117C90]/70 dark:hover:bg-[#043B44]/70`}
                  >
                    <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                      <img
                        src={admin.profileImage}
                        alt="Profile"
                        className={`${isRTL ? 'ml-2' : 'mr-2'} h-8 w-8 rounded-full sm:h-10 sm:w-10`}
                      />
                      <span className="truncate font-poppins dark:text-black">
                        {admin.fullName}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      {admin.email}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      {admin.gender}
                    </td>
                    <td className="px-3 py-2 font-poppins text-xs dark:text-black sm:text-sm md:text-base">
                      {admin.phone}
                    </td>
                    <td className={`px-3 py-2 text-xs sm:text-sm md:text-base ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                      <button
                        aria-label="Edit admin"
                        onClick={() => handleEditClick(admin._id)}
                        className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
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
                    colSpan="5"
                    className="rounded-lg border-2 border-[#E3E8F1] bg-[#F7FAFC] py-28 text-center shadow-md"
                  >
                    <p className="text-lg font-semibold text-gray-600">
                    {t("adminTable.noAdminsFound.title")}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                    {t("adminTable.noAdminsFound.description")}
                    </p>
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
