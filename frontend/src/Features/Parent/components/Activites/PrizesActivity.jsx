import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentSchoolHubs } from "../ParentRedux/ActivitySlice";
import activityImage from "../../../../assets/activity2.png";
import Loader from "@/ui/Loader";
import { useTranslation } from 'react-i18next';
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

const ParentActivityPrizes = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedKid = useSelector((state) => state.parentActivity.selectedKid) || 
        JSON.parse(localStorage.getItem('selectedKid'));
    const { schoolHubs, loading } = useSelector((state) => state.parentActivity);

    useEffect(() => {
        if (selectedKid) {
            dispatch(fetchParentSchoolHubs(selectedKid._id));
        }
    }, [dispatch, selectedKid]);

    const activity = schoolHubs?.find((hub) => hub._id === id);

    if (!selectedKid) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
                <div className="text-center p-8 rounded-lg bg-white dark:bg-[#281459] shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
                        {t("parent.activityPrizes.noKidSelected")}
                    </h2>
                    <button 
                        onClick={() => navigate("/parent/parent-kids")}
                        className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-6 py-2 rounded-lg"
                    >
                        {t("parent.activityPrizes.selectKid")}
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

    if (!activity) return (
        <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 mb-10 bg-white dark:bg-[#13082F] text-gray-500 dark:text-[#D1D5DB]">
            {t("parent.activityPrizes.notFound")}
        </div>
    );

    const { prizes } = activity;

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
            
            <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 mb-10 relative z-10">
                <div className="mb-8">
                    <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-3xl font-semibold text-transparent">
                        {t("parent.activityPrizes.title")} - {selectedKid.fullName}
                        <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${
                            i18n.language === 'ar' ? 'right-0' : 'left-0'
                        }`}></span>
                    </h1>

                    <div className="mb-2 mt-22 flex items-center gap-8">
                        <button
                            className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 text-lg font-medium text-transparent mt-8"
                            onClick={() => navigate(`/parent/activities/detailes/${id}`)}
                        >
                            {t("parent.activityPrizes.tabs.details")}
                        </button>
                        <button
                            className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] py-2 text-lg font-medium text-white focus:outline-none mt-8"
                            onClick={() => navigate(`/parent/activities/prizes/${id}`)}
                        >
                            {t("parent.activityPrizes.tabs.prizes")}
                        </button>
                    </div>
                </div>

                 <div className="flex flex-col items-center mt-5">
                         <img
                           src={activityImage}
                           alt="Activities"
                           className="mb-6 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
                         />
               
                         <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-4">
                           {prizes.map((prize, index) => (
                             <div
                               key={index}
                               className="border rounded-lg p-6 font-poppins text-center bg-[#F5F5F5] dark:bg-[#281459] shadow-md shadow-purple-300 dark:shadow-purple-300 hover:shadow-lg hover:shadow-purple-300 transition-shadow duration-300 dark:border-[#E0AAEE]"
                             >
                               <h3 className="font-bold font-poppins text-lg text-[#5e5b63] dark:text-[#E0AAEE]">{t("activityPrizes.prizeLevel")} {index + 1}</h3>
                               <p className="text-sm mt-2 text-[#5e5b63] dark:text-[#D1D5DB]">{prize}</p>
                             </div>
                           ))}
                         </div>
                       </div>
            </div>
        </div>
    );
};

export default ParentActivityPrizes;