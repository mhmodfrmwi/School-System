import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate ,useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { fetchParentContests,setSelectedKid } from "../ParentRedux/ActivitySlice";
import Loader from "@/ui/Loader";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";
import { v4 as uuidv4 } from 'uuid';

const ParentContests = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { contests, loading, error } = useSelector((state) => state.parentActivity);
  // const { selectedKid } = useSelector((state) => state.parent);
  const selectedKid = useSelector((state) => state.parentActivity.selectedKid) || 
  JSON.parse(localStorage.getItem('selectedKid'));


  useEffect(() => {
      const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid'));
      if (kidFromStorage) {
        dispatch(setSelectedKid(kidFromStorage));
      }
    }, [dispatch]);

  useEffect(() => {
    if (selectedKid) {
      dispatch(fetchParentContests(selectedKid._id));
    }
  }, [dispatch, selectedKid]);

  if (!selectedKid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <div className="text-center p-8 rounded-lg bg-white dark:bg-[#281459] shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
            {t("parent.contests.noKidSelected")}
          </h2>
          <button 
            onClick={() => navigate("/parent/parent-kids")}
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-6 py-2 rounded-lg"
          >
            {t("parent.contests.selectKid")}
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role="parent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{ backgroundImage: `url(${backgroundStars})` }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{ backgroundImage: `url(${backgroundWaves})` }}
      ></div>

      <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 relative z-10">
        <div className="mb-8">
          <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-3xl font-semibold text-transparent">
            {t("parent.contests.title")} - {selectedKid.fullName}
            <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${
              i18n.language === 'ar' ? 'right-0' : 'left-0'
            }`}></span>
          </h1>

          <div className="mb-2 mt-22 flex items-center gap-8">
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 text-lg font-medium text-transparent mt-8"
              onClick={() => navigate("/parent/activities")}
            >
              {t("parent.contests.tabs.schoolHubs")}
            </button>
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] py-2 text-lg font-medium text-white focus:outline-none mt-8"
              onClick={() => navigate("/parent/activities/contests")}
            >
              {t("parent.contests.tabs.contests")}
            </button>
          </div>
        </div>

        {/* جدول المسابقات */}
        <div className="w-full mt-20 mb-16">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 dark:border-[#E0AAEE] shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white font-poppins">
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left">{t("parent.contests.table.headers.title")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left">{t("parent.contests.table.headers.teacher")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left">{t("parent.contests.table.headers.startDate")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left">{t("parent.contests.table.headers.endDate")}</th>
                  <th className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2 text-left">{t("parent.contests.table.headers.status")}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#281459]">
                {contests && contests.length > 0 ? (
                  contests.map((contest) => (
                    <tr key={contest._id || uuidv4()} className="hover:bg-gray-100 dark:hover:bg-[#4B3B7A] font-poppins">
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2">{contest.title}</td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2">{contest.teacherId?.fullName || "N/A"}</td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2">
                        {contest.startDate ? new Date(contest.startDate).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2">
                        {contest.endDate ? new Date(contest.endDate).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          new Date(contest.endDate) > new Date() 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}>
                          {new Date(contest.endDate) > new Date() 
                            ? t("parent.contests.table.status.active") 
                            : t("parent.contests.table.status.ended")}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border border-[#FFA4A4] dark:border-[#E0AAEE] px-4 py-6 text-center">
                      {t("parent.contests.table.noData")}
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

export default ParentContests;