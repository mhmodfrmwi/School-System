import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Papa from "papaparse";
import { fetchExamScores } from "../TeacherRedux/examScoreSlice";
import Loader from "@/ui/Loader";
import Pagination from "../Pagination";

const GetStudentsForGrades = () => {
  const { classId, gradeSubjectSemesterId } = useParams();
  const dispatch = useDispatch();
  const { scores, loading, error } = useSelector((state) => state.examScores);
  const navigate = useNavigate();

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
    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
      <div className="flex flex-col">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Exam Scores
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[140px]"></div>
      </div>

      {loading && (
        <p>
          <Loader />
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {scores?.data?.students?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
              <thead>
                <tr className="bg-[#117C90]">
                  <th colSpan="2" className="border p-2 text-center text-white">
                    {scores.data.grade.gradeName} -{" "}
                    {scores.data.subject.subjectName} (Academic Year:{" "}
                    {scores.data.grade.academicYear.startYear} -{" "}
                    {scores.data.grade.academicYear.endYear})
                  </th>
                </tr>
                <tr>
                  <th className="border bg-[#117C90] p-2 text-white">
                    Academic Number
                  </th>
                  <th className="border bg-[#117C90] p-2 text-white">
                    Full Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr
                    key={student.academic_number}
                    className="hover:bg-gray-100"
                  >
                    <td className="border p-2">{student.academic_number}</td>
                    <td className="border p-2">{student.fullName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Pagination
              totalItems={scores?.data?.students.length || 0}
              itemsPerPage={studentsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleExportCSV}
              className="rounded bg-[#117C90] p-2 text-white"
            >
              Export to CSV
            </button>

            <button
              onClick={handleGoToUploadPage}
              className="ml-4 rounded bg-[#117C90] p-2 text-white"
            >
              Go to Upload File
            </button>
          </div>
        </>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default GetStudentsForGrades;
