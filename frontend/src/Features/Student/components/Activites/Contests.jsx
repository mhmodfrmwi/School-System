import { useNavigate } from "react-router-dom";
import activityImage from "../../../../assets/activity3.png";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentContests } from "../StudentRedux/contestSlice";
import { getTeammatesByContestId } from "../StudentRedux/teamSlice";
import { v4 as uuidv4 } from 'uuid';

const Contests = () => {
  const navigate = useNavigate();
  const { contests, loading } = useSelector((state) => state.studentContests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentContests());
  }, [dispatch]);

  if (loading) {
    return <div className="w-full h-full"></div>;
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
      console.error("Error fetching team data:", error);
    }
  };
  
  return (
    <>
      <div className="col-span-2 flex flex-col justify-between ms-5">
        <div className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-1 font-bold text-transparent ms-7 mt-5">
          Activities
        </div>
        <div className="w-24 rounded-xl mb-2 border-t-4 border-[#BC6FFB] ms-7"></div>
        <div className="mb-6 mt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-poppins font-medium text-transparent"
            onClick={() => navigate("/student/activities")}
          >
            School Hubs
          </button>

          <button
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium font-poppins text-white focus:outline-none"
            onClick={() => navigate("/student/activities/contests")}
          >
            Contests
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex justify-end items-center">
          <img src={activityImage} className="h-30 w-30" alt="Schedule Icon" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-2xl border-2  border-pink-300 shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white font-poppins">
                <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg ">Title</th>
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
                      <button className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-2xl px-4 py-2 text-xs text-white sm:text-sm"
                        onClick={() => handleEnterContest(contest._id)}>
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
    </>
  );
};

export default Contests;
