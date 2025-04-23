import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDegreesAllYears } from "../StudentRedux/gradesStudentSlice";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import img1 from "../../../../assets/gradeshere.png";
import img2 from "../../../../assets/grade1.jpg";
import img3 from "../../../../assets/grade2.jpg";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";
import Loader from "@/ui/Loader";
import { useTranslation } from 'react-i18next';

function Grades() {
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allDegrees, loading } = useSelector((state) => state.studentGrades);

  useEffect(() => {
    dispatch(getDegreesAllYears());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <Loader role="student" />
      </div>
    );
  }

  // Prepare data for the chart
  const performanceData = allDegrees?.map((yearData) => {
    const totalScore = yearData.grades?.reduce((sum, gradeData) => {
      const scoreSubject =
        (gradeData?.midterm?.examGrade || 0) + (gradeData?.final?.examGrade || 0);
      return sum + scoreSubject;
    }, 0);
    return {
      academicYear: `${yearData.academicYear.startYear}-${yearData.academicYear.endYear}`,
      totalScore,
    };
  });

  return (
    <div className="font-poppins min-h-screen bg-white dark:bg-[#13082F] relative" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Images for Dark Mode */}
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

<main className="relative z-10">
        <div className="font-poppins">
          <img
            src={img1}
            alt="imgnotfound"
            style={{ objectFit: "cover" }}
            className="relative h-96 w-full md:h-[530px]"
          />
          <div className={`z-100 absolute inset-0 ${i18n.language === 'ar' ? 'right-20' : 'left-20'} top-40 sm:top-48 lg:top-60`}>
            <h2 className="font-semibold text-lg text-white dark:text-gray-300">
              {t("grades.header.title")}
            </h2>
            <p
              className={`my-24 w-52 rounded-xl cursor-pointer bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] p-3 font-semibold text-white text-center`}
            >
              {t("grades.header.subtitle")}
            </p>
          </div>
        </div>
      </main>

      {/* Grades Section */}
      <div className="container mx-auto px-4 py-8  w-[90%] relative z-10">
        <div className="flex items-center py-4">
          <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}></p>
          <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
            {t("grades.title")}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Card for Current Semester */}
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-[#FD813D] border-opacity-80 border-2 dark:border-[#E0AAEE] dark:bg-[#281459]">
            {/* Image with Overlay */}
            <div className="relative">
              <img
                src={img2}
                alt="Current Semester"
                className="w-full h-48 md:h-60 object-cover rounded-t-lg"
              />
              <div
                className="absolute inset-0 bg-[#FD813D] bg-opacity-75 flex items-center justify-center dark:bg-[#C459D9] dark:bg-opacity-75"
                style={{ borderRadius: "8px 8px 0 0" }}
              >
                <h3 className="text-xl font-semibold text-white dark:text-gray-300">{t("grades.cards.currentSemester")}</h3>
              </div>
            </div>

            {/* Button Below Image */}
            <div className="p-6 md:p-10 flex justify-center bg-white dark:bg-[#281459]">
              <button
                className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
                onClick={() => navigate("/student/grades-for-semester")}
              >
                {t("grades.cards.viewGrades")}
              </button>
            </div>
          </div>

          {/* Card for All Years */}
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-[#FD813D] border-opacity-80 border-2 dark:border-[#E0AAEE] dark:bg-[#281459]">
            {/* Image with Overlay */}
            <div className="relative">
              <img
                src={img3}
                alt="All Years"
                className="w-full h-48 md:h-60 object-cover rounded-t-lg"
              />
              <div
                className="absolute inset-0 bg-[#FD813D] bg-opacity-75 flex items-center justify-center dark:bg-[#C459D9] dark:bg-opacity-75"
                style={{ borderRadius: "8px 8px 0 0" }}
              >
                <h3 className="text-xl font-semibold text-white dark:text-gray-300">{t("grades.cards.allYears")}</h3>
              </div>
            </div>

            {/* Button Below Image */}
            <div className="p-6 md:p-10 flex justify-center bg-white dark:bg-[#281459]">
              <button
                className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
                onClick={() => navigate("/student/grades-for-allyears")}
              >
                {t("grades.cards.viewGrades")}
              </button>
            </div>
          </div>
        </div>

        {/* Performance Evolution Over Semesters Section */}
        <div className="mt-12 mb-10">
          <div className="flex items-center py-4 mb-4">
            <p className={`h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB] ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`}></p>
            <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
              {t("grades.performance.title")}
            </button>
          </div>
          {performanceData?.length > 0 ? (
            <div className="bg-white dark:bg-[#281459] rounded-lg shadow-lg p-6 w-full md:w-[70%] border dark:border-[#E0AAEE]">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" dark:stroke="#4B3B7A" />
                  <XAxis dataKey="academicYear" stroke="#888888" dark:stroke="#E0AAEE" />
                  <YAxis stroke="#888888" dark:stroke="#E0AAEE" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      color: "#333",
                      border: "1px solid #E0E0E0",
                    }}
                    dark:contentStyle={{
                      backgroundColor: "#281459",
                      color: "#E0AAEE",
                      border: "1px solid #E0AAEE",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalScore"
                    stroke="#BC6FFB"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#281459] rounded-lg shadow-lg p-6 w-full md:w-[50%] border dark:border-[#E0AAEE] h-[200px] flex items-center justify-center">
              <p className="text-center text-gray-500 dark:text-gray-400">{t("grades.performance.noData")}</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Grades;