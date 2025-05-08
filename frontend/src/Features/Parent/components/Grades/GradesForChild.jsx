import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import img1 from "../../../../assets/gradeshere.png";
import img2 from "../../../../assets/grade1.jpg";
import img3 from "../../../../assets/grade2.jpg";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";
import Loader from "@/ui/Loader";
import { useAllTermsGrades } from "../hooks/grades";

function GradesForChild() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === "ar";

  const [selectedKid] = useState(() => {
    const kid =
      location.state?.selectedKid ||
      JSON.parse(localStorage.getItem("selectedKid"));
    if (!kid) {
      navigate(-1);
      return null;
    }
    return kid;
  });

  const {
    allTermsGrades: allDegrees,
    isLoading,
    error,
  } = useAllTermsGrades(selectedKid?._id);

  if (!selectedKid) {
    return null;
  }

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-white dark:bg-[#13082F]"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <Loader role="student" />
      </div>
    );
  }

  const performanceData = allDegrees?.map((yearData) => {
    const totalScore = yearData.grades?.reduce((sum, gradeData) => {
      const scoreSubject =
        (gradeData?.midterm?.examGrade || 0) +
        (gradeData?.final?.examGrade || 0);
      return sum + scoreSubject;
    }, 0);
    return {
      academicYear: `${yearData.academicYear.startYear}-${yearData.academicYear.endYear}`,
      totalScore,
    };
  });

  return (
    <div
      className="relative min-h-screen bg-white font-poppins dark:bg-[#13082F]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className="absolute inset-0 h-screen bg-cover bg-no-repeat opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>
      <div
        className="absolute inset-0 h-screen bg-cover bg-no-repeat opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>

      <main className="relative z-10">
        <div className="font-poppins">
          <img
            src={img1}
            alt="imgnotfound"
            style={{ objectFit: "cover" }}
            className="relative h-96 w-full md:h-[530px]"
          />
          <div
            className={`z-100 absolute inset-0 ${isRTL ? "right-20" : "left-20"} top-40 sm:top-48 lg:top-60`}
          >
            <h2 className="text-lg font-semibold text-white dark:text-gray-300">
              {t("gradesForChild.header.viewGradesOf")} {selectedKid.fullName}
              {t("gradesForChild.header.here")}
            </h2>
            <p
              className={`my-24 w-52 cursor-pointer rounded-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-3 text-center font-semibold text-white dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]`}
            >
              {t("gradesForChild.header.subtitle")}
            </p>
          </div>
        </div>
      </main>

      <div className="container relative z-10 mx-auto w-[90%] px-4 py-8">
        <div className="flex items-center py-4">
          <p
            className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${isRTL ? "ml-2" : "mr-2"}`}
          ></p>
          <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
            {t("gradesForChild.title")}
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Card for Current Semester */}
          <div className="overflow-hidden rounded-lg border-2 border-[#FD813D] border-opacity-80 shadow-lg transition-shadow hover:shadow-xl dark:border-[#E0AAEE] dark:bg-[#281459]">
            {/* Image with Overlay */}
            <div className="relative">
              <img
                src={img2}
                alt="Current Semester"
                className="h-48 w-full rounded-t-lg object-cover md:h-60"
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-[#FD813D] bg-opacity-75 dark:bg-[#C459D9] dark:bg-opacity-75"
                style={{ borderRadius: "8px 8px 0 0" }}
              >
                <h3 className="text-xl font-semibold text-white dark:text-gray-300">
                  {t("gradesForChild.cards.currentSemester")}
                </h3>
              </div>
            </div>

            {/* Button Below Image */}
            <div className="flex justify-center bg-white p-6 dark:bg-[#281459] md:p-10">
              <button
                className="rounded-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-6 py-2 text-white transition-opacity hover:opacity-90 dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                onClick={() => navigate("/parent/grades-for-semester")}
              >
                {t("gradesForChild.cards.viewGrades")}
              </button>
            </div>
          </div>

          {/* Card for All Years */}
          <div className="overflow-hidden rounded-lg border-2 border-[#FD813D] border-opacity-80 shadow-lg transition-shadow hover:shadow-xl dark:border-[#E0AAEE] dark:bg-[#281459]">
            {/* Image with Overlay */}
            <div className="relative">
              <img
                src={img3}
                alt="All Years"
                className="h-48 w-full rounded-t-lg object-cover md:h-60"
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-[#FD813D] bg-opacity-75 dark:bg-[#C459D9] dark:bg-opacity-75"
                style={{ borderRadius: "8px 8px 0 0" }}
              >
                <h3 className="text-xl font-semibold text-white dark:text-gray-300">
                  {t("gradesForChild.cards.allYears")}
                </h3>
              </div>
            </div>

            {/* Button Below Image */}
            <div className="flex justify-center bg-white p-6 dark:bg-[#281459] md:p-10">
              <button
                className="rounded-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-6 py-2 text-white transition-opacity hover:opacity-90 dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                onClick={() => navigate("/parent/grades-for-all-semesters")}
              >
                {t("gradesForChild.cards.viewGrades")}
              </button>
            </div>
          </div>
        </div>

        {/* Performance Evolution Over Semesters Section */}
        <div className="mb-10 mt-12">
          <div className="mb-4 flex items-center py-4">
            <p
              className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${isRTL ? "ml-2" : "mr-2"}`}
            ></p>
            <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
              {t("gradesForChild.performance.title")}
            </button>
          </div>
          {performanceData?.length > 0 ? (
            <div className="w-full rounded-lg border bg-white p-6 shadow-lg dark:border-[#E0AAEE] dark:bg-[#281459] md:w-[70%]">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E0E0E0"
                    strokeOpacity={i18n.language === "ar" ? 0.7 : 1}
                  />
                  <XAxis dataKey="academicYear" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      color: "#333",
                      border: "1px solid #E0E0E0",
                      borderRadius: "8px",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalScore"
                    stroke="#BC6FFB"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name={t("grades.performance.totalScore")}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[200px] w-full items-center justify-center rounded-lg border bg-white p-6 shadow-lg dark:border-[#E0AAEE] dark:bg-[#281459] md:w-[50%]">
              <p className="text-center text-gray-500 dark:text-gray-400">
                {error ? error.message : t("grades.performance.noData")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GradesForChild;
