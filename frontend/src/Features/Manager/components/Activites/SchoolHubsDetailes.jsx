import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolHubs } from "../ManagerRedux/schoolhubSlice";
import activityImage from "../../../../assets/TeacherIcon/img2.png";import { useTranslation } from 'react-i18next';

const DetailesActivity = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { schoolHubs, loading, error } = useSelector(
    (state) => state.schoolhub,
  );

  useEffect(() => {
    dispatch(getSchoolHubs());
  }, [dispatch]);

  const activity = schoolHubs.find((hub) => hub._id === id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!activity) return <div>No activity found.</div>;

  const { details, location } = activity;

  return (
    <>
      <div className="col-span-2 ms-5 flex flex-col justify-between">
        <div className="dark:text-DarkManager ms-7 mt-5 cursor-text py-1 font-poppins text-2xl font-bold text-[#105E6A]">
          {t("activityDetails.title")}
        </div>

        <p className="dark:border-DarkManager mb-2 ms-7 w-24 rounded-xl border-t-4 border-[#117C90]"></p>

        <div className="mt-5 flex flex-col items-center">
          <img
            src={activityImage}
            alt="Activities"
            className="mb-6 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
          />

          <div className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="dark:shadow-DarkManager dark:bg-DarkManager2 rounded-lg border bg-[#F5F5F5] p-6 text-center font-poppins shadow-md shadow-[#105E6A]">
              <h3 className="font-poppins text-xl font-bold">{t("activityDetails.sections.location")}</h3>
              <p className="text-md mt-2">{location}</p>
            </div>

            <div className="dark:shadow-DarkManager dark:bg-DarkManager2 rounded-lg border bg-[#F5F5F5] p-6 text-center font-poppins shadow-md shadow-[#117C90]">
              <h3 className="font-poppins text-xl font-bold">{t("activityDetails.sections.details")}</h3>
              <p className="text-md mt-2">{details}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailesActivity;
