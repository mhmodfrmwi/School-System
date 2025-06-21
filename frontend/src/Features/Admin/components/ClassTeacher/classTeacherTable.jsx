import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClassTeachers,
  removeClassTeacher,
} from "../AdminRedux/classTeacherSlice";
import Pagination from "../Pagination";
import Header from "./classTeacherHeader";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

const ClassTeacherTable = () => {
  const { t, i18n } = useTranslation();
  const { classTeachers = [], loading} = useSelector(
    (state) => state.classTeacher || {},
  );
  const dispatch = useDispatch();
  const isRTL = i18n.language === 'ar';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const { id } = useParams(); 
  useEffect(() => {
    if (id) {
      dispatch(fetchClassTeachers(id));
    }
  }, [dispatch, id]);

  const filteredClassTeachers = classTeachers.filter((classTeacher) => {
    const lowerSearchText = searchText.toLowerCase();

    if (filterOption) {
      if (filterOption === "class") {
        return classTeacher.className
          ?.toLowerCase()
          .includes(lowerSearchText);
      }
      if (filterOption === "subject") {
        return classTeacher.subjectName
          ?.toLowerCase()
          .includes(lowerSearchText);
      }
      if (filterOption === "teacher") {
        return classTeacher.teacherName
          ?.toLowerCase()
          .includes(lowerSearchText);
      }
      if (filterOption === "academicYear") {
        return (
          classTeacher.startYear
            ?.toString()
            .toLowerCase()
            .includes(lowerSearchText) ||
          classTeacher.endYear
            ?.toString()
            .toLowerCase()
            .includes(lowerSearchText)
        );
      }
    }

    // Default search (if no filter selected)
    return (
      classTeacher.className
        ?.toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.subjectName
        ?.toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.teacherName
        ?.toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.startYear
        ?.toString()
        .toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.endYear
        ?.toString()
        .toLowerCase()
        .includes(lowerSearchText)
    );
  });

  const paginatedClassTeachers = filteredClassTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (classTeacherId) => {
    const confirmDelete = window.confirm(
      t("teacherTable.deleteConfirmation1"),
    );
    if (confirmDelete) {
      try {
        await dispatch(removeClassTeacher(classTeacherId)).unwrap();
        // No need for additional toast since reducer handles it
      } catch (error) {
        console.error("Delete error:", error);
        // Reducer already shows toast, so no additional toast here
      }
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearchChange = (search) => {
    setSearchText(search);
    setCurrentPage(1);
  };
  const handleFilterChange = (filter) => {
    setFilterOption(filter);
    setCurrentPage(1);
  };

  const getClassDetails = useMemo(() => {
    return (classTeacher) => {
      if (classTeacher) {
        return {
          className: classTeacher.className || t("teacherdata.Classnotfound"),
          gradeName: classTeacher.gradeName || t("teacherdata.NoGrade"),
        };
      }
      return { className: t("teacherdata.Classnotfound"), gradeName: t("teacherdata.NoGrade") };
    };
  }, [t]);

  const getTeacherName = (classTeacher) => {
    return classTeacher.teacherName || t("teacherdata.NoTeacherAssigned");
  };

  const handleExportCSV = () => {
    const dataToExport = filteredClassTeachers.map(classTeacher => ({
      [t("tableHeaders.Class")]: `${getClassDetails(classTeacher).className} - ${getClassDetails(classTeacher).gradeName}`,
      [t("tableHeaders.subject")]: classTeacher.subjectName || t("teacherdata.NoSubject"),
      [t("tableHeaders.teacher")]: getTeacherName(classTeacher),
      [t("tableHeaders.AcademicYear")]: `${classTeacher.startYear || ''} - ${classTeacher.endYear || ''}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ClassTeachers");

    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    
    XLSX.writeFile(workbook, `class_teachers_${dateString}.xlsx`);
  };

  if (loading) {
    return <div className="h-full w-full"></div>;
  }

  return (
    <div className="relative w-full px-4 sm:w-full lg:px-0" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header
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
                  {t("tableHeaders.Class")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                  {t("tableHeaders.subject")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                  {t("tableHeaders.teacher")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                  {t("tableHeaders.AcademicYear")}
                </th>
                <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                  {t("tableHeaders.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedClassTeachers.length > 0 ? (
                paginatedClassTeachers.map((classTeacher, index) => (
                  <tr
                    key={classTeacher.classTeacherId}
                    className={`dark:text-black ${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:hover:bg-[#043B44]/70`}
                  >
                    <td className="px-3 py-2">
                      {getClassDetails(classTeacher).className} -{" "}
                      {getClassDetails(classTeacher).gradeName}
                    </td>
                    <td className="px-3 py-2">
                      {classTeacher.subjectName}
                    </td>
                    <td className="px-3 py-2">
                      {getTeacherName(classTeacher)}
                    </td>
                    <td className="px-3 py-2">
                      {classTeacher.startYear} - {classTeacher.endYear}
                    </td>
                    <td className="px-3 py-2">
                      <div className={`inline-flex ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                        <Link
                          to={`/admin/edit-class-teacher/${classTeacher.classTeacherId}`}
                          className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                        >
                          <i className="far fa-edit text-lg" />
                        </Link>
                        <button
                          aria-label="Delete class teacher"
                          onClick={() => handleDelete(classTeacher.classTeacherId)}
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
                    colSpan="5"
                    className="rounded-lg border-2 border-[#E3E8F1] bg-[#F7FAFC] py-28 text-center shadow-md"
                  >
                    <p className="text-lg font-semibold text-gray-600">
                      {t("teacherTable.noTeachersFound.title1")}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {t("teacherTable.noTeachersFound.description1")}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {paginatedClassTeachers.length > 0 ? (
          <div className="mt-7 flex justify-center lg:justify-end">
            <Pagination
              totalItems={filteredClassTeachers.length}
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

export default ClassTeacherTable;