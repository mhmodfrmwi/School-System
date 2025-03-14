import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchStudentExamResult,
  removeFile,
  updateFileGrades,
} from "../TeacherRedux/examScoreSlice";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import Loader from "@/ui/Loader";
import { toast } from "react-toastify";
import Papa from "papaparse";

function GetStudentsWithGrades() {
  const { classId, gradeSubjectSemesterId, type } = useParams();
  const dispatch = useDispatch();
  const { studentResult, loading } = useSelector((state) => state.examScores);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (classId && gradeSubjectSemesterId && type) {
      dispatch(
        fetchStudentExamResult({ classId, gradeSubjectSemesterId, type }),
      );
    }
  }, [dispatch, type, classId, gradeSubjectSemesterId]);

  useEffect(() => {
    if (studentResult?.data?.students) {
      const uniqueStudents = studentResult.data.students.reduce(
        (acc, student) => {
          const existingStudent = acc.find(
            (s) => s.academic_number === student.academic_number,
          );
          if (!existingStudent) {
            acc.push(student);
          }
          return acc;
        },
        [],
      );
      setStudents(uniqueStudents);
    }
  }, [studentResult]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleExport = () => {
    if (!students.length || !studentResult?.data) {
      toast.error("No data to export.");
      return;
    }

    const { type, finalDegree } = studentResult.data;

    const typeRow = ["type", type];
    const finalDegreeRow = ["finalDegree", finalDegree];

    const headerRow = ["academic_number", "fullName", "examGrade"];

    const csvData = students.map((student) => [
      student.academic_number,
      student.fullName,
      student.examGrade || "",
    ]);

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

    toast.success("CSV file exported successfully!");
  };

  const handleDeleteAll = async () => {
    if (!classId || !gradeSubjectSemesterId || !type)
      return toast.error("Missing required parameters. Cannot delete data.");

    await dispatch(removeFile({ classId, gradeSubjectSemesterId, type }));
    toast.success("All student records deleted.");

    setStudents([]);
    dispatch(fetchStudentExamResult({ classId, gradeSubjectSemesterId, type }));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    dispatch(updateFileGrades({ classId, gradeSubjectSemesterId, formData }))
      .unwrap()
      .then(() => {
        toast.success("File uploaded successfully!");

        dispatch(
          fetchStudentExamResult({ classId, gradeSubjectSemesterId, type }),
        );
      })
      .catch((error) => {
        toast.error(`Upload failed: ${error.message}`);
      });

    setFile(null);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const currentStudents = students.slice(
    indexOfLastStudent - studentsPerPage,
    indexOfLastStudent,
  );

  if (loading) return <Loader />;

  if (!studentResult?.data?.type) {
    return (
      <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-[90%]">
        <h1 className="mb-4 text-2xl font-semibold text-[#117C90]">
          Student Exam Results
        </h1>
        <div>No student results found.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto font-poppins w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-[90%]">
      <h1 className=" text-2xl font-semibold text-[#117C90]">
        Student Exam Results
      </h1>

      {students.length ? (
        <div>
          {/* Display type and finalDegree above the table */}
          <div className="mb-4 flex flex-col gap-2 py-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#105E6A]">Type:</span>
              <span className="text-[#117C90]">{studentResult?.data?.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#105E6A]">Final Degree:</span>
              <span className="text-[#117C90]">
                {studentResult?.data?.finalDegree}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#117C90] shadow-lg">
            <table className="min-w-full">
              <thead className="bg-[#117C90] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-poppins font-semibold">
                    Academic Number
                  </th>
                  <th className="px-4 py-3 text-left font-poppins font-semibold">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left font-poppins font-semibold">
                    Exam Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map(
                  (
                    {
                      academic_number,
                      fullName,
                      academic_year,
                      other_degree,
                      examGrade,
                    },
                    index,
                  ) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border-b border-[#117C90] px-4 py-3 font-poppins text-[#105E6A]">
                        {academic_number}
                      </td>
                      <td className="border-b border-[#117C90] px-4 py-3 font-poppins text-[#105E6A]">
                        {fullName}
                      </td>
                      <td className="border-b border-[#117C90] px-4 py-3 font-poppins text-[#105E6A]">
                        {examGrade}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>


            <div className="flex flex-col justify-between gap-6 p-4 sm:flex-row sm:items-center">
              <div className="flex flex-col items-center gap-4">
                <label
                  className={`w-64 cursor-pointer rounded-lg border-2 border-dashed p-3 text-center transition-all ${file
                    ? "border-green-500 bg-green-100 text-green-700"
                    : "border-gray-400 bg-gray-100 text-gray-500"
                    }`}
                >
                  {file ? file.name : "Choose a file"}
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleUpload}
                  className="w-full rounded-lg bg-gradient-to-r from-[#105E6A] to-[#117C90] px-4 py-2 font-poppins text-white transition hover:opacity-90"
                >
                  Upload & Update
                </button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={handleExport}
                  className="rounded-lg bg-gradient-to-r from-[#105E6A] to-[#117C90] px-4 py-2 font-poppins text-white transition hover:opacity-90"
                >
                  Export Data
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="rounded-lg bg-gradient-to-r from-[#105E6A] to-[#117C90] px-4 py-2 font-poppins text-white transition hover:opacity-90"
                >
                  Delete All Data
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end p-4">
            <Pagination
              totalItems={students.length}
              itemsPerPage={studentsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
          
        </div>
      ) : (
        <div className="font-poppins text-lg text-gray-600">
          No student results found.
        </div>
      )}
    </div>
  );
}

export default GetStudentsWithGrades;