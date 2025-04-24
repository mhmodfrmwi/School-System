import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers, removeTeacher } from "../AdminRedux/teacherSlice";
import Pagination from "../Pagination";
import Header from "../Teachers/teacherHeader";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const TeacherTable = () => {
  const { teachers = [] } = useSelector((state) => state.teachers || {});
  const dispatch = useDispatch();
  const { t ,i18n} = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const isRTL = i18n.language === 'ar';
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTeachers());
      setLoading(false); // Set loading to false after teachers are fetched
    };
    fetchData();
  }, [dispatch]);

  const filteredTeachers = teachers.filter((teacher) => {
    const lowerSearchText = searchText.toLowerCase();

    if (filterOption) {
      const filterValue = teacher[filterOption];
      return filterValue && filterValue.toLowerCase().includes(lowerSearchText);
    }

    return (
      teacher.fullName?.toLowerCase().includes(lowerSearchText) ||
      teacher.email?.toLowerCase().includes(lowerSearchText) ||
      teacher.academicNumber?.toLowerCase().includes(lowerSearchText)
    );
  });

  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      t("teacherTable.deleteConfirmation"),
    );
    if (confirmDelete) {
      try {
        await dispatch(removeTeacher(id));
      } catch (error) {
        console.error("Failed to delete Teacher:", error);
      }
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearchChange = (search) => setSearchText(search);
  const handleFilterChange = (filter) => setFilterOption(filter);

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
                {t("tableHeaders.subject")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.email")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.AcademicNumber")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.gender")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                {t("tableHeaders.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTeachers.length > 0 ? (
                paginatedTeachers.map((teacher, index) => (
                  <tr
                    key={teacher._id}
                    className={`dark:text-black ${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:hover:bg-[#043B44]/70`}
                  >
                    <td className="flex items-center px-3 py-2">
                      <img
                        src={teacher.profileImage}
                        alt="Profile"
                        className={`${isRTL ? 'ml-2' : 'mr-2'} h-8 w-8 rounded-full sm:h-10 sm:w-10`}
                      />
                      <span className="truncate font-poppins">
                        {teacher.fullName}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {teacher.subjectId?.subjectName}
                    </td>
                    <td className="px-3 py-2">{teacher.email}</td>
                    <td className="px-3 py-2">{teacher.academicNumber}</td>
                    <td className="px-3 py-2">{teacher.gender}</td>
                    <td className="px-3 py-2">
                      <div className={`inline-flex ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                        <Link
                          to={`/admin/allteachers/${teacher._id}`}
                          className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                        >
                          <i className="fas fa-eye text-lg" />
                        </Link>
                        <Link
                          to={`/admin/edit-teacher/${teacher._id}`}
                          className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                        >
                          <i className="far fa-edit text-lg" />
                        </Link>
                        <button
                          aria-label="Delete teacher"
                          onClick={() => handleDelete(teacher._id)}
                          className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                        >
                          <i className="far fa-trash-alt text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="rounded-lg border-2 border-[#E3E8F1] bg-[#F7FAFC] py-28 text-center shadow-md"
                  >
                    <p className="text-lg font-semibold text-gray-600">
                    {t("teacherTable.noTeachersFound.title")}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                    {t("teacherTable.noTeachersFound.description")}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredTeachers.length > 0 ? (
          <div className="mt-7 flex justify-center lg:justify-end">
            <Pagination
              totalItems={filteredTeachers.length}
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

export default TeacherTable;
