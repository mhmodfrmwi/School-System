import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { fetchClassAttendance } from "../TeacherRedux/takeAttendanceSlice";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";

function Attendancereport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { attendanceRecords = [], status: attendanceStatus } = useSelector(
    (state) => state.attendanceTeacher || {},
  );
  const { classTeachers = [], status: classTeacherStatus } = useSelector(
    (state) => state.classTeachers || {},
  );

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [formErrors, setFormErrors] = useState({});
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
    const processRecords = () => {
      const studentMap = attendanceRecords.reduce((acc, record) => {
        const studentId = record.student?._id;
        if (!studentId) return acc;

        if (!acc[studentId]) {
          acc[studentId] = {
            _id: studentId,
            fullName: record.student?.fullName,
            classId: record.classId,
            absences: 0,
            totalDays: 0,
          };
        }

        acc[studentId].totalDays++;
        if (record.status === "A") acc[studentId].absences++;

        return acc;
      }, {});

      setFilteredStudents(Object.values(studentMap));
    };

    if (attendanceRecords.length > 0) {
      processRecords();
    }
  }, [attendanceRecords]);

  const validateForm = () => {
    const errors = {};
    if (!filters.classId) errors.classId = "Class is required";
    if (!filters.startDate) errors.startDate = "Start date is required";
    if (!filters.endDate) errors.endDate = "End date is required";

    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      if (start > end)
        errors.dateRange = "End date cannot be before start date";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(
      fetchClassAttendance({
        attendanceData: {
          classId: filters.classId,
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
      }),
    );
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const toggleSelectStudent = (id) =>
    setSelectedStudents((prev) => ({ ...prev, [id]: !prev[id] }));

  if (classTeacherStatus === "loading") {
    return <div>Loading class information...</div>;
  }

  if (attendanceStatus === "failed") {
    return <div>Error loading attendance records</div>;
  }

  return (
    <div className="mx-auto w-[360px] p-4 sm:w-[550px] md:w-[700px] md:p-6 lg:px-0 xl:w-full">
      <div className="m-auto mb-7 grid w-[90%] grid-cols-1 rounded-3xl sm:grid-cols-2">
        {classTeachers.map((classteacher) => (
          <button
            key={classteacher.id}
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[#EFEFEF] py-2 font-medium text-[#117C90] focus:outline-none"
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

      <form
        onSubmit={handleSubmit}
        className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4"
      >
        <div className="md:col-span-1">
          <select
            name="classId"
            onChange={handleFilterChange}
            className={`h-11 w-full border p-2 ${formErrors.classId ? "border-red-500" : ""}`}
            value={filters.classId}
          >
            <option value="">Select Class</option>
            {classTeachers.map((teacher) => (
              <option key={teacher.classId?._id} value={teacher.classId?._id}>
                {teacher.classId?.className || "Unnamed Class"}
              </option>
            ))}
          </select>
          {formErrors.classId && (
            <p className="text-sm text-red-500">{formErrors.classId}</p>
          )}
        </div>

        <div className="md:col-span-1">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className={`w-full border p-2 ${formErrors.startDate ? "border-red-500" : ""}`}
          />
          {formErrors.startDate && (
            <p className="text-sm text-red-500">{formErrors.startDate}</p>
          )}
        </div>

        <div className="md:col-span-1">
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className={`w-full border p-2 ${formErrors.endDate ? "border-red-500" : ""}`}
          />
          {formErrors.endDate && (
            <p className="text-sm text-red-500">{formErrors.endDate}</p>
          )}
        </div>

        <div className="md:col-span-1">
          <button
            type="submit"
            className="w-full rounded bg-[#117C90] px-4 py-2 text-white hover:bg-[#0f6a7d]"
          >
            Generate Report
          </button>
          {formErrors.dateRange && (
            <p className="mt-1 text-sm text-red-500">{formErrors.dateRange}</p>
          )}
        </div>
      </form>

      {attendanceStatus === "loading" ? (
        <div>Loading attendance data...</div>
      ) : attendanceRecords.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#117C90] text-white">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Absences</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((student) => (
                  <tr key={student._id} className="border text-center">
                    <td className="border p-2">{student.academic_number}</td>
                    <td className="border p-2">{student.class_id}</td>
                    <td className="border p-2">{student.absences}</td>
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
        </>
      ) : (
        <div className="text-center text-gray-500">
          No attendance records found for the selected filters
        </div>
      )}
    </div>
  );
}

export default Attendancereport;
