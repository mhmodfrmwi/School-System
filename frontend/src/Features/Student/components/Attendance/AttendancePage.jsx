import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentAttendance } from "../StudentRedux/studentAttendanceSlice";

const AttendancePage = () => {
  const { studentAttendance } = useSelector((state) => state.studentAttendance);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentAttendance());
  }, [dispatch]);

  const totalSessions = 90;
  const presentCount = studentAttendance.filter((s) => s.status === "P").length;
  const absentCount = totalSessions - presentCount;
  const presentPercentage = (presentCount / totalSessions) * 100;

  const startOfWeek = currentDate.startOf("week");
  const days = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day").format("YYYY-MM-DD"),
  );

  const handlePreviousWeek = () => {
    setCurrentDate(currentDate.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(7, "day"));
  };

  const groupedAttendance = studentAttendance.reduce((acc, record) => {
    const key = record.academic_number;
    if (!acc[key]) acc[key] = { academic_number: key, attendance: {} };
    acc[key].attendance[dayjs(record.date).format("YYYY-MM-DD")] =
      record.status;
    return acc;
  }, {});

  return (
    <div className="mt-10 flex min-h-screen items-start justify-center p-8 font-poppins">
      <div className="w-[90%]">
        <div className="mb-8">
          <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-3xl font-semibold text-transparent">
            Attendance Level
            <span className="absolute bottom-[-9px] left-0 h-[4px] w-[15%] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
          </h1>
          <div className="flex flex-col space-y-4 sm:ml-8 sm:flex-row sm:items-center sm:space-x-8 sm:space-y-0">
            <span className="flex items-center p-4 text-lg font-medium text-green-600 sm:mr-12">
              <span className="mr-2 h-4 w-4 rounded-full bg-green-600"></span>
              Present: {presentCount}
            </span>
            <span className="flex items-center p-4 text-lg font-medium text-red-600 sm:mr-12">
              <span className="mr-2 h-4 w-4 rounded-full bg-red-600"></span>
              Absent: {absentCount}
            </span>
          </div>

          <div className="relative mt-5 w-full max-w-[500px] sm:ml-8 sm:pl-8">
            <div className="h-5 rounded-full bg-gray-200">
              <div
                className="relative h-5 rounded-full bg-gradient-to-r from-green-500 to-green-300"
                style={{ width: `${presentPercentage}%` }}
              >
                <span className="shadow-black-600/50 absolute right-0 top-[-6px] h-8 w-[5px] translate-x-1/2 transform rounded-full bg-green-500 shadow-xl blur-[1px] filter"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
          <table className="min-w-full table-auto bg-white p-6 shadow-md">
            <thead>
              <tr className="border-b border-gray-200">
                <th colSpan="10">
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
              <tr>
                <th className="border-b border-gray-200 px-2 py-4 text-center text-gray-700">
                  Academic Number
                </th>
                {days.map((day, index) => (
                  <th
                    key={index}
                    className="border-b border-l border-gray-200 px-4 py-2 text-center text-gray-700"
                  >
                    {dayjs(day).format("dddd DD")}
                  </th>
                ))}
              </tr>

              {Object.values(groupedAttendance).map((student, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-4 font-medium text-gray-700">
                    {student.academic_number}
                  </td>

                  {days.map((day, dayIndex) => {
                    const status = student.attendance[day] || "";
                    return (
                      <td
                        key={dayIndex}
                        className={`border-l border-gray-200 px-4 py-4 text-center ${
                          status === "P"
                            ? "bg-green-600 font-bold text-white"
                            : "bg-red-600 font-bold text-white"
                        }`}
                      >
                        {status === "P" ? "P" : "A"}
                      </td>
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
