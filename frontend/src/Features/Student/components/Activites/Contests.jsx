import { useNavigate } from "react-router-dom";
import activityImage from "../../../../assets/activity3.png";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentContests } from "../StudentRedux/contestSlice";
import { getTeammatesByContestId } from "../StudentRedux/teamSlice";
import { v4 as uuidv4 } from 'uuid';
import Loader from "@/ui/Loader";
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next';
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

const Contests = () => {
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const { contests, loading } = useSelector((state) => state.studentContests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentContests());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
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
        title: t("contests.errors.title"),
        text: error.message || t("contests.errors.default"),
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>
    <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 relative ">
      

      {/* Floating Image */}
      <div className={`absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-[70px] transform -translate-y-1/2 z-10 hidden md:block`}>
        <img src={activityImage} className="h-30 w-30" alt="Schedule Icon" />
      </div>

      <div className="col-span-2 flex flex-col justify-between ms-5 relative z-10">
        {/* Updated Header */}
        <div className="mb-1">
          <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-3xl font-semibold text-transparent">
            {t("contests.title")}
            <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${
              i18n.language === 'ar' ? 'right-0' : 'left-0'
            }`}></span>
          </h1>

          {/* Updated Buttons Section */}
          <div className="mb-2 mt-22 flex items-center gap-8">
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 text-lg font-medium text-transparent mt-8"
              onClick={() => navigate("/student/activities")}
            >
              {t("contests.tabs.schoolHubs")}
            </button>
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] py-2 text-lg font-medium text-white focus:outline-none mt-8"
              onClick={() => navigate("/student/activities/contests")}
            >
              {t("contests.tabs.contests")}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full mt-20 mb-16">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 dark:border-[#E0AAEE] shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white font-poppins">
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left text-xs sm:text-base md:text-lg">{t("contests.table.headers.title")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left text-xs sm:text-base md:text-lg">{t("contests.table.headers.teacher")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left text-xs sm:text-base md:text-lg">{t("contests.table.headers.subject")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left text-xs sm:text-base md:text-lg">{t("contests.table.headers.startDate")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left text-xs sm:text-base md:text-lg">{t("contests.table.headers.endDate")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left text-xs sm:text-base md:text-lg">{t("contests.table.headers.teamMembers")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left text-xs sm:text-base md:text-lg">{t("contests.table.headers.requirements")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left text-xs sm:text-base md:text-lg">{t("contests.table.headers.action")}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#281459]">
                {Array.isArray(contests) && contests.length > 0 ? (
                  contests.map((contest) => (
                    <tr key={contest._id || uuidv4()} className="hover:bg-gray-100 dark:hover:bg-[#4B3B7A] font-poppins">
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-xs sm:text-sm md:text-sm whitespace-nowrap text-[#5e5b63] dark:text-[#D1D5DB]">{contest.title}</td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-xs sm:text-sm md:text-sm whitespace-nowrap text-[#5e5b63] dark:text-[#D1D5DB]">{contest.teacherId?.fullName || "N/A"}</td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-xs sm:text-sm md:text-sm text-[#5e5b63] dark:text-[#D1D5DB]">{contest.subjectId?.subjectName || "N/A"}</td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-xs sm:text-sm md:text-sm whitespace-nowrap text-[#5e5b63] dark:text-[#D1D5DB]">
                        {contest.startDate ? new Date(contest.startDate).toISOString().split('T')[0] : "N/A"}
                      </td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-xs sm:text-sm md:text-sm whitespace-nowrap text-[#5e5b63] dark:text-[#D1D5DB]">
                        {contest.endDate ? new Date(contest.endDate).toISOString().split('T')[0] : "N/A"}
                      </td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-xs sm:text-sm md:text-sm text-[#5e5b63] dark:text-[#D1D5DB]">{contest.numberOfTeamMembers}</td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-xs sm:text-sm md:text-sm text-[#5e5b63] dark:text-[#D1D5DB]">{contest.requirements}</td>
                      <td className="border flex items-center justify-center border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-3">
                        <button
                          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-2xl px-4 py-2 text-xs text-white sm:text-sm transition-transform transform hover:scale-105 shadow-md"
                          onClick={() => handleEnterContest(contest._id)}
                        >
                          {t("contests.table.enter")}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-6 text-center font-poppins text-sm sm:text-base md:text-lg text-gray-500 dark:text-[#D1D5DB]">
                      {t("contests.table.noData")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contests;