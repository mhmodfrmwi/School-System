import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchAssignedSubjects,
  deleteAssignedSubject,
} from "../AdminRedux/AssignSubjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import Loader from "@/ui/Loader";
import SubjectsHeader from "./AssignSubjectHeader";
import Pagination from "../Pagination";
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
const AssignedSubjects = () => {
  const { t,i18n } = useTranslation();
  const dispatch = useDispatch();
  const { assignedSubjects, loading: loadingSubjects } = useSelector(
    (state) => state.assignSubject,
  );
  const { grades, loading: loadingGrades } = useSelector(
    (state) => state.grades,
  );
  const { id } = useParams();
  const isRTL = i18n.language === 'ar';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchAssignedSubjects());
    dispatch(fetchGrades());
  }, [dispatch]);

  // Apply filter and search
  const filteredSubjects = assignedSubjects
    .filter((subject) => subject.subjectId === id) // Filter by subjectId
    .filter((subject) => {
      const lowerSearchText = searchText.toLowerCase();
      // Apply filter based on filterOption and searchText
      if (filterOption) {
        if (subject[filterOption]) {
          return subject[filterOption]?.toLowerCase().includes(lowerSearchText);
        }
        return false; // If filterOption is not found in the subject
      }
      // Default search on subject name
      return (
        subject.subject.toLowerCase().includes(lowerSearchText) ||
        subject.gradeName?.toLowerCase().includes(lowerSearchText) ||
        subject.term?.toLowerCase().includes(lowerSearchText)
      );
    });

  // Add grade name to the subjects
  const subjectsWithGradeName = filteredSubjects.map((subject) => {
    const gradeName =
      grades?.find((g) => g._id === subject.grade)?.gradeName || "Unknown";
    return { ...subject, gradeName };
  });

  // Paginate the subjects
  const paginatedSubjects = subjectsWithGradeName.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDeleteSubject = (_id) => {
    if (window.confirm(t('assignedSubjects.deleteConfirmation'))) {
      dispatch(deleteAssignedSubject(_id));
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

  
  const handleExportCSV = () => {
    const dataToExport = subjectsWithGradeName.map(subject => ({
      [t("assignedSubjects.tableHeaders.subject")]: subject.subject,
      [t("assignedSubjects.tableHeaders.grade")]: subject.gradeName,
      [t("assignedSubjects.tableHeaders.term")]: subject.term,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AssignedSubjects");
    
    // Generate current date for filename
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    
    XLSX.writeFile(wb, `assigned_subjects_${dateStr}.xlsx`);
  };

  // Show loading state while data is being fetched
  if (loadingSubjects || loadingGrades) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Show empty div while loading subjects
  if (loadingSubjects) {
    return <div className="h-full w-full"></div>; // Empty div during loading
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-full p-6 sm:w-[80%] md:w-[70%] xl:w-full">
          <div className="lg:px-0">
            <SubjectsHeader
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              onExportCSV={handleExportCSV}
            />

            <div className="mt-7">
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-[#043B44]">
                  <thead className="bg-[#117C90] text-white dark:bg-[#043B44]">
                    <tr>
                      <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                      {t('assignedSubjects.tableHeaders.subject')}
                      </th>
                      <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                      {t('assignedSubjects.tableHeaders.grade')}
                      </th>
                      <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                      {t('assignedSubjects.tableHeaders.term')}
                      </th>
                      <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                      {t('assignedSubjects.tableHeaders.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSubjects.length > 0 ? (
                      paginatedSubjects.map((subject, index) => (
                        <tr
                          key={subject._id || index}
                          className={`${
                            index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                          } hover:bg-[#117C90]/70 dark:text-black dark:hover:bg-[#043B44]/70`}
                        >
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {subject.subject}
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {subject.gradeName}
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {subject.term}
                          </td>
                          <td className={`px-3 py-2 text-xs sm:text-sm md:text-base ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                            <Link
                              to={`/admin/edit-assigned-subject/${subject._id}`}
                              className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                            >
                              <i className="far fa-edit text-lg" />
                            </Link>
                            <button
                              className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                              onClick={() => handleDeleteSubject(subject._id)}
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
                          {t('assignedSubjects.emptyState.title')}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                          {t('assignedSubjects.emptyState.description')}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {paginatedSubjects.length > 0 ? (
                <div className="mt-7 flex justify-center lg:justify-end">
                  <Pagination
                    totalItems={subjectsWithGradeName.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedSubjects;
