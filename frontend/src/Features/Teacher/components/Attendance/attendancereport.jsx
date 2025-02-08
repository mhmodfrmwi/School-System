import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "@/Features/Admin/components/AdminRedux/studentSlice";
import { fetchStudentAttendance } from "@/Features/Student/components/StudentRedux/studentAttendanceSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

function Attendancereport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students } = useSelector((state) => state.students);
  const { studentAttendance = [] } = useSelector(
    (state) => state.studentAttendance || {},
  );
  const { classTeachers = [] } = useSelector(
    (state) => state.classTeachers || {},
  );

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const [filters, setFilters] = useState({ level: "" });
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    const classId = classTeachers[0]?.classId?._id;
    if (classId) {
      dispatch(
        fetchStudents({
          classId,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
      );
      dispatch(
        fetchStudentAttendance({
          classId,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
      );
    }
  }, [dispatch, dateRange.startDate, dateRange.endDate, classTeachers]);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        !filters.level || student.gradeId.gradeName === filters.level,
    );
    setFilteredStudents(filtered);
  }, [students, filters.level]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const toggleSelectStudent = (id) => {
    setSelectedStudents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const countAbsences = (studentId) => {
    return studentAttendance.filter(
      (record) => record.student_id === studentId && record.status === "A",
    ).length;
  };

  const uniqueGrades = [...new Set(students.map((s) => s.gradeId?.gradeName))];

  return (
    <div className="mx-auto w-[360px] p-4 sm:w-[550px] md:w-[700px] md:p-6 lg:px-0 xl:w-full">
      <div className="m-auto mb-7 grid w-[90%] grid-cols-1 gap-1 rounded-3xl bg-gray-100 sm:grid-cols-2">
        {classTeachers.map((classteacher) => (
          <button
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[#EFEFEF] py-2 font-medium text-[#117C90] focus:outline-none"
            key={classteacher._id}
            onClick={() =>
              navigate(`/teacher/takeattendance/${classteacher.id}`, {
                state: { classId: classteacher.classId._id },
              })
            }
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white">
              1
            </span>
            Take Attendance
          </button>
        ))}
        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[#117C90] py-2 font-medium text-white focus:outline-none"
          onClick={() => navigate("/teacher/attendancereport")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-white text-[#117C90]">
            2
          </span>
          Attendance Report
        </button>
      </div>
      <h2 className="mb-4 text-left text-2xl font-bold text-[#117C90]">
        See Attendance Summary
      </h2>
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <select
          name="level"
          onChange={handleFilterChange}
          className="border p-2"
          value={filters.level}
        >
          <option value="">Select Grade</option>
          {uniqueGrades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#117C90] text-white">
              <th className="border p-2">Name</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Absences</th>
              <th className="border p-2">Check</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student._id} className="border text-center">
                <td className="border p-2">{student.fullName}</td>
                <td className="border p-2">{student.classId?.className}</td>
                <td className="border p-2">
                  {selectedStudents[student._id]
                    ? countAbsences(student._id) || "0"
                    : "-"}
                </td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={selectedStudents[student._id] || false}
                    onChange={() => toggleSelectStudent(student._id)}
                    className="h-5 w-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={filteredStudents.length}
        itemsPerPage={studentsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Attendancereport;
