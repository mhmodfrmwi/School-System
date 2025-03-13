import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "../Pagination";
import { fetchClassAttendance } from "../TeacherRedux/takeAttendanceSlice";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";
import Loader from "@/ui/Loader";
import { toast } from "react-toastify";

function Attendancereport() {
  const dispatch = useDispatch();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const classId = location.state?.classId;

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

    if (!filters.classId || !filters.startDate || !filters.endDate) {
      toast.error("All fields are required!");
      return;
    }
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
      <div className="mx-auto  mt-5 w-full px-4">
        <div className="mx-auto mb-20 flex max-w-[90%] flex-wrap overflow-hidden rounded-full border border-gray-300 bg-[#F5F5F5] md:w-[60%] md:flex-nowrap">
          {/* {classTeachers.map((classteacher) => ( */}
          <button
            key={id}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-center font-poppins text-xs font-medium transition-all md:px-6 md:py-3 md:text-sm 
              ${isActive(`/teacher/takeattendance/${id}`)
                ? "bg-[#008394] font-bold text-white"
                : "bg-[#f4f4f4] font-normal text-[#008394]"
              }`}
            onClick={() => {
              navigate(`/teacher/takeattendance/${id}`, {
                state: {
                  classId: classId,
                },
              });
            }}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white">
              1
            </span>
            Take Attendance
          </button>
          {/* ))} */}
          <button
            onClick={() => navigate("/teacher/attendancereport")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-center font-poppins text-xs font-medium transition-all md:px-6 md:py-3 md:text-sm 
            ${isActive(`/teacher/attendancereport/${id}`)
                ? "bg-[#008394] font-bold text-white"
                : "bg-[#f4f4f4] font-normal text-[#008394]"
              }`}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-white text-[#117C90]">
              2
            </span>
            Attendance Report
          </button>
        </div>
      </div>

      <div className="flex ml-8 mb-6 flex-col">
        <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          See Attendance Summary
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[260px]"></div>
      </div>
      <div className="ml-6">
      <form
        onSubmit={handleSubmit}
        className="mb-4 grid font-poppins grid-cols-1 gap-4 md:grid-cols-4"
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
              {` ${teacher.gradeName} - ${teacher.classId?.className}   `}
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
      </div>
      {attendanceStatus === "loading" ? (
        <div>Loading attendance data...</div>
      ) : currentStudents.length > 0 ? (
        <>
        <table className="mx-auto w-full mt-7 font-poppins table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90]">
          <thead className="bg-[#117C90] text-left text-white">
              <tr className="bg-[#117C90] text-white">
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">#</th>
                <th className=" px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Academic Number</th>
                <th className=" px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Name</th>
                <th className=" px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Class</th>
                <th className=" px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Absences</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student,index) => (
                <tr
                  key={student?.student_id?.id}
                  className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                  onClick={() =>
                    navigate(
                      `/teacher/student-attendance-details/${student.student_id}`,
                      {
                        state: { student },
                      },
                    )
                  }
                >
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{index + 1}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{student.academicNumber}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{student.fullName}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{student.className}</td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{student.absences}</td>
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
