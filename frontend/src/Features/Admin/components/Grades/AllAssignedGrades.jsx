import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAssignedGrades,
  deleteAssignedGrade,
} from "../AdminRedux/AssignGradeSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import Header from "./GradeHeader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useTranslation } from 'react-i18next';
const AllAssignedGrades = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { assignedGrades, loading } = useSelector((state) => state.assignGrade);
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAssignedGrades());
    dispatch(fetchGrades());
  }, [dispatch]);

  const filteredGrades = assignedGrades.filter(
    (gradeData) => gradeData?.gradeId && gradeData?.gradeId._id === id,
  );

  const gradesWithGradeName = filteredGrades.map((gradeData) => {
    return {
      ...gradeData,
      gradeName: gradeData.gradeId ? gradeData.gradeId.gradeName : t("grade.table.unknown"),
      startYear: gradeData.academicYear_id.startYear,
      endYear: gradeData.academicYear_id.endYear,
    };
  });

  const handleDeleteGrade = (_id) => {
    if (_id) {
      const confirmDelete = window.confirm(
        t("grade.form.messages.deleteConfirm"),
      );
      if (confirmDelete) {
        dispatch(deleteAssignedGrade(_id));
      }
    } else {
      toast.error(t("grade.table.error"));
    }
  };

  const paginatedGrades = gradesWithGradeName.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => setCurrentPage(page);
  if (loading) {
    return <div className="h-full w-full"></div>; // Empty div during loading
  }
  return (
    <div className="lg:px-0">
      <Header />
      <div className="mx-auto mt-7 w-[90%] overflow-x-auto shadow-[#117C90] dark:shadow-[#043B44]">
        <table className="w-full table-auto border-collapse overflow-hidden rounded-lg bg-[#FBE9D1] shadow-md">
          <thead className="bg-[#117C90] text-white dark:bg-[#043B44]">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium sm:text-sm md:text-base">
              {t("grade.table.columns.grade")}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium sm:text-sm md:text-base">
              {t("grade.table.columns.academicYear")}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium sm:text-sm md:text-base">
              {t("grade.table.columns.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedGrades.length > 0 ? (
              paginatedGrades.map((gradeData, index) => (
                <tr
                  key={gradeData._id || index}
                  className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} transition duration-300 hover:bg-[#117C90]/70 dark:text-black dark:hover:bg-[#043B44]/70`}
                >
                  <td className="px-4 py-2 text-xs sm:text-sm md:text-base">
                    {gradeData.gradeName}
                  </td>
                  <td className="px-4 py-2 text-xs sm:text-sm md:text-base">
                    {gradeData.startYear} - {gradeData.endYear}
                  </td>
                  <td className="flex justify-start gap-4 px-4 py-2 text-[#117C90]">
                    <Link
                      to={`/admin/editAssignedGrade/${gradeData._id}`}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-[#043B44]"
                    >
                      <i className="far fa-edit text-lg" />
                    </Link>

                    <button
                      className="text-[#E74833] transition duration-300 hover:text-white"
                      onClick={() => handleDeleteGrade(gradeData._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="rounded-lg border-2 border-[#E3E8F1] bg-[#F7FAFC] py-28 text-center shadow-md"
                >
                  <p className="text-lg font-semibold text-gray-600">
                  {t("grade.form.messages.noGrades")}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                  {t("grade.form.messages.noGradesMessage")}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredGrades.length > 0 && (
          <div className="mt-7 flex justify-center lg:justify-end">
            <Pagination
              totalItems={filteredGrades.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAssignedGrades;
