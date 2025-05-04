import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { fetchParentSchoolHubs, fetchParentContests,setSelectedKid } from "../ParentRedux/ActivitySlice";
import Loader from "@/ui/Loader";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

const ParentActivities = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedKid = useSelector((state) => state.parentActivity.selectedKid) || 
  JSON.parse(localStorage.getItem('selectedKid'));
  const { schoolHubs, contests, loading, error } = useSelector((state) => state.parentActivity);
//   const selectedKid = useSelector((state) => state.parent?.selectedKid || null);

useEffect(() => {
    const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid'));
    if (kidFromStorage) {
      dispatch(setSelectedKid(kidFromStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedKid) {
        dispatch(fetchParentSchoolHubs(selectedKid._id)); 
        dispatch(fetchParentContests(selectedKid._id));  
    }
  }, [dispatch, selectedKid]);

  if (!selectedKid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <div className="text-center p-8 rounded-lg bg-white dark:bg-[#281459] shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
            {t("parent.activities.noKidSelected")}
          </h2>
          <button 
            onClick={() => navigate("/parent/parent-kids")}
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-6 py-2 rounded-lg"
          >
            {t("parent.activities.selectKid")}
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
            {t("parent.activities.title")} - {selectedKid.fullName}
            <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${
              i18n.language === 'ar' ? 'right-0' : 'left-0'
            }`}></span>
          </h1>

          <div className="mb-2 mt-22 flex items-center gap-8">
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] py-2 text-lg font-medium text-white focus:outline-none mt-8"
              onClick={() => navigate("/parent/activities")}
            >
              {t("parent.activities.tabs.schoolHubs")}
            </button>
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 text-lg font-medium text-transparent mt-8"
              onClick={() => navigate("/parent/activities/contests")}
            >
              {t("parent.activities.tabs.contests")}
            </button>
          </div>
        </div>

        {/* محتوى School Hubs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {schoolHubs.map((hub) => (
            <div key={hub._id} className="border rounded-lg p-5 bg-[#F5F5F5] dark:bg-[#281459] shadow-md hover:shadow-lg dark:border-[#E0AAEE]">
              <h3 className="font-bold text-xl text-[#CF72C0] dark:text-[#E0AAEE]">{hub.title}</h3>
              <hr className="my-4 border-gray-300 dark:border-[#E0AAEE]" />
              <p className="text-sm text-gray-600 dark:text-gray-300">{hub.description}</p>
              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("parent.activities.registration")}: {new Date(hub.registrationStart).toLocaleDateString()} - {new Date(hub.registrationEnd).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default ParentActivities;