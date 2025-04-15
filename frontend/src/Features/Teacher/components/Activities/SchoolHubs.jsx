import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherSchoolHubs } from "../TeacherRedux/schoolhubSlice"; 
import ActivityToggle from "./SelectPage";
import { useTranslation } from 'react-i18next';

const Activities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { schoolHubs, loading, error } = useSelector((state) => state.teacherSchoolHub);

  useEffect(() => {
    dispatch(getTeacherSchoolHubs());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ActivityToggle />
      <div className="col-span-2 flex flex-col justify-between ms-5">
        <div className="text-2xl font-poppins cursor-text font-bold text-[#105E6A]  mt-5">
        {t("activities.tabs.schoolHubs")}

        </div>
        <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] "></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {schoolHubs.length > 0 ? (
            schoolHubs.map((hub) => (
              <div key={hub._id} className="flex flex-col w-full border rounded-lg p-4 text-center bg-[#F5F5F5] shadow-md">
                <h3 className="font-bold font-poppins text-xl text-[#105E6A]">{hub.title}</h3>
                <div className="flex flex-col items-center mt-2">
                  <p className="text-sm font-poppins">{t("activities.hubCard.registrationStart")}:</p>
                  <p className="text-sm font-semibold font-poppins">
                    {new Date(hub.registrationStart).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-center mt-2">
                  <p className="text-sm font-poppins">{t("activities.hubCard.registrationEnd")}:</p>
                  <p className="text-sm font-semibold font-poppins">
                    {new Date(hub.registrationEnd).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-center mt-2">
                  <p className="text-sm font-poppins">{t("activities.hubCard.contestDate")}:</p>
                  <p className="text-sm font-semibold font-poppins">
                    {new Date(hub.contestDate).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 mt-4">
                  <button
                    className="cursor-pointer font-poppins rounded-3xl bg-[#105E6A] px-5 py-2 text-lg font-medium text-white"
                    onClick={() => navigate(`/teacher/school-hubs/detailes/${hub._id}`)}
                  >
                  {t("activities.hubCard.details")}
                  </button>
                  <button
                    className="cursor-pointer font-poppins rounded-3xl text-[#117C90] border border-[#117C90] px-5 py-2 text-lg font-medium"
                    onClick={() => navigate(`/teacher/school-hubs/prizes/${hub._id}`)}
                  >
                  {t("activities.hubCard.prizes")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg mt-10 col-span-full">
              <p className="text-xl font-semibold text-gray-600 mb-2">{t("activities.hubCard.noHubs")}.</p>
              <p className="text-gray-500 mb-4 text-center max-w-xl">
              {t("activities.hubCard.noHubsMessage")} .
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Activities;