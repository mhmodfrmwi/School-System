import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "@/Features/Admin/components/AdminRedux/studentSlice";
import { postAttendance } from "../TeacherRedux/takeAttendanceSlice";
import { toast } from "react-toastify";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";

function TakeAttendance() {
  const { students } = useSelector((state) => state.students);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [attendance, setAttendance] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  console.log(students);

  const grades = [...new Set(students.map((s) => s.gradeId.gradeName))];
  const classes = [...new Set(students.map((s) => s.classId.className))];

  const filteredStudents = students.filter(
    (student) =>
      (selectedGrade === "" || student.gradeId.gradeName === selectedGrade) &&
      (selectedClass === "" || student.classId.className === selectedClass),
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Promise.all(
        filteredStudents.map((student) =>
          dispatch(
            postAttendance({
              studentName: student.fullName,
              academicNumber: student.academic_number,
              status: attendance[student._id] ? "P" : "A",
            }),
          ).unwrap(),
        ),
      );

      toast.success("Attendance submitted successfully!");
      setAttendance({});
    } catch (error) {
      toast.error(error.message || "Failed to submit attendance");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
      <div className="m-auto mb-7 grid w-[90%] grid-cols-1 gap-1 rounded-3xl bg-gray-100 sm:grid-cols-2">
        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] bg-[#117C90] py-2 font-medium text-white focus:outline-none"
          onClick={() => navigate("/teacher/takeattendance")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-white text-[#117C90]">
            1
          </span>
          Take Attendance
        </button>

        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] py-2 font-medium text-[#117C90] focus:outline-none"
          onClick={() => navigate("/teacher/attendancereport")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white">
            2
          </span>
          Attendance Report
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <h2 className="mb-4 text-left text-2xl font-bold text-[#117C90]">
          Take Attendance
        </h2>

        <div className="mb-4 flex flex-wrap justify-start gap-4 sm:justify-end">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="rounded-md border p-2"
          >
            <option value="">All Grades</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-md border p-2"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="mx-auto w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90]">
          <thead className="bg-[#117C90] text-white">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Class</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Gender</th>
              <th className="px-3 py-2 text-center">Check</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr
                key={student._id}
                className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
              >
                <td className="px-3 py-2">{indexOfFirstStudent + index + 1}</td>
                <td className="px-3 py-2">{student.fullName}</td>
                <td className="px-3 py-2">
                  {new Date(student.updatedAt).toISOString().split("T")[0]}
                </td>
                <td className="px-3 py-2">{student.classId.className}</td>
                <td className="px-3 py-2">{student.email}</td>
                <td className="px-3 py-2">{student.gender}</td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer appearance-none rounded-md border-2 border-gray-400 transition-all checked:border-black checked:bg-black checked:ring-2 checked:ring-gray-600 checked:before:flex checked:before:h-full checked:before:w-full checked:before:items-center checked:before:justify-center checked:before:text-xs checked:before:text-white checked:before:content-['✔'] sm:h-5 sm:w-5 sm:checked:before:text-sm"
                    checked={attendance[student._id] || false}
                    onChange={() => toggleAttendance(student._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-7 flex justify-center lg:justify-end">
        <Pagination
          totalItems={filteredStudents.length}
          itemsPerPage={studentsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex justify-center">
        <button
          type="submit"
          className="rounded-lg bg-[#117C90] px-4 py-2 text-white"
        >
          Take Attendance
        </button>
      </form>
    </div>
  );
}

export default TakeAttendance;
