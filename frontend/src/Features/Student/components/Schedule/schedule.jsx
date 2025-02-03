import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/schedule 1.png";
import img2 from "../../../../assets/icon.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSchedule } from "../StudentRedux/studentScheduleSlice";

function Schedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentSchedule, loading } = useSelector((state) => state.studentSchedule);

  const [timetable, setTimetable] = useState([]);
  const [semesterInfo, setSemesterInfo] = useState("");

  useEffect(() => {
    dispatch(fetchStudentSchedule());
  }, [dispatch]);

  useEffect(() => {
    if (studentSchedule?.length > 0) {
      const formattedSchedule = formatSchedule(studentSchedule);
      setTimetable(formattedSchedule);

      const { semester_id, academic_year_id } = studentSchedule[0];
      setSemesterInfo(`${semester_id.semesterName}, ${academic_year_id.startYear}-${academic_year_id.endYear}`);
    }
  }, [studentSchedule]);

  function formatSchedule(scheduleData) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let formatted = [[...days]];
    const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

    timeSlots.forEach((time) => {
      let row = [time];
      days.forEach((day) => {
        const session = scheduleData.find(
          (s) => s.day_of_week === day && s.start_time === time
        );
        if (session) {
          // Calculate the duration between start_time and end_time
          const startTime = new Date(`1970-01-01T${session.start_time}:00Z`);
          const endTime = new Date(`1970-01-01T${session.end_time}:00Z`);
          const durationInMinutes = (endTime - startTime) / 60000;
          // const duration = `${durationInMinutes} minute${durationInMinutes > 1 ? 's' : ''}`;
          const durationInHours = durationInMinutes / 60;
          const roundedDuration = Math.round(durationInHours);


          const durationText = roundedDuration === 1 ? "1 hour" : `${roundedDuration} hours`;


          row.push(`${session.subject_id.subjectName} - ${session.teacher_id.fullName} (${durationText})`);
        } else {
          row.push("");
        }
      });
      formatted.push(row);
    });

    return formatted;
  }
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
              <button className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-2 py-2 text-lg font-medium text-white focus:outline-none" onClick={() => navigate("/student/schedule")}>
                Weekly Schedule
              </button>
              <button className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-2 py-2 text-lg font-medium text-transparent" onClick={() => navigate("/student/schedule/exam")}>
                Exams Schedule
              </button>
            </div>
          </div>
          <img src={img1} className="col-span-1 mx-auto mt-10 w-72" alt="Schedule" />
        </div>
        <div className="mx-auto w-[88%] rounded-lg border-2 border-[#F5F6F7] bg-[#F5F6F7] shadow-md">
          <div className="mb-4 ms-6 w-60 rounded-md bg-[#FFA4A4] px-4 py-2 text-center text-white">
            {semesterInfo}
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-center py-4">Loading schedule...</p>
            ) : (
              <table className="mx-auto w-full table-auto px-4">
                <thead>
                  <tr>
                    <th className="border-l border-t border-gray-300">
                      <img src={img2} className="mx-auto" alt="icon" />
                    </th>
                    {timetable.length > 0 && timetable[0].map((day, index) => (
                      <th key={index} className="border border-gray-300 px-4 py-2 text-center">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetable.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-[#fae8e8]">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-center text-[#E47986]">
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
    </>
  );
}

export default Schedule;