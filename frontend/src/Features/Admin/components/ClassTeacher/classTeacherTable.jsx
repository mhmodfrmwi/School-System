import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClassTeachers,
  removeClassTeacher,
} from "../AdminRedux/classTeacherSlice";
import { fetchClasses } from "../AdminRedux/classSlice";
import { fetchTeachers } from "../AdminRedux/teacherSlice"; // Fetch teachers
import Pagination from "../Pagination";
import Header from "./classTeacherHeader";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
const ClassTeacherTable = () => {
  const { t ,i18n} = useTranslation();
  const { classTeachers = [], loading } = useSelector(
    (state) => state.classTeacher || {},
  );
  const { classes = [] } = useSelector((state) => state.classes || {});
  const { teachers = [] } = useSelector((state) => state.teachers || {}); // Fetch teachers from the store
  const dispatch = useDispatch();
  const isRTL = i18n.language === 'ar';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const { teacherId } = useParams(); // Get teacherId from URL

  useEffect(() => {
    dispatch(fetchClassTeachers());
    dispatch(fetchClasses());
    dispatch(fetchTeachers()); // Fetch teachers
  }, [dispatch]);

  const filteredClassTeachers = classTeachers.filter((classTeacher) => {
    const lowerSearchText = searchText.toLowerCase();

    if (teacherId) {
      // Filter by teacherId if it's provided in the URL
      return classTeacher.teacherId?._id === teacherId;
    }

    if (filterOption) {
      if (filterOption === "class") {
        return classTeacher.classId?.className
          ?.toLowerCase()
          .includes(lowerSearchText);
      }
      if (filterOption === "subject") {
        return classTeacher.subjectId?.subjectName
          ?.toLowerCase()
          .includes(lowerSearchText);
      }
      if (filterOption === "teacher") {
        return classTeacher.teacherId?.fullName
          ?.toLowerCase()
          .includes(lowerSearchText);
      }
      if (filterOption === "academicYear") {
        return (
          classTeacher.academicYear_id?.startYear
            .toString()
            .toLowerCase()
            .includes(lowerSearchText) ||
          classTeacher.academicYear_id?.endYear
            .toString()
            .toLowerCase()
            .includes(lowerSearchText)
        );
      }
    }

    // Default search (if no filter selected)
    return (
      classTeacher.classId?.className
        ?.toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.teacherId?.fullName
        ?.toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.subjectId?.subjectName
        ?.toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.academicYear_id?.startYear
        .toString()
        .toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.academicYear_id?.endYear
        .toString()
        .toLowerCase()
        .includes(lowerSearchText)
    );
  });

  const paginatedClassTeachers = filteredClassTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      t("teacherTable.deleteConfirmation1"),
    );
    if (confirmDelete) {
      try {
        await dispatch(removeClassTeacher(id));
      } catch (error) {
        console.error(error);
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
    return (classId) => {
      const classItem = classes.find((cls) => cls._id === classId);
      if (classItem) {
        return {
          className: classItem.class_name || classItem.className,
          gradeName: classItem.gradeId
            ? classItem.gradeId.gradeName || classItem.grade_id
            :t("teacherdata.NoGrade"),
        };
      }
      return { className: t("teacherdata.Classnotfound"), gradeName: t("teacherdata.NoGrade") };
    };
  }, [classes]);

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((t) => t._id === teacherId);
    return teacher ? teacher.fullName : t("teacherdata.NoTeacherAssigned");
  };

const handleExportCSV = () => {
  const dataToExport = filteredClassTeachers.map(classTeacher => ({
    [t("tableHeaders.Class")]: `${getClassDetails(classTeacher.classId._id).className} - ${getClassDetails(classTeacher.classId._id).gradeName}`,
    [t("tableHeaders.subject")]: classTeacher.subjectId?.subjectName || t("teacherdata.NoSubject"),
    [t("tableHeaders.teacher")]: getTeacherName(classTeacher.teacherId?._id),
    [t("tableHeaders.AcademicYear")]: `${classTeacher.academicYear_id?.startYear || ''} - ${classTeacher.academicYear_id?.endYear || ''}`
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "ClassTeachers");
  

  const today = new Date();
  const dateString = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  
  XLSX.writeFile(workbook, `class_teachers_${dateString}.xlsx`);
};
  
  if (loading) {
    return <div className="h-full w-full"></div>; // Empty div during loading
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
                <th className= {`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
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
                    key={classTeacher._id}
                    className={`dark:text-black ${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:hover:bg-[#043B44]/70`}
                  >
                    <td className="px-3 py-2">
                      {getClassDetails(classTeacher.classId._id).className} -{" "}
                      {getClassDetails(classTeacher.classId._id).gradeName}
                    </td>
                    <td className="px-3 py-2">
                      {classTeacher.subjectId?.subjectName}
                    </td>
                    <td className="px-3 py-2">
                      {getTeacherName(classTeacher.teacherId?._id)}
                    </td>
                    <td className="px-3 py-2">
                      {classTeacher.academicYear_id?.startYear} -{" "}
                      {classTeacher.academicYear_id?.endYear}
                    </td>
                    <td className="px-3 py-2">
                      <div className={`inline-flex ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                        <Link
                          to={`/admin/edit-class-teacher/${classTeacher._id}`}
                          className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                        >
                          <i className="far fa-edit text-lg" />
                        </Link>
                        <button
                          aria-label="Delete class teacher"
                          onClick={() => handleDelete(classTeacher._id)}
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
