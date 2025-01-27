import React, { useState } from "react";
import dayjs from "dayjs";
import { FaRegHourglass } from "react-icons/fa";

const AttendancePage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const totalSessions = 7;
  const presentCount = 6;
  const absentCount = 1;

  const presentPercentage = (presentCount / totalSessions) * 100;

  const startOfWeek = currentDate.startOf("week");
  const days = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day").format("dddd DD")
  );

  const handlePreviousWeek = () => {
    setCurrentDate(currentDate.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(7, "day"));
  };

  const schedule = [
    { time: "08:00", subject: "English", day: "Monday", attended: true },
    { time: "10:00", subject: "Art", day: "Monday", attended: true },
    { time: "11:00", subject: "Arabic", day: "Monday", attended: false },
    { time: "12:00", subject: "Math", day: "Monday", attended: true },
    { time: "01:00", subject: "History", day: "Monday", attended: true },
    { time: "02:00", subject: "Science", day: "Monday", attended: true },
    { time: "03:00", subject: "Music", day: "Monday", attended: false },
  ];

  const today = dayjs().format("dddd DD");

  return (
    <div className="min-h-screen flex justify-center items-start p-8 mt-10 font-poppins">
      <div className="w-[90%]">
        {/* Attendance Level Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
            Attendance Level
            <span className="absolute left-0 bottom-[-9px] w-[15%] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:ml-8 space-y-4 sm:space-y-0 sm:space-x-8">
            <span className="flex items-center text-green-600 font-medium text-lg sm:mr-12 p-4">
              <span className="w-4 h-4 bg-green-600 rounded-full mr-2"></span>
              Present: {presentCount}
            </span>
            <span className="flex items-center text-red-600 font-medium text-lg sm:mr-12 p-4">
              <span className="w-4 h-4 bg-red-600 rounded-full mr-2"></span>
              Absent: {absentCount}
            </span>
          </div>

          <div className="relative mt-5 w-full max-w-[500px] sm:ml-8 sm:pl-8">
            <div className="h-5 bg-gray-200 rounded-full">
              <div
                className="h-5 bg-gradient-to-r from-green-500 to-green-300 rounded-full relative"
                style={{ width: `${presentPercentage}%` }}
              >
                <span className="absolute top-[-6px] right-0 h-8 w-[5px] bg-green-500 rounded-full transform translate-x-1/2 shadow-xl shadow-black-600/50 filter blur-[1px]"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="overflow-x-auto shadow-md border border-gray-200 rounded-xl">
          <table className="bg-white shadow-md p-6 min-w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th colSpan="10">
                  <div className="flex justify-end items-center flex-nowrap items-center mb-6 mt-6 mr-6">
                    <button
                      onClick={handlePreviousWeek}
                      className="text-[#FFB7B7] hover:text-gray-800 font-medium bg-white border border-[#FFB7B7] border-2 px-2 py-2 rounded-xl"
                    >
                      &lt;
                    </button>
                    <h2 className="text-lg font-medium text-white bg-[#FFB7B7] text-center border border-gray-200 px-4 py-2 rounded-xl mx-4">
                      {startOfWeek.format("MMM DD")} - {startOfWeek.add(6, "day").format("MMM DD, YYYY")}
                    </h2>
                    <button
                      onClick={handleNextWeek}
                      className="text-[#FFB7B7] hover:text-gray-800 font-medium bg-white border border-[#FFB7B7] border-2 px-2 py-2 rounded-xl"
                    >
                      &gt;
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
              <th className="py-4 px-4 text-gray-700 text-left border-b border-gray-200">
                  <FaRegHourglass className="inline-block w-5 h-5 text-teal-500" /> {/* Hourglass Icon */}
                </th>
                {days.map((day, index) => (
                  <th
                    key={index}
                    className={`py-2 px-4 text-gray-700 text-center border-b border-gray-200 border-l border-gray-200 ${
                      day === today ? "bg-gray-100" : ""
                    }`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
              {/* Time Slots */}
              {schedule.map((session, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700 font-medium">{session.time}</td>
                  {days.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={`py-4 px-4 text-center border-l border-gray-200 ${
                        day === today ? "bg-gray-100" : ""
                      }`}
                    >
                      {day.includes(session.day) && (
                        <div
                          className={`p-4 rounded-lg flex items-center justify-center ${
                            session.attended ? "bg-green-100" : "bg-red-100"
                          } ${session.attended ? "border border-green-400" : "border border-red-400"}`}
                        >
                          <span
                            className={`font-medium ${
                              session.attended ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {session.subject}
                          </span>
                        </div>
                      )}
                    </td>
                  ))}
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
