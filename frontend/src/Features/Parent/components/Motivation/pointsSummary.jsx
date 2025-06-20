import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";
import { useEffect } from "react";
import {
  getAllReward,
  getDailyReward,
  getSemesterReward,
  setSelectedKid  
} from "../../../Parent/components/ParentRedux/MotivationSlice";

const PointsSummary = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const selectedKid = useSelector((state) => state.motivationparent.selectedKid);
  const { 
    reward, 
    semesterReward, 
    dailyReward,
    loading,
    error
  } = useSelector((state) => state.motivationparent); 

  useEffect(() => {
    const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid'));
    if (kidFromStorage) {
      dispatch(setSelectedKid(kidFromStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedKid?._id) {
      dispatch(getAllReward());
      dispatch(getSemesterReward());
      dispatch(getDailyReward());
    }
  }, [dispatch, selectedKid]); 

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Green": return "text-green-500 dark:text-green-400";
      case "Diamond": return "text-[#6a6969] dark:text-[#A3BFFA]";
      case "Gold": return "text-yellow-500 dark:text-yellow-400";
      default: return "text-green-700 dark:text-green-400";
    }
  };

  const pointsData = [
    {
      title: t("points.todayPoints"),
      points: dailyReward?.totalDailyPoints || 0,
      badge: dailyReward?.badge || "Green",
      icon: img1,
    },
    {
      title: t("points.semesterPoints"),
      points: semesterReward?.totalSemesterPoints || 0,
      badge: semesterReward?.badge || "Green",
      icon: img2,
    },
    {
      title: t("points.allPoints"),
      points: reward?.totalPoints || 0,
      badge: reward?.badges || "Green",
      icon: img3,
    },
  ];

  if (loading) {
    return <div className="mt-6 p-6 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mt-6 p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!selectedKid) {
    return (
      <div className="mt-6 p-6 text-center">
        Please select a student first
      </div>
    );
  }

  return (
    <div className="mt-6 p-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
        {t("points.title")}
        <span className={`absolute bottom-[-9px] h-1 w-32 rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}></span>
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pointsData.map((item, index) => (
          <div key={index} className="relative rounded-2xl p-3">
            <div className="rounded-2xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-[2px] dark:bg-[#281459]">
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md dark:bg-[#281459] dark:shadow-none">
                <div>
                  <img src={item.icon} alt={item.title} className="h-8 w-8" />
                </div>
                <div>
                  <p className={`font-poppins font-semibold ${getBadgeColor(item.badge)}`}>
                    {item.title}
                  </p>
                </div>
                <div>
                  <p className={`font-poppins text-2xl font-extrabold ${getBadgeColor(item.badge)}`}>
                    {item.points}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsSummary;