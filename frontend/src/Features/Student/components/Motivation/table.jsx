import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentWithFriendsReward } from "../StudentRedux/motivationSlice";

function Table() {
  const dispatch = useDispatch();
  const { studentWithFriendsReward: friends } = useSelector(
    (state) => state.motivation,
  );

  useEffect(() => {
    dispatch(getStudentWithFriendsReward());
  }, [dispatch]);
  const [score] = useState([
    {
      r11: "Exams, Homework Assignments/Activities",
      r12: "For each question you solve",
      r13: "15 points /question",
      r14: "",
    },
    {
      r11: "Messages",
      r12: "For each message you end or reply to",
      r13: "1 point /message",
      r14: "Your score is based on the number of recipients who read your message. More reads = more points. If no one reads it, you get no points.",
    },
    {
      r11: "Course Materials",
      r12: "For each course material you download",
      r13: "15 points /file",
      r14: "",
    },
    {
      r11: "Virtual Classrooms",
      r12: "For each smart class you attend",
      r13: "100 points /smart class",
      r14: "",
    },
  ]);

  return (
    <>
      <section>
        <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:w-[900px] xl:w-[1200px]">
          <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
            <div className="flex flex-col p-6">
              <h1 className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-lg font-bold text-[#244856] text-transparent sm:text-xl lg:text-2xl">
                Weights & Limits
              </h1>
              <div className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#BC6FFB]"></div>
            </div>

            <div className="sm:ml-30 mr-6 ms-5 flex flex-wrap items-center justify-start gap-2 sm:flex-nowrap sm:justify-start sm:gap-4">
              <button className="rounded-2xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#117C90] hover:text-white sm:text-sm">
                Export CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Module
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Activity
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Points
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {score.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {row.r11}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {row.r12}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {row.r13}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {row.r14}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ms-28 flex flex-col p-6">
          <h1 className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-lg font-bold text-[#244856] text-transparent sm:text-xl lg:text-2xl">
            My Friends
          </h1>
          <div className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#BC6FFB]"></div>
        </div>

        <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:w-[900px] xl:w-[1200px]">
          <div className="overflow-x-auto">
            {" "}
            {/* Horizontal scrolling for the table */}
            <div className="max-h-[400px] overflow-y-auto">
              {" "}
              {/* Fixed height with vertical scrolling */}
              <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                    <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                      Full Name
                    </th>
                    <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                      Academic Number
                    </th>
                    <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                      Total Points
                    </th>
                    <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                      Badge
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {friends.friends?.map((friend) => (
                    <tr key={friend._id} className="hover:bg-gray-100">
                      <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                        {friend.fullName}
                      </td>
                      <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                        {friend.academic_number}
                      </td>
                      <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                        {friend.totalPoints}
                      </td>
                      <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                        {friend.badge}
                      </td>
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

export default Table;
