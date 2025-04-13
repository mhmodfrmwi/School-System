import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";
import { useEffect } from "react";
import { getAllReward, getDailyReward, getSemesterReward } from "../StudentRedux/motivationSlice";

const PointsSummary = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { reward, semesterReward, dailyReward } = useSelector(
    (state) => state.motivation,
  );

  useEffect(() => {
    dispatch(getAllReward());
    dispatch(getSemesterReward());
    dispatch(getDailyReward());
  }, [dispatch]);

  const getBadgeColor = (badge) => {
    switch(badge) {
      case "Green": return "text-green-500";
      case "Diamond": return "text-[#6a6969]";
      case "Gold": return "text-yellow-500";
      default: return "text-green-700";
    }
  };

  const pointsData = [
    {
      title: t('points.todayPoints'),
      points: dailyReward.totalDailyPoints,
      badge: dailyReward.badge,
      icon: img1,
    },
    {
      title: t('points.semesterPoints'),
      points: semesterReward.totalSemesterPoints,
      badge: semesterReward.badge,
      icon: img2,
    },
    {
      title: t('points.allPoints'),
      points: reward.totalPoints,
      badge: reward.badges,
      icon: img3,
    }
  ];

  return (
    <div className="mt-6 rounded-2xl bg-white p-6">
      <h1 className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
        {t('points.title')}
      </h1>
      <p className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#BC6FFB]"></p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pointsData.map((item, index) => (
          <div key={index} className="relative rounded-2xl p-3">
            <div className="rounded-2xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-[3px]">
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
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