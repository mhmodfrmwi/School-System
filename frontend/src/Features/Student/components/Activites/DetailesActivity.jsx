import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSchoolHubs } from "../StudentRedux/schoolhubSlice";
import activityImage from "../../../../assets/activity1.png";
import Loader from "@/ui/Loader";
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next';
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

const DetailesActivity = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { schoolHubs = [], loading, error } = useSelector(
    (state) => state.studentSchoolHub || {}
  );

  useEffect(() => {
    dispatch(getStudentSchoolHubs());
  }, [dispatch]);

  // Display SweetAlert for errors
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: t("errors.title"),
        text: error || t("errors.default"),
      });
    }
  }, [error, t]);

  const activity = schoolHubs.find((hub) => hub._id === id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role="student" />
      </div>
    );
  }

  if (!activity) return (
    <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 mb-10 bg-white dark:bg-[#13082F] text-gray-500 dark:text-[#D1D5DB]">
      {t("activityDetails.notFound")}
    </div>
  );

  const { details, location } = activity;

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
    <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 mb-10 ">
    

      <div className="col-span-2 flex flex-col justify-between ms-5 relative z-10">
        {/* Updated Header */}
        <div className="mb-1">
          <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-3xl font-semibold text-transparent">
            {t("activityDetails.title")}
            <span className="absolute bottom-[-9px] left-0 h-[4px] w-[100px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"></span>
          </h1>

          {/* Updated Buttons Section */}
          <div className="mb-2 mt-22 flex items-center gap-8">
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] py-2 text-lg font-medium text-white focus:outline-none mt-8"
              onClick={() => navigate(`/student/activities/detailes/${id}`)}
            >
              {t("activityDetails.tabs.details")}
            </button>
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 text-lg font-medium text-transparent mt-8"
              onClick={() => navigate(`/student/activities/prizes/${id}`)}
            >
              {t("activityDetails.tabs.prizes")}
            </button>
          </div>
        </div>

        {/* Activity Details Section */}
        <div className="flex flex-col items-center mt-5">
          <img
            src={activityImage}
            alt="Activities"
            className="mb-4 w-full max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 w-full max-w-4xl">
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] dark:bg-[#281459] shadow-md shadow-pink-400 dark:border-[#E0AAEE]">
              <h3 className="font-bold font-poppins text-lg text-[#5e5b63] dark:text-[#E0AAEE]">{t("activityDetails.sections.location")}</h3>
              <p className="text-sm mt-2 text-[#5e5b63] dark:text-[#D1D5DB]">{location}</p>
            </div>
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] dark:bg-[#281459] shadow-md shadow-purple-400 dark:border-[#E0AAEE]">
              <h3 className="font-bold font-poppins text-lg text-[#5e5b63] dark:text-[#E0AAEE]">{t("activityDetails.sections.details")}</h3>
              <p className="text-sm mt-2 text-[#5e5b63] dark:text-[#D1D5DB]">{details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DetailesActivity;