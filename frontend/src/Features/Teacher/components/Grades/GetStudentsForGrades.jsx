import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Papa from "papaparse";
import { fetchExamScores } from "../TeacherRedux/examScoreSlice";
import Loader from "@/ui/Loader";
import Pagination from "../Pagination";
import { useTranslation } from 'react-i18next';

const GetStudentsForGrades = () => {
  const { classId, gradeSubjectSemesterId } = useParams();
  const dispatch = useDispatch();
  const { t ,i18n} = useTranslation();
  const { scores, loading, error } = useSelector((state) => state.examScores);
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    if (classId && gradeSubjectSemesterId) {
      dispatch(fetchExamScores({ classId, gradeSubjectSemesterId }));
    }
  }, [dispatch, classId, gradeSubjectSemesterId]);

  const handleExportCSV = () => {
    if (!scores?.data?.students) return;

    const typeRow = {
      academic_number: "type",
      fullName: "",
      examGrade: "",
    };
    const finalDegreeRow = {
      academic_number: "finalDegree",
      fullName: "",
      examGrade: "",
    };

    const headerRow = {
      academic_number: "academic_number",
      fullName: "fullName",
      examGrade: "examGrade",
    };

    const csvData = scores.data.students.map((student) => ({
      academic_number: student.academic_number,
      fullName: student.fullName,
      examGrade: "",
    }));

    const finalCsvData = [typeRow, finalDegreeRow, headerRow, ...csvData];

    const csv = Papa.unparse(finalCsvData, { header: false });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students_exam_scores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoToUploadPage = () => {
    navigate(`/teacher/exam-score/upload/${classId}/${gradeSubjectSemesterId}`);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = scores?.data?.students.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto font-poppins w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
      <div className="flex flex-col">
        <h1 className="font-poppins text-lg font-semibold text-[#117C90] dark:text-DarkManager sm:text-xl lg:text-2xl">
          {t('gradest.ExamScores')}
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#117C90] dark:bg-DarkManager lg:h-[4px] lg:w-[140px]"></div>
      </div>

      {loading && (
        <p>
          <Loader />
        </p>
      )}
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

      {scores?.data?.students?.length > 0 ? (
        <>
          <div className="my-4 text-lg text-black">
            <span className="text-xl font-semibold">{t('gradest.AcademicYear')}:</span>{" "}
            {scores.data.grade.academicYear.startYear} -{" "}
            {scores.data.grade.academicYear.endYear}
          </div>
          <div className="my-4 text-lg text-black">
            <span className="text-xl font-semibold">{t('examst.Grade')}:</span>{" "}
            {scores.data.grade.gradeName}{" "}
          </div>
          <div className="my-4 text-lg text-black">
            <span className="text-xl font-semibold">{t('examst.Subject')}:</span>{" "}
            {scores.data.subject.subjectName}
          </div>

          <div className="mb-6 flex justify-between">
            <button
              onClick={handleExportCSV}
              className="rounded-lg bg-[#117C90] px-4 py-2 font-poppins text-white transition hover:opacity-90 dark:bg-DarkManager dark:hover:bg-[#2A2A2A]"
            >
              {t('gradest.ExportCSV')}
            </button>

            <button
              onClick={handleGoToUploadPage}
              className="rounded-lg bg-[#117C90] px-4 py-2 font-poppins text-white transition hover:opacity-90 dark:bg-DarkManager dark:hover:bg-[#2A2A2A]"
            >
              {t('gradest.UploadFile')}
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#117C90] dark:border-DarkManager shadow-lg">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#117C90] text-white dark:bg-DarkManager">
                  <th className={`px-4 py-3 text-${isRTL ? 'right' : 'left'} font-poppins font-semibold`}>#</th>
                  <th className={`px-4 py-3 text-${isRTL ? 'right' : 'left'} font-poppins font-semibold`}>
                    {t('attendans.AcademicNumber')}
                  </th>
                  <th className={`px-4 py-3 text-${isRTL ? 'right' : 'left'} font-poppins font-semibold`}>
                    {t('assignmentt.StudentName')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr
                    key={student.academic_number}
                    className={`${
                      index % 2 === 0 ? "bg-[#F5FAFF] " : "bg-white "
                    } hover:bg-[#117C90]/70 dark:hover:bg-DarkManager/70`}
                  >
                    <td className="border-b border-[#117C90] dark:border-DarkManager px-4 py-3 font-poppins text-base dark:text-DarkManager ">
                      {index + 1}
                    </td>
                    <td className="border-b border-[#117C90] dark:border-DarkManager px-4 py-3 font-poppins text-base dark:text-DarkManager">
                      {student.academic_number}
                    </td>
                    <td className="border-b border-[#117C90] dark:border-DarkManager px-4 py-3 font-poppins text-base dark:text-DarkManager">
                      {student.fullName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <Pagination
              totalItems={scores?.data?.students.length || 0}
              itemsPerPage={studentsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <p className="font-poppins text-lg text-gray-600 ">No students found.</p>
      )}
    </div>
  );
};

export default GetStudentsForGrades;