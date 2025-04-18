import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherSchoolHubs } from "../TeacherRedux/schoolhubSlice";
import activityImage from "../../../../assets/TeacherIcon/img2.png";
import { useTranslation } from "react-i18next";

const DetailesActivity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { schoolHubs, loading, error } = useSelector(
    (state) => state.teacherSchoolHub,
  );
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getTeacherSchoolHubs());
  }, [dispatch]);

  const activity = schoolHubs.find((hub) => hub._id === id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!activity) return <div>No activity found.</div>;

  const { details, location } = activity;

  return (
    <>
      <div className="col-span-2 ms-5 flex flex-col justify-between">
        <div className="ms-7 mt-5 cursor-text py-1 font-poppins text-2xl font-bold text-[#117C90] dark:text-DarkManager">
          {t("activityDetails.title")}
        </div>

        <p className="mb-2 ms-7 w-24 rounded-xl border-t-4 border-[#117C90] dark:border-DarkManager"></p>

        <div className="mt-5 flex flex-col items-center">
          <img
            src={activityImage}
            alt="Activities"
            className="mb-6 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
          />

          <div className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="rounded-lg border bg-[#F5F5F5] p-6 text-center font-poppins shadow-md shadow-[#105E6A] dark:bg-DarkManager2 dark:text-white dark:shadow-DarkManager">
              <h3 className="font-poppins text-xl font-bold">
                {t("activityDetails.sections.location")}
              </h3>
              <p className="text-md mt-2">{location}</p>
            </div>

            <div className="rounded-lg border bg-[#F5F5F5] p-6 text-center font-poppins shadow-md shadow-[#117C90] dark:bg-DarkManager2 dark:text-white dark:shadow-DarkManager">
              <h3 className="font-poppins text-xl font-bold">
                {t("activityDetails.sections.details")}
              </h3>
              <p className="text-md mt-2">{details}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailesActivity;
