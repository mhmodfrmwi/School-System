import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/gradeexam.png";
import { useState } from "react";
function GradesExam() {
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState([
    { day: "Monday", date: "2025-01-20", grade: "A", score: "95" },
    { day: "Tuesday", date: "2025-01-21", grade: "B+", score: "85" },
    { day: "Wednesday", date: "2025-01-22", grade: "A-", score: "90" },
    {},
    {},
    {},
  ]);

  return (
    <>
      <section>
        <h2 className="ms-10 mt-10 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 text-xl font-semibold text-transparent">
          Your Grade Grade
        </h2>

        <p className="ms-10 w-24 rounded-xl border-t-4 border-[#BC6FFB]"></p>

        <div className="my-10 ms-10">
          <button
            className="me-10 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-3 py-2 font-medium text-white focus:outline-none"
            onClick={() => navigate("/student/grades/exam")}
          >
            {" "}
            Grade Exam
          </button>

          <button
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-medium text-transparent"
            onClick={() => navigate("/student/grades/assignment")}
          >
            Grade Assignments
          </button>
        </div>

        <div className="mx-auto grid w-[90%] grid-cols-1 items-center gap-4 sm:grid-cols-3">
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-md w-[100%] text-start font-semibold md:w-[80%] md:text-lg lg:text-2xl">
              Dear student, remember that every effort you put in brings you
              closer to success, and achievement comes to those who work hard
              and pursue their dreams. Don’t give up when faced with challenges;
              they are simply steps towards your goals. Aim for the highest
              grades, and believe in your abilities and dedication.
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <img
              src={img1}
              alt="img4notfound"
              className="rounded-3xl rounded-t-xl bg-black lg:w-96"
            />
          </div>
        </div>

        <div className="mx-auto my-10 w-full max-w-4xl px-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left">
                    Day
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left">
                    Date
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left">
                    Grade
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left">
                    Score
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
                      {row.grade}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7">
                      {row.score}
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

export default GradesExam;
