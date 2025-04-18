import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherSchoolHubs } from "../TeacherRedux/schoolhubSlice";
import activityImage from "../../../../assets/TeacherIcon/img1.png";
import { useTranslation } from "react-i18next";

const PrizesActivity = () => {
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

  const { prizes } = activity;

  return (
    <>
      <div className="col-span-2 ms-5 flex flex-col justify-between">
        <div className="ms-7 mt-5 cursor-text py-1 font-poppins text-2xl font-bold text-[#117C90] dark:text-DarkManager">
          {t("activityPrizes.title")}
        </div>

        <p className="mb-2 ms-7 w-24 rounded-xl border-t-4 border-[#117C90] dark:border-DarkManager"></p>

        <div className="mt-5 flex flex-col items-center">
          <img
            src={activityImage}
            alt="Activities"
            className="mb-4 w-full max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl"
          />

          <div className="mx-auto mt-4 flex w-1/2 flex-wrap justify-center gap-4 p-4">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className="rounded-lg border bg-[#F5F5F5] p-6 text-center font-poppins shadow-md shadow-[#105E6A] transition-shadow duration-300 hover:shadow-lg hover:shadow-[#117C90] dark:bg-DarkManager2 dark:text-white"
                style={{ flex: "1 1 calc(50% - 1rem)" }}
              >
                <h3 className="font-poppins text-lg font-bold">
                  {t("activityPrizes.prizeLevel")} {index + 1}
                </h3>
                <p className="mt-2 text-sm">{prize}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrizesActivity;
