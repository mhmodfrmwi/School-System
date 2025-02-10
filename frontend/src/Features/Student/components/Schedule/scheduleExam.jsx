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
    <>
      <section>
        <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-3">
          <div className="col-span-2 flex flex-col justify-between">
            <div className="my-12 ml-4 ms-8 flex items-center py-4 md:ml-16 md:ms-14 md:mt-10 lg:ms-20">
              <p className="mr-2 h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB]"></p>
              <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent md:text-2xl">
                Upcoming Smart Classes
              </button>
            </div>

            <div className="mb-10 ms-8 mt-7 md:ms-14 lg:ms-20">
              <button
                className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-2 py-2 text-lg font-medium text-transparent"
                onClick={() => navigate("/student/schedule")}
              >
                Weekly Schedule
              </button>

              <button
                className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-2 py-2 text-lg font-medium text-white focus:outline-none"
                onClick={() => navigate("/student/schedule/exam")}
              >
                Exams Schedule
              </button>
            </div>
          </div>

          <img
            src={img1}
            className="col-span-1 mx-auto mt-10 w-72"
            alt="imgnotfound"
          />
        </div>

        <div className="mx-auto w-[88%] overflow-x-auto bg-[#F5F6F7] shadow-lg rounded-xl">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {schedule[0].map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-6 py-4 text-center text-[#303030] text-lg font-semibold bg-[#D6A3E1] rounded-tl-xl rounded-tr-xl"
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
                  className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                  } hover:bg-[#F3E5F5] transition duration-200`}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-6 py-4 text-center text-[#5e5b63] text-sm sm:text-base lg:text-lg"
                    >
                      {cell || "--"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default ScheduleExam;
