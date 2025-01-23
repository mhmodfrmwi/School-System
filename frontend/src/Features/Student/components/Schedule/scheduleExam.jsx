import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/schedule 1.png";
import { useState } from "react";
function ScheduleExam() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([
    ["Subject", "Day", "Date", "Time", "Place"],
    [" ", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  return (
    <>
      <section>
        <div className="mx-auto my-10 grid w-[95%] grid-cols-1 sm:grid-cols-3">
          <div className="col-span-2 flex flex-col justify-between">
            <div className="my-12 ms-4 h-10 rounded-md border-l-8 border-[#8975BF]">
              <h2 className="mb-3 ms-2 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-2xl font-semibold text-transparent">
                Upcoming Smart Classes
              </h2>
            </div>

            <div className="mb-10 ms-1 mt-7">
              <button
                className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent"
                onClick={() => navigate("/student/schedule")}
              >
                {" "}
                Weekly Schedule
              </button>

              <button
                className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium text-white focus:outline-none"
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

        <div className="mx-10 overflow-x-auto bg-[#F5F6F7]">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {schedule[0].map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-center text-black sm:text-sm md:text-base lg:text-lg"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-7 text-center text-[#E47986] sm:text-sm md:text-base lg:text-lg"
                    >
                      {cell}
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
