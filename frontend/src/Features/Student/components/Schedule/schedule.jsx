import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/schedule 1.png";
import img2 from "../../../../assets/icon.png";
import img3 from "../../../../assets/StudentIcon/schedulei.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSchedule } from "../StudentRedux/studentScheduleSlice";
import Loader from "@/ui/Loader";

function Schedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentSchedule, loading } = useSelector(
    (state) => state.studentSchedule,
  );

  const [timetable, setTimetable] = useState([]);
  const [semesterInfo, setSemesterInfo] = useState("");

  useEffect(() => {
    dispatch(fetchStudentSchedule());
  }, [dispatch]);

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    if (studentSchedule?.length > 0) {
      const formattedSchedule = formatSchedule(studentSchedule);
      setTimetable(formattedSchedule);

      const { semester_id, academic_year_id } = studentSchedule[0];
      setSemesterInfo(
        `${semester_id.semesterName}, ${academic_year_id.startYear}-${academic_year_id.endYear}`,
      );
    }
  }, [studentSchedule]);

  function formatSchedule(scheduleData) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let formatted = [[...days]];
    const timeSlots = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
    ];

    timeSlots.forEach((time) => {
      let row = [time];
      days.forEach((day) => {
        const session = scheduleData.find(
          (s) => s.day_of_week === day && s.start_time === time,
        );
        if (session) {
          const startTime = new Date(`1970-01-01T${session.start_time}:00Z`);
          const endTime = new Date(`1970-01-01T${session.end_time}:00Z`);
          const durationInMinutes = (endTime - startTime) / 60000;

          const hours = Math.floor(durationInMinutes / 60);
          const minutes = durationInMinutes % 60;

          let durationText = "";
          if (hours > 0 && minutes > 0) {
            durationText = `${hours} hour${hours > 1 ? "s" : ""} and ${minutes} minute${minutes > 1 ? "s" : ""}`;
          } else if (hours > 0) {
            durationText = `${hours} hour${hours > 1 ? "s" : ""}`;
          } else {
            durationText = `${minutes} minute${minutes > 1 ? "s" : ""}`;
          }

          row.push(
            `${session.subject_id.subjectName} - ${session.teacher_id.fullName} (${durationText})`,
          );
        } else {
          row.push("");
        }
      });
      formatted.push(row);
    });

    return formatted;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader role={role} />
      </div>
    );
  }

  return (
    <section className="mx-auto mt-10 min-h-screen w-[95%] font-poppins">
      <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-3">
        <div className="col-span-2 flex flex-col justify-between">
          <div className="ml-4 ms-8 flex items-center py-4 md:ml-16 md:ms-14 lg:ms-20">
            <button className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent md:text-2xl">
              Upcoming Smart Classes
              <span className="absolute bottom-[-9px] left-0 h-[4px] w-[100px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
            </button>
          </div>
          <div className="mb-10 me-10 ms-8 mt-7 flex items-center gap-8 md:ms-14 lg:ms-20">
            <button
              className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 font-poppins text-lg font-medium text-white focus:outline-none"
              onClick={() => navigate("/student/schedule")}
            >
              Weekly Schedule
            </button>
            <button
              className="me-10 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 font-poppins text-lg font-medium text-transparent"
              onClick={() => navigate("/student/get-exam-schedule")}
            >
              Exam Schedule
            </button>
          </div>
        </div>
        <img
          src={img1}
          className="col-span-1 mx-auto mt-10 w-72"
          alt="Schedule"
        />
      </div>
      <div className="mx-auto mb-20 w-[88%] rounded-xl border border-gray-200 font-poppins shadow-md">
        <div className="overflow-x-auto">
          {studentSchedule.length === 0 ? (
            <div className="my-16 flex flex-col items-center justify-center text-center font-poppins">
              <div className="flex w-3/4 flex-col items-center rounded-xl bg-gray-100 p-6 font-poppins shadow-lg md:w-1/2">
                <img src={img3} alt="No Schedule" className="mb-4 w-1/4" />
                <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-800">
                  No Schedule Available
                </h2>
                <p className="font-poppins text-gray-600">
                  It looks like there are no scheduled classes available at the
                  moment.
                </p>
              </div>
            </div>
          ) : (
            <table className="min-w-full table-auto bg-white p-6 shadow-md">
              <thead>
                <tr className="border-b border-gray-200">
                  <th colSpan="8" className="px-2 py-3 text-right">
                    <div className="ml-auto w-60 rounded-md bg-[#FFA4A4] px-4 py-3 text-center font-poppins text-white">
                      {semesterInfo}
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-gray-200 px-2 py-4 text-center text-gray-700">
                    <img src={img2} className="mx-auto" alt="icon" />
                  </th>
                  {timetable.length > 0 &&
                    timetable[0].map((day, index) => (
                      <th
                        key={index}
                        className="border-b border-l border-gray-200 px-4 py-2 text-center text-gray-700"
                      >
                        {day}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {timetable.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-200">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`border-l border-gray-200 px-4 py-4 text-center font-poppins ${
                          cellIndex === 0 ? "text-gray-800" : "text-[#E47986]"
                        }`}
                      >
                        {cell || "--"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
