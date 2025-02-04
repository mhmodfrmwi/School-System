import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/schedule 1.png";
import img2 from "../../../../assets/icon.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchStudentSchedule } from "../StudentRedux/studentScheduleSlice";
function Schedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { studentSchedule } = useSelector((state) => state.studentSchedule);
  // useEffect(() => {
  //   dispatch(fetchStudentSchedule());
  // }, [dispatch]);

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

  // console.log(studentSchedule);
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
                className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-2 py-2 text-lg font-medium text-white focus:outline-none"
                onClick={() => navigate("/student/schedule")}
              >
                {" "}
                Weekly Schedule
              </button>

              <button
                className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-2 py-2 text-lg font-medium text-transparent"
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

        <div className="mx-auto w-[88%] rounded-lg border-2 border-[#F5F6F7] bg-[#F5F6F7] shadow-md">
          <div className=" ">
            <div className="mb-4 ms-6 w-60 rounded-md bg-[#FFA4A4] px-4 py-2 text-center text-white sm:w-80">
              Term 1, 2024
            </div>

            <div className="overflow-x-auto">
              <table className="mx-auto w-full table-auto px-4">
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
