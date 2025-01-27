import { useState } from "react";

function Table() {
  const [score] = useState([
    { r11: "Exams, Homework Assignments/Activities", r12: "For each question you solve", r13: "15 points /question", r14: "" },
    { r11: "Messages", r12: "For each message you end or reply to", r13: "1 point /message", r14: "Your score is based on the number of recipients who read your message. More reads = more points. If no one reads it, you get no points." },
    { r11: "Course Materials", r12: "For each course material you download", r13: "15 points /file", r14: "" },
    { r11: "Virtual Classrooms", r12: "For each smart class you attend", r13: "100 points /smart class", r14: "" },
  ]);

  return (
    <>
      <section>
      <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
      <div className="flex flex-col p-6">
        <h1 className="text-lg font-poppins font-bold text-[#244856] sm:text-xl lg:text-2xl cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 text-transparent">
          Weights & Limits
        </h1>
        <div className="ms-1 w-24 rounded-xl mb-4 border-t-4 border-[#BC6FFB]"></div>
      </div>
    
      <div className="flex flex-wrap mr-6 sm:ml-30 items-center gap-2 sm:flex-nowrap sm:gap-4 justify-start sm:justify-start">
        <button className="bg-gradient-to-r  from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-2xl px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#117C90] hover:text-white sm:text-sm">
          + Export CSV
        </button>
      </div>
    </div>
    

        <div className="mx-auto my-10 w-full max-w-7xl px-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                  <th className="border font-poppins border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Module</th>
                  <th className="border font-poppins border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Activity</th>
                  <th className="border font-poppins border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Points</th>
                  <th className="border font-poppins border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Comments</th>
                </tr>
              </thead>
              <tbody>
                {score.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border font-poppins border-[#FFA4A4] px-4 py-7 text-xs sm:text-sm md:text-sm">{row.r11}</td>
                    <td className="border font-poppins border-[#FFA4A4] px-4 py-7 text-xs sm:text-sm md:text-sm">{row.r12}</td>
                    <td className="border font-poppins border-[#FFA4A4] px-4 py-7 text-xs sm:text-sm md:text-sm">{row.r13}</td>
                    <td className="border font-poppins border-[#FFA4A4] px-4 py-7 text-xs sm:text-sm md:text-sm">{row.r14}</td>
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

export default Table;
