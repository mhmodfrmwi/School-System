import { useDispatch, useSelector } from "react-redux";
import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";
import { useEffect } from "react";
import {
  getAllReward,
  getDailyReward,
  getSemesterReward,
} from "../StudentRedux/motivationSlice";

const PointsSummary = () => {
  const dispatch = useDispatch();

  const { reward, semesterReward, dailyReward } = useSelector(
    (state) => state.motivation,
  );

  console.log(dailyReward, semesterReward, reward);

  useEffect(() => {
    dispatch(getAllReward());
    dispatch(getSemesterReward());
    dispatch(getDailyReward());
  }, [dispatch]);

  return (
    <div className="mt-6 rounded-2xl bg-white p-6">
      <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
        Points Summary
      </button>
      <p className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#BC6FFB]"></p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative rounded-2xl p-3">
          <div className="rounded-2xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-[3px]">
            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
              <div>
                <img
                  src={img1}
                  alt="notFound"
                  className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
                />
              </div>

              <div>
                <p
                  className={`font-poppins font-semibold ${
                    dailyReward.badge === "Green"
                      ? "text-green-500"
                      : dailyReward.badge === "Diamond"
                        ? "text-[#6a6969]"
                        : dailyReward.badge === "Gold"
                          ? "text-yellow-500"
                          : "text-white"
                  }`}
                >
                  Points Earned Today
                </p>
              </div>
              <div>
                <p
                  className={`font-poppins text-2xl font-extrabold ${
                    dailyReward.badge === "Green"
                      ? "text-green-500"
                      : dailyReward.badge === "Diamond"
                        ? "text-[#6a6969]"
                        : dailyReward.badge === "Gold"
                          ? "text-yellow-500"
                          : "text-white"
                  }`}
                >
                  {dailyReward.totalDailyPoints}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative rounded-2xl p-3">
          <div className="rounded-2xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-[3px]">
            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
              <div>
                <img
                  src={img2}
                  alt="notFound"
                  className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
                />
              </div>
              <div>
                <p
                  className={`font-poppins font-semibold ${
                    semesterReward.badge === "Green"
                      ? "text-green-500"
                      : semesterReward.badge === "Diamond"
                        ? "text-[#6a6969]"
                        : semesterReward.badge === "Gold"
                          ? "text-yellow-500"
                          : "text-white"
                  }`}
                >
                  Your Score for this Semester
                </p>
              </div>
              <div>
                <p
                  className={`font-poppins text-2xl font-extrabold ${
                    semesterReward.badge === "Green"
                      ? "text-green-500"
                      : semesterReward.badge === "Diamond"
                        ? "text-[#6a6969]"
                        : semesterReward.badge === "Gold"
                          ? "text-yellow-500"
                          : "text-white"
                  }`}
                >
                  {semesterReward.totalSemesterPoints}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl p-3">
          <div className="rounded-2xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-[3px]">
            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
              <div>
                <img
                  src={img3}
                  alt="notFound"
                  className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
                />
              </div>
              <div>
                <p
                  className={`font-poppins font-semibold ${
                    reward.badges === "Green"
                      ? "text-green-500"
                      : reward.badges === "Diamond"
                        ? "text-[#6a6969]"
                        : reward.badges === "Gold"
                          ? "text-yellow-500"
                          : "text-white"
                  }`}
                >
                  Score for all semesters
                </p>
              </div>
              <div>
                <p
                  className={`font-poppins text-2xl font-extrabold ${
                    reward.badges === "Green"
                      ? "text-green-500"
                      : reward.badges === "Diamond"
                        ? "text-[#6a6969]"
                        : reward.badges === "Gold"
                          ? "text-yellow-500"
                          : "text-white"
                  }`}
                >
                  {reward.totalPoints}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSummary;
