import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { fetchClassAttendance } from "../TeacherRedux/takeAttendanceSlice";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";

function Attendancereport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { attendanceRecords = [] } = useSelector(
    (state) => state.takeAttendance || {},
  );
  const { classTeachers = [] } = useSelector(
    (state) => state.classTeachers || {},
  );

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const [filters, setFilters] = useState({
    classId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    dispatch(fetchClassTeacher());
  }, [dispatch]);

  useEffect(() => {
    if (classTeachers.length > 0 && !filters.classId) {
      setFilters((prev) => ({
        ...prev,
        classId: classTeachers[0]?.classId?._id || "",
      }));
    }
  }, [classTeachers, filters.classId]);

  useEffect(() => {
    if (filters.classId && filters.startDate && filters.endDate) {
      dispatch(
        fetchClassAttendance({
          attendanceData: {
            classId: filters.classId,
            startDate: filters.startDate,
            endDate: filters.endDate,
          },
        }),
      );
    }
  }, [dispatch, filters.classId, filters.startDate, filters.endDate]);

  useEffect(() => {
    if (attendanceRecords.length > 0) {
      const filtered = attendanceRecords.filter(
        (student) =>
          !filters.classId || student?.classId?._id === filters.classId,
      );
      setFilteredStudents(filtered);
    }
  }, [attendanceRecords, filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filters.classId && filters.startDate && filters.endDate) {
      dispatch(
        fetchClassAttendance({
          attendanceData: {
            classId: filters.classId,
            startDate: filters.startDate,
            endDate: filters.endDate,
          },
        }),
      );
      setFilters({ classId: "", startDate: "", endDate: "" });
    }
  };

  console.log("attendanceRecords", attendanceRecords);
  const handleFilterChange = (e) =>
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const toggleSelectStudent = (id) =>
    setSelectedStudents((prev) => ({ ...prev, [id]: !prev[id] }));

  const countAbsences = (studentId) =>
    attendanceRecords.filter(
      (record) => record.student?._id === studentId && record.status === "A",
    ).length;

  return (
    <div className="mx-auto w-[360px] p-4 sm:w-[550px] md:w-[700px] md:p-6 lg:px-0 xl:w-full">
      <div className="m-auto mb-7 grid w-[90%] grid-cols-1 rounded-3xl sm:grid-cols-2">
        {classTeachers.map((classteacher) => (
          <button
            key={classteacher._id}
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[#EFEFEF] py-2 font-medium text-[#117C90] focus:outline-none"
            onClick={() =>
              navigate(`/teacher/takeattendance/${classteacher._id}`, {
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

      <form
        onSubmit={handleSubmit}
        className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <select
          name="classId"
          onChange={handleFilterChange}
          className="border p-2"
          value={filters.classId}
        >
          <option value="">Select Class</option>
          {classTeachers.map((teacher) => (
            <option key={teacher.classId?._id} value={teacher.classId?._id}>
              {teacher.classId?.className || "Unnamed Class"}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border p-2"
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border p-2"
        />

        <button
          type="submit"
          className="col-span-2 rounded bg-[#117C90] px-4 py-2 text-white hover:bg-[#0f6a7d] md:col-span-1"
        >
          Generate Report
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#117C90] text-white">
              <th className="border p-2">Name</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Absences</th>
              <th className="border p-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student._id} className="border text-center">
                <td className="border p-2">{student.fullName}</td>
                <td className="border p-2">{student.classId?.className}</td>
                <td className="border p-2">{countAbsences(student._id)}</td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={!!selectedStudents[student._id]}
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
