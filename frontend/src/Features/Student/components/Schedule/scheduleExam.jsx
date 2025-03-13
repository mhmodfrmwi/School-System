import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/schedule 1.png";
import { useState } from "react";

function ScheduleExam() {
  const navigate = useNavigate();
  const [schedule] = useState([
    ["Subject", "Day", "Date", "Time", "Place"],
    ["Math", "Monday", "2025-02-03", "10:00 AM - 12:00 PM", "Room 101"],
    ["Physics", "Tuesday", "2025-02-04", "12:00 PM - 02:00 PM", "Room 202"],
    ["Chemistry", "Wednesday", "2025-02-05", "02:00 PM - 04:00 PM", "Room 303"],
    ["Biology", "Thursday", "2025-02-06", "10:00 AM - 12:00 PM", "Room 404"],
    ["English", "Friday", "2025-02-07", "08:00 AM - 10:00 AM", "Room 505"],
  ]);

  return (
    <section className="font-poppins min-h-screen w-[95%] mx-auto mt-10">
      <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-3">
        <div className="col-span-2 flex flex-col justify-between">
          <div className="ml-4 ms-8 flex items-center py-4 md:ml-16 md:ms-14 lg:ms-20">
            <button className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent md:text-2xl">
              Upcoming Smart Classes
              <span className="absolute bottom-[-9px] left-0 h-[4px] w-[100px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
            </button>
          </div>
          <div className="mb-10 ms-8 mt-7 md:ms-14 lg:ms-20 flex items-center gap-8">
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 text-lg font-medium text-transparent"
              onClick={() => navigate("/student/schedule")}
            >
              Weekly Schedule
            </button>
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] py-2 text-lg font-medium text-white focus:outline-none"
              onClick={() => navigate("/student/schedule/exam")}
            >
              Exams Schedule
            </button>
          </div>
        </div>
        <img
          src={img1}
          className="col-span-1 mx-auto mt-10 w-72"
          alt="Schedule"
        />
      </div>
      <div className="mx-auto w-[88%] rounded-xl border border-gray-200 shadow-md font-poppins mb-20">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white p-6 shadow-md">
            <thead>
              <tr>
                {schedule[0].map((header, index) => (
                  <th
                    key={index}
                    className="border-b border-l border-gray-200 px-4 py-4 text-center text-gray-700 bg-[#D6A3E1]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.slice(1).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-gray-200 ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                  } hover:bg-[#F3E5F5] transition duration-200`}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63]"
                    >
                      {cell || "--"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ScheduleExam;