import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { fetchClassAttendance } from "../TeacherRedux/takeAttendanceSlice";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";
import Loader from "@/ui/Loader";

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
    const processRecords = () => {
      const studentMap = {};

      attendanceRecords.forEach((record) => {
        const studentId = record.student_id?._id;
        if (!studentId) return;

        if (!studentMap[studentId]) {
          studentMap[studentId] = {
            student_id: studentId, // Ensure student_id is present
            fullName: record.student_id?.fullName || "Unknown",
            academicNumber: record.academic_number || "N/A",
            className: record.class_id?.className || "Unknown",
            absences: 0,
          };
        }

        if (record.status === "A") {
          studentMap[studentId].absences += 1;
        }
      });

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

    setFilters({ classId: "", startDate: "", endDate: "" });
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  if (classTeacherStatus === "loading") {
    return <Loader />;
  }

  if (attendanceStatus === "failed") {
    return <div>Error loading attendance records</div>;
  }

  return (
    <div className="mx-auto w-[360px] p-4 sm:w-[550px] md:w-[700px] md:p-6 lg:px-0 xl:w-full">
      <div className="m-auto mb-6 grid w-[90%] grid-cols-1 gap-1 rounded-3xl bg-gray-100 sm:grid-cols-2">
        {classTeachers.map((classteacher) => (
          <button
            key={classteacher.id}
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] py-2 font-medium text-[#117C90] focus:outline-none"
            onClick={() => {
              navigate(`/teacher/takeattendance/${classteacher.id}`, {
                state: {
                  classId: classteacher.classId._id,
                },
              });

              window.location.reload();
            }}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white">
              1
            </span>
            Take Attendance
          </button>
        ))}
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
      <form
        onSubmit={handleSubmit}
        className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4"
      >
        <select
          name="classId"
          onChange={handleFilterChange}
          value={filters.classId}
          className="h-11 w-full border p-2"
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
          className="w-full border p-2"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-[#117C90] px-4 py-2 text-white hover:bg-[#0f6a7d]"
        >
          Generate Report
        </button>
      </form>
      {attendanceStatus === "loading" ? (
        <div>Loading attendance data...</div>
      ) : currentStudents.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#117C90] text-white">
                <th className="border p-2">Academic Number</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Absences</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr
                  key={student?.student_id?.id}
                  className="cursor-pointer border text-center"
                  onClick={() =>
                    navigate(
                      `/teacher/student-attendance-details/${student.student_id}`,
                      {
                        state: { student },
                      },
                    )
                  }
                >
                  <td className="border p-2">{student.academicNumber}</td>
                  <td className="border p-2">{student.fullName}</td>
                  <td className="border p-2">{student.className}</td>
                  <td className="border p-2">{student.absences}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalItems={filteredStudents.length}
            itemsPerPage={studentsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center text-gray-500">
          No attendance records found
        </div>
      )}
    </div>
  );
}

export default Attendancereport;
