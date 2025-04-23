import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";
import { useEffect } from "react";
import { getAllReward, getDailyReward, getSemesterReward } from "../StudentRedux/motivationSlice";

const PointsSummary = () => {
  const { t ,i18n} = useTranslation();
  const dispatch = useDispatch();
  const { reward, semesterReward, dailyReward } = useSelector(
    (state) => state.motivation
  );

  useEffect(() => {
    dispatch(getAllReward());
    dispatch(getSemesterReward());
    dispatch(getDailyReward());
  }, [dispatch]);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Green":
        return "text-green-500 dark:text-green-400";
      case "Diamond":
        return "text-[#6a6969] dark:text-[#A3BFFA]";
      case "Gold":
        return "text-yellow-500 dark:text-yellow-400";
      default:
        return "text-green-700 dark:text-green-400";
    }
  };

  const pointsData = [
    {
      title: t("points.todayPoints"),
      points: dailyReward.totalDailyPoints,
      badge: dailyReward.badge,
      icon: img1,
    },
    {
      title: t("points.semesterPoints"),
      points: semesterReward.totalSemesterPoints,
      badge: semesterReward.badge,
      icon: img2,
    },
    {
      title: t("points.allPoints"),
      points: reward.totalPoints,
      badge: reward.badges,
      icon: img3,
    },
  ];

  return (
    <div className="mt-6  p-6 " dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className=" relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
        {t("points.title")}
        <span className={`absolute bottom-[-9px] h-[4px] w-[120px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] ${
            i18n.language === 'ar' ? 'right-0' : 'left-0'
          }`}></span>
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {pointsData.map((item, index) => (
          <div key={index} className="relative rounded-2xl p-3">
            <div className="rounded-2xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:bg-[#281459] p-[3px]">
              <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-[#281459] p-4 shadow-md dark:shadow-none">
                <div>
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
                  />
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