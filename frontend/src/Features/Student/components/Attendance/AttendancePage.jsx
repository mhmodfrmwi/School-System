import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentAttendance } from "../StudentRedux/studentAttendanceSlice";
import Loader from "@/ui/Loader";

const AttendancePage = () => {
  const { studentAttendance, loading } = useSelector(
    (state) => state.studentAttendance,
  );
  const [currentDate, setCurrentDate] = useState(dayjs());
  const dispatch = useDispatch();
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    dispatch(fetchStudentAttendance());
  }, [dispatch]);

  const uniqueAttendance = studentAttendance.reduce((acc, record) => {
    const key = `${record.date.split("T")[0]}-${record.studentId}`;
    acc.set(key, record);
    return acc;
  }, new Map());

  const attendanceArray = Array.from(uniqueAttendance.values());

  const groupedByDate = attendanceArray.reduce((acc, record) => {
    const date = record.date.split("T")[0];
    if (!acc[date]) {
      acc[date] = { totalSessions: 0, presentCount: 0, absentCount: 0 };
    }

    acc[date].totalSessions += 1;
    if (record.status === "P") {
      acc[date].presentCount += 1;
    } else {
      acc[date].absentCount += 1;
    }

    return acc;
  }, {});

  const attendanceStats = Object.keys(groupedByDate).map((date) => {
    const { totalSessions, presentCount, absentCount } = groupedByDate[date];
    return {
      date,
      totalSessions,
      presentCount,
      absentCount,
      presentPercentage:
        totalSessions > 0 ? (presentCount / totalSessions) * 100 : 0,
      absentPercentage:
        totalSessions > 0 ? (absentCount / totalSessions) * 100 : 0,
    };
  });

  const startOfWeek = currentDate.startOf("week");
  const days = Array.from({ length: 21 }, (_, i) =>
    startOfWeek.add(i, "day").format("YYYY-MM-DD"),
  );

  const handlePreviousWeek = () =>
    setCurrentDate(currentDate.subtract(7, "day"));
  const handleNextWeek = () => setCurrentDate(currentDate.add(7, "day"));

  const groupedAttendance = attendanceArray.reduce((acc, record) => {
    const key = record.academic_number;
    if (!acc[key]) acc[key] = { academic_number: key, attendance: {} };
    acc[key].attendance[dayjs(record.date).format("YYYY-MM-DD")] =
      record.status;
    return acc;
  }, {});

  if (loading) return <Loader role={role} />;

  return (
    <div className="mt-10 flex min-h-screen items-start justify-center p-8 font-poppins">
      <div className="w-[90%]">
        <div className="mb-8">
          <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-3xl font-semibold text-transparent">
            Attendance Level
            <span className="absolute bottom-[-9px] left-0 h-[4px] w-[100px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
          </h1>

          <div className="flex flex-col space-y-4 sm:ml-8 sm:flex-row sm:items-center sm:space-x-8 sm:space-y-0">
            <span className="flex items-center p-4 text-lg font-medium text-green-600 sm:mr-12">
              <span className="mr-2 h-4 w-4 rounded-full bg-green-600"></span>
              Present:{" "}
              {attendanceStats.reduce((sum, day) => sum + day.presentCount, 0)}
            </span>
            <span className="flex items-center p-4 text-lg font-medium text-red-600 sm:mr-12">
              <span className="mr-2 h-4 w-4 rounded-full bg-red-600"></span>
              Absent:{" "}
              {attendanceStats.reduce((sum, day) => sum + day.absentCount, 0)}
            </span>
          </div>

          <div className="relative mt-5 w-full max-w-[500px] sm:ml-8 sm:pl-8">
            <div className="h-5 rounded-full bg-gray-200">
              <div
                className="relative h-5 rounded-full bg-gradient-to-r from-green-500 to-green-300"
                style={{
                  width: `${
                    attendanceStats.length > 0
                      ? (attendanceStats.reduce(
                          (sum, day) => sum + day.presentCount,
                          0,
                        ) /
                          attendanceStats.reduce(
                            (sum, day) => sum + day.totalSessions,
                            0,
                          )) *
                        100
                      : 0
                  }%`,
                }}
              >
                <span className="shadow-black-600/50 absolute right-0 top-[-6px] h-8 w-[5px] translate-x-1/2 transform rounded-full bg-green-500 shadow-xl blur-[1px] filter"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md mt-12 mb-12">
          <table className="min-w-full table-auto bg-white p-6 shadow-md">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="border-b border-gray-200 px-2 py-4 text-center text-gray-700">
                  Academic Number: {Object.values(groupedAttendance)[0]?.academic_number || "N/A"}
                </th>
                <th colSpan="6">
                  <div className="mb-6 mr-6 mt-6 flex flex-nowrap items-center justify-end">
                    <button
                      onClick={handlePreviousWeek}
                      className="rounded-xl border-2 border-[#FFB7B7] bg-white px-2 py-2 font-medium text-[#FFB7B7] hover:text-gray-800"
                    >
                      &lt;
                    </button>
                    <h2 className="mx-4 rounded-xl border border-gray-200 bg-[#FFB7B7] px-4 py-2 text-center text-lg font-medium text-white">
                      {startOfWeek.format("MMM DD")} -{" "}
                      {startOfWeek.add(6, "day").format("MMM DD, YYYY")}
                    </h2>
                    <button
                      onClick={handleNextWeek}
                      className="rounded-xl border-2 border-[#FFB7B7] bg-white px-2 py-2 font-medium text-[#FFB7B7] hover:text-gray-800"
                    >
                      &gt;
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {[...Array(7)].map((_, dayIndex) => (
                <tr key={dayIndex} className="border-b border-gray-200">
                  {[...Array(3)].map((_, colIndex) => {
                    const day = days[colIndex * 7 + dayIndex];
                    const status =
                      Object.values(groupedAttendance)[0]?.attendance[day] || "";
                    const isToday = dayjs(day).isSame(dayjs(), "day");
                    return (
                      <React.Fragment key={colIndex}>
                        <td  style={{ width: "70px" }}
                          className={`border-l border-gray-200 px-2 py-5 text-center text-gray-800 ${isToday ? "bg-gradient-to-r from-[#FD813D]/10 via-[#CF72C0]/10 to-[#BC6FFB]/10" : ""}`}
                        >
                          {dayjs(day).format("dddd DD")}
                        </td>
                        <td  style={{ width: "50px" }}
                          className={`border-l border-gray-200 px-5 py-5 text-center ${status === "P" ? "bg-green-600 text-white" : status === "A" ? "bg-red-600 text-white" : ""}`}
                        >
                          {status}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;