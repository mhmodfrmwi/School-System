import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStudentExamResult } from "../TeacherRedux/examScoreSlice";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import Loader from "@/ui/Loader";

function GetStudentsWithGrades() {
  const { scoreId, classId } = useParams();
  const dispatch = useDispatch();
  const { studentResult, loading } = useSelector((state) => state.examScores);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    if (scoreId && classId) {
      dispatch(fetchStudentExamResult({ scoreId, classId }));
    }
  }, [dispatch, scoreId, classId]);

  if (loading) {
    return <Loader />;
  }

  const examData = studentResult?.data;
  const students = examData?.students || [];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-semibold text-[#117C90]">
          Student Exam Results
        </h1>

        {examData && (
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-[#117C90] p-4 text-white">
                <h2 className="text-lg font-semibold">Final Degree</h2>
                <p>{examData.finalDegree}</p>
              </div>
              <div className="rounded-lg bg-[#117C90] p-4 text-white">
                <h2 className="text-lg font-semibold">Grade</h2>
                <p>{examData.grade.gradeName}</p>
              </div>
              <div className="rounded-lg bg-[#117C90] p-4 text-white">
                <h2 className="text-lg font-semibold">Semester</h2>
                <p>{examData.semester.semesterName}</p>
              </div>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          {students.length > 0 ? (
            <>
              <table className="min-w-full border border-gray-300 bg-white">
                <thead className="bg-[#117C90] text-white">
                  <tr className=" ">
                    <th className="border-b px-4 py-2">Academic Number</th>
                    <th className="border-b px-4 py-2">Full Name</th>
                    <th className="border-b px-4 py-2">Exam Grade</th>
                  </tr>
                </thead>

                <tbody>
                  {currentStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border-b px-4 py-2 text-center">
                        {student.academic_number}
                      </td>
                      <td className="border-b px-4 py-2 text-center">
                        {student.fullName}
                      </td>
                      <td className="border-b px-4 py-2 text-center">
                        {student.examGrade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Component */}
              <div className="mt-4 flex justify-end">
                <Pagination
                  totalItems={students.length}
                  itemsPerPage={studentsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div>No student results found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetStudentsWithGrades;
