import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { fetchParentSchoolHubs, fetchParentContests, setSelectedKid } from "../ParentRedux/ActivitySlice";
import Loader from "@/ui/Loader";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

const ParentActivities = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedKid = useSelector((state) => state.parentActivity.selectedKid) ||
    JSON.parse(localStorage.getItem('selectedKid'));
  const { schoolHubs, loading } = useSelector((state) => state.parentActivity);
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
      <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 ">
        <div className="col-span-2 flex flex-col justify-between ms-5 relative z-10">
          {/* Updated Header */}
          <div className="mb-1">
            <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-3xl font-semibold text-transparent">
              {t("parent.activities.title")} - {selectedKid.fullName}
              <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
                }`}></span>
            </h1>

            {/* Updated Buttons Section */}
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

          {/* Updated Grid Layout for School Hubs */}
          <div className="flex flex-col md:flex-row items-start gap- w-full">
            <div className="w-full mt-8 mb-16">
              {/* Grid Layout for School Hubs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.isArray(schoolHubs) && schoolHubs.length > 0 ? (
                  schoolHubs.map((hub) => (
                    <div key={hub._id} className="flex flex-col w-full border rounded-lg p-5 text-center bg-[#F5F5F5] dark:bg-[#281459] shadow-md hover:shadow-lg dark:border-[#E0AAEE]">
                      <h3 className="font-bold font-poppins text-xl text-[#CF72C0] dark:text-[#E0AAEE]">{hub.title}</h3>
                      <hr className="my-4 border-t border-gray-300 dark:border-[#E0AAEE]" />
                      <div className="flex flex-col items-center mt-2">
                        <p className="text-sm font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">{t("activities.hubCard.registrationStart")}:</p>
                        <p className="text-sm font-semibold font-poppins text-[#5e5b63] dark:text-[#E0AAEE]">{new Date(hub.registrationStart).toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col items-center mt-2">
                        <p className="text-sm font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">{t("activities.hubCard.registrationEnd")}:</p>
                        <p className="text-sm font-semibold font-poppins text-[#5e5b63] dark:text-[#E0AAEE]">{new Date(hub.registrationEnd).toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col items-center mt-2">
                        <p className="text-sm font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">{t("activities.hubCard.contestDate")}:</p>
                        <p className="text-sm font-semibold font-poppins text-[#5e5b63] dark:text-[#E0AAEE]">{new Date(hub.contestDate).toLocaleString()}</p>
                      </div>

                      <div className="flex flex-col items-center gap-4 mt-4">
                        <div className="flex gap-2">
                          <button
                            className="cursor-pointer font-poppins rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-5 py-2 text-sm font-medium text-white transition-transform transform hover:scale-105 shadow-md"
                            onClick={() => navigate(`/parent/activities/detailes/${hub._id}`)}
                          >
                            {t("activities.hubCard.details")}
                          </button>
                          <button
                            className="cursor-pointer font-poppins rounded-3xl border border-[#CF72C0] dark:border-[#E0AAEE] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text px-5 py-2 text-sm font-medium text-transparent transition-transform transform hover:scale-105 shadow-md"
                            onClick={() => navigate(`/parent/activities/prizes/${hub._id}`)}
                          >
                            {t("activities.hubCard.prizes")}
                          </button>
                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center font-poppins bg-[#F9FAFB] dark:bg-[#281459] min-h-[200px] w-full sm:w-2/3 px-6 sm:px-12 py-10 rounded-lg shadow-lg mt-10 text-center col-span-full border dark:border-[#E0AAEE]">
                    <p className="text-xl font-semibold text-gray-600 dark:text-[#E0AAEE] mb-2">{t("activities.hubCard.noHubs")}</p>
                    <p className="text-gray-500 dark:text-[#D1D5DB] mb-4 text-center max-w-lg">
                      {t("activities.hubCard.noHubsMessage")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentActivities;