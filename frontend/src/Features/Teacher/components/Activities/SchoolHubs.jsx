import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherSchoolHubs } from "../TeacherRedux/schoolhubSlice";
import ActivityToggle from "./SelectPage";
import { useTranslation } from "react-i18next";

const Activities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { schoolHubs, loading, error } = useSelector(
    (state) => state.teacherSchoolHub,
  );

  useEffect(() => {
    dispatch(getTeacherSchoolHubs());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ActivityToggle />
      <div className="col-span-2 ms-5 flex flex-col justify-between">
        <div className="mt-5 cursor-text font-poppins text-2xl font-bold text-[#105E6A] dark:text-DarkManager">
          {t("activities.tabs.schoolHubs")}
        </div>
        <p className="mb-2 w-24 rounded-xl border-t-4 border-[#117C90] dark:border-DarkManager"></p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schoolHubs.length > 0 ? (
            schoolHubs.map((hub) => (
              <div
                key={hub._id}
                className="flex w-full flex-col rounded-lg border bg-[#F5F5F5] p-4 text-center shadow-md dark:bg-DarkManager2 dark:text-white"
              >
                <h3 className="font-poppins text-xl font-bold text-[#105E6A] dark:text-white">
                  {hub.title}
                </h3>
                <div className="mt-2 flex flex-col items-center">
                  <p className="font-poppins text-sm">
                    {t("activities.hubCard.registrationStart")}:
                  </p>
                  <p className="font-poppins text-sm font-semibold">
                    {new Date(hub.registrationStart).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 flex flex-col items-center">
                  <p className="font-poppins text-sm">
                    {t("activities.hubCard.registrationEnd")}:
                  </p>
                  <p className="font-poppins text-sm font-semibold">
                    {new Date(hub.registrationEnd).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 flex flex-col items-center">
                  <p className="font-poppins text-sm">
                    {t("activities.hubCard.contestDate")}:
                  </p>
                  <p className="font-poppins text-sm font-semibold">
                    {new Date(hub.contestDate).toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 flex flex-col items-center gap-4">
                  <button
                    className="cursor-pointer rounded-3xl bg-[#105E6A] px-5 py-2 font-poppins text-lg font-medium text-white dark:bg-white dark:text-DarkManager"
                    onClick={() =>
                      navigate(`/teacher/school-hubs/detailes/${hub._id}`)
                    }
                  >
                    {t("activities.hubCard.details")}
                  </button>
                  <button
                    className="cursor-pointer rounded-3xl border border-[#117C90] px-5 py-2 font-poppins text-lg font-medium text-[#117C90] dark:bg-white dark:text-DarkManager"
                    onClick={() =>
                      navigate(`/teacher/school-hubs/prizes/${hub._id}`)
                    }
                  >
                    {t("activities.hubCard.prizes")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg">
              <p className="mb-2 text-xl font-semibold text-gray-600">
                {t("activities.hubCard.noHubs")}.
              </p>
              <p className="mb-4 max-w-xl text-center text-gray-500">
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
