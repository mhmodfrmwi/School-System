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
  const { studentAttendance } = useSelector((state) => state.studentAttendance);

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const [filters, setFilters] = useState({ level: "", class: "" });
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchStudentAttendance());
  }, [dispatch]);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        (!filters.level || student.gradeId.gradeName === filters.level) &&
        (!filters.class || student.classId.className === filters.class),
    );
    setFilteredStudents(filtered);
  }, [students, filters]);

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

  console.log(studentAttendance);

  const countAbsences = (studentId) => {
    const uniqueAbsenceDays = new Set();

    studentAttendance.forEach((record) => {
      if (record.student_id === studentId && record.status === "A") {
        const recordDate = new Date(record.date).toISOString().split("T")[0];

        const startDate = dateRange.startDate
          ? new Date(dateRange.startDate).toISOString().split("T")[0]
          : null;
        const endDate = dateRange.endDate
          ? new Date(dateRange.endDate).toISOString().split("T")[0]
          : null;

        if (
          (!startDate || recordDate >= startDate) &&
          (!endDate || recordDate <= endDate)
        ) {
          uniqueAbsenceDays.add(recordDate);
        }
      }
    });

    return uniqueAbsenceDays.size;
  };

  const uniqueGrades = [...new Set(students.map((s) => s.gradeId.gradeName))];
  const uniqueClasses = [...new Set(students.map((s) => s.classId.className))];

  return (
    <div className="mx-auto w-[360px] p-4 sm:w-[550px] md:w-[700px] md:p-6 lg:px-0 xl:w-full">
      <div className="m-auto mb-7 grid w-[90%] grid-cols-1 gap-1 rounded-3xl bg-gray-100 sm:grid-cols-2">
        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] py-2 font-medium text-[#117C90] focus:outline-none"
          onClick={() => navigate("/teacher/takeattendance")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white">
            1
          </span>
          Take Attendance
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] bg-[#117C90] py-2 font-medium text-white focus:outline-none"
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
        >
          <option value="">Select Grade</option>
          {uniqueGrades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        <select
          name="class"
          onChange={handleFilterChange}
          className="border p-2"
        >
          <option value="">Select Class</option>
          {uniqueClasses.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="startDate"
          value={dateRange.startDate}
          onChange={handleDateChange}
          className="border p-2"
        />
        <input
          type="date"
          name="endDate"
          value={dateRange.endDate}
          onChange={handleDateChange}
          className="border p-2"
        />
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
                <td className="border p-2">{student.classId.className}</td>
                <td className="border p-2">
                  {selectedStudents[student._id]
                    ? countAbsences(student._id) || "0"
                    : "-"}
                </td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer appearance-none rounded-md border-2 border-gray-400 transition-all checked:border-black checked:bg-black checked:ring-2 checked:ring-gray-600 checked:before:flex checked:before:h-full checked:before:w-full checked:before:items-center checked:before:justify-center checked:before:text-xs checked:before:text-white checked:before:content-['✔'] sm:h-5 sm:w-5 sm:checked:before:text-sm"
                    checked={selectedStudents[student._id] || false}
                    onChange={() => toggleSelectStudent(student._id)}
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
