import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/gradeassign.png";
import { useState } from "react";
function GradesAssignment() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([
    {
      day: "Monday",
      date: "2025-01-20",
      deadline: "Math Homework",
      grade: "A",
      comment: "Great work!",
    },
    {
      day: "Tuesday",
      date: "2025-01-21",
      deadline: "Science Project",
      grade: "B+",
      comment: "Needs improvement",
    },
    {},
    {},
    {},
  ]);
  return (
    <>
      <section>
        <h2 className="ms-8 mt-10 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 text-xl font-semibold text-transparent md:ms-14 lg:ms-20">
          Your Assignment Grade
        </h2>

        <p className="ms-8 w-24 rounded-xl border-t-4 border-[#BC6FFB] md:ms-14 lg:ms-20"></p>
        <div className="my-10 ms-8 md:ms-14 lg:ms-20">
          <button
            className="me-10 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-2 py-2 font-medium text-transparent"
            onClick={() => navigate("/parent/grades/exam")}
          >
            {" "}
            Grade Exam
          </button>

          <button
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-2 py-2 font-medium text-white focus:outline-none"
            onClick={() => navigate("/parent/grades/assignment")}
          >
            Grade Assignments
          </button>
        </div>

        <div className="mx-auto mb-10 w-[90%] px-2">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                  <th className="border border-pink-300 px-4 py-2 text-left">
                    Day
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left">
                    Date
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left">
                    Deadline
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left">
                    Grade
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left">
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-[#FFA4A4] px-4 py-7">
                      {row.day}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7">
                      {row.date}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7">
                      {row.deadline}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7">
                      {row.grade}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7">
                      {row.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default GradesAssignment;
