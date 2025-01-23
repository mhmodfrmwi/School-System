import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/schedule 1.png";
import img2 from "../../../../assets/icon.png";
import { useState } from "react";
function Schedule() {
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState([
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    ["08:00", "English", "", "", "", "", "", ""],
    ["09:00", "English", "", "", "", "", "", ""],
    ["10:00", "Arabic", "", "", "", "", "", ""],
    ["11:00", "Chemistry", "", "", "", "", "", ""],
    ["12:00", "Art", "", "", "", "", "", ""],
    ["13:00", "Art", "", "", "", "", "", ""],
    ["14:00", "", "", "", "", "", "", ""],
    ["15:00", "", "", "", "", "", "", ""],
    ["16:00", "", "", "", "", "", "", ""],
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
                className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium text-white focus:outline-none"
                onClick={() => navigate("/student/schedule")}
              >
                {" "}
                Weekly Schedule
              </button>

              <button
                className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent"
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

        <div className="mx-14 rounded-lg border-2 border-[#F5F6F7] bg-[#F5F6F7] shadow-md">
          <div className=" ">
            <div className="mb-4 ms-6 w-60 rounded-md bg-[#FFA4A4] px-4 py-2 text-center text-white sm:w-80">
              Term 1, 2024
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border-l border-t border-gray-300">
                      <img src={img2} className="mx-auto" alt="notfound" />
                    </th>
                    {timetable[0].map((day, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 text-center sm:text-sm md:text-base lg:text-lg"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {timetable.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-4 py-2 text-center text-[#E47986] sm:text-sm md:text-base lg:text-lg"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Schedule;
