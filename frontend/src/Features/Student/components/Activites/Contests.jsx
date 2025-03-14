import { useNavigate } from "react-router-dom";
import activityImage from "../../../../assets/activity3.png";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentContests } from "../StudentRedux/contestSlice";
import { getTeammatesByContestId } from "../StudentRedux/teamSlice";
import { v4 as uuidv4 } from 'uuid';
import Loader from "@/ui/Loader";
import Swal from "sweetalert2";
const Contests = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const { contests, loading } = useSelector((state) => state.studentContests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentContests());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader role={role} />
      </div>
    );
  }

  const handleEnterContest = async (contestId) => {
    try {
      const response = await dispatch(getTeammatesByContestId(contestId)).unwrap();

      if (response.message === "You haven't join a team yet.") {
        navigate(`/student/activities/contests/createteam/${contestId}`);
      } else if (response.message === "Teams retrieved successfully.") {
        navigate(`/student/activities/contests/teamdetails/${contestId}`);
      }
    } catch (error) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
      });}
  };

  return (
    <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 relative">
      {/* Floating Image */}
      <div className="absolute right-0 top-[70px] transform -translate-y-1/2 z-10 hidden md:block">
        <img src={activityImage} className="h-30 w-30" alt="Schedule Icon" />
      </div>

      <div className="col-span-2 flex flex-col justify-between ms-5">
        {/* Updated Header */}
        <div className="mb-1">
                    <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-3xl font-semibold text-transparent">
                        Activities
                        <span className="absolute bottom-[-9px] left-0 h-[4px] w-[100px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
                    </h1>

                    {/* Updated Buttons Section */}
                    <div className="mb-2 mt-22 flex items-center gap-8">
                        <button
                            className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 text-lg font-medium text-transparent mt-8"
                            onClick={() => navigate("/student/activities")}
                        >
                            School Hubs
                        </button>
                        <button
                            className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] py-2 text-lg font-medium text-white focus:outline-none mt-8"
                            onClick={() => navigate("/student/activities/contests")}
                        >
                            Contests
                        </button>
                    </div>
                </div>

        {/* Table */}
        <div className="w-full mt-20 mb-16">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white font-poppins">
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Title</th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Teacher</th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Subject</th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Start Date</th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">End Date</th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Num of team members</th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Requirements</th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(contests) && contests.length > 0 ? (
                  contests.map((contest) => (
                    <tr key={contest._id || uuidv4()} className="hover:bg-gray-100 font-poppins">
                      <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm whitespace-nowrap">{contest.title}</td>
                      <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm whitespace-nowrap">{contest.teacherId?.fullName || "N/A"}</td>
                      <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{contest.subjectId?.subjectName || "N/A"}</td>
                      <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm whitespace-nowrap">
                        {contest.startDate ? new Date(contest.startDate).toISOString().split('T')[0] : "N/A"}
                      </td>
                      <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm whitespace-nowrap">
                        {contest.endDate ? new Date(contest.endDate).toISOString().split('T')[0] : "N/A"}
                      </td>
                      <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{contest.numberOfTeamMembers}</td>
                      <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{contest.requirements}</td>
                      <td className="border flex items-center justify-center border-[#FFA4A4] px-4 py-3">
                        <button
                          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-2xl px-4 py-2 text-xs text-white sm:text-sm transition-transform transform hover:scale-105 shadow-md"
                          onClick={() => handleEnterContest(contest._id)}
                        >
                          Enter
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="border border-[#FFA4A4] px-4 py-6 text-center font-poppins text-sm sm:text-base md:text-lg text-gray-500">
                      No contests available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contests;