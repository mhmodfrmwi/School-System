import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStudentGradesForSemester } from "../hooks/grades";
import Loader from "@/ui/Loader";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

export default function GradesForSemester() {
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
    studentGradesForSemester: semesterDegrees,
    isLoading,
    error,
  } = useStudentGradesForSemester(selectedKid?._id);

  if (!selectedKid) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto mb-20 mt-16 min-h-screen w-[95%] bg-white dark:bg-[#13082F]">
        <Loader role="parent" />
      </div>
    );
  }

  const calculateTotals = () => {
    let totalScore = 0;
    let totalMaxScore = 0;
    let degreeSubjectsCount = 0;

    semesterDegrees?.forEach((item) => {
      const midtermGrade = item.midterm?.examGrade || 0;
      const finalGrade = item.final?.examGrade || 0;
      const midtermMax = item.midterm?.finalDegree || 0;
      const finalMax = item.final?.finalDegree || 0;

      if (midtermGrade > 0 || finalGrade > 0) {
        degreeSubjectsCount++;
      }

      totalScore += midtermGrade + finalGrade;
      totalMaxScore += midtermMax + finalMax;
    });

    return { totalScore, totalMaxScore, degreeSubjectsCount };
  };

  const { totalScore, totalMaxScore, degreeSubjectsCount } = calculateTotals();

  return (
    <div className="relative min-h-screen bg-white p-8 font-poppins dark:bg-[#13082F]">
      <div
        className="absolute inset-0 h-screen bg-cover bg-no-repeat opacity-0"
        style={{ backgroundImage: `url(${backgroundStars})` }}
      ></div>
      <div
        className="absolute inset-0 h-screen bg-cover bg-no-repeat opacity-0"
        style={{ backgroundImage: `url(${backgroundWaves})` }}
      ></div>

      <section className="mx-auto mb-20 mt-16 min-h-screen w-[88%] pt-4 font-poppins">
        <div className="relative z-10 mb-8 flex flex-col">
          <h1 className="relative bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-2xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] md:text-2xl xl:text-3xl">
            {t("gradesSemesterForChild.title")} - {selectedKid.fullName}
            <span
              className={`absolute bottom-[-9px] h-[4px] w-[80px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] md:w-[200px] ${
                i18n.language === "ar" ? "right-0" : "left-0"
              }`}
            ></span>
          </h1>
        </div>

        <div
          dir={isRTL ? "rtl" : "ltr"}
          className={`relative z-10 mb-16 flex w-full items-center ${isRTL ? "flex-row-reverse" : "flex-row-reverse"}`}
        >
          <Button
            variant="solid"
            className={`bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white transition-shadow duration-300 hover:shadow-lg dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${isRTL ? "ml-4" : "mr-4"}`}
            onClick={() => navigate(-1)}
          >
            {t("gradesSemesterForChild.back")}
          </Button>
        </div>

        {/* Grades Table */}
        <div className="relative z-10 mx-auto mb-8 rounded-xl border border-[#E0AAEE] font-poppins shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white p-6 shadow-md dark:bg-[#281459]">
              <thead>
                <tr>
                  <th className="border-b border-l border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                    {t("gradesSemesterForChild.subjectName")}
                  </th>
                  <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                    {t("gradesSemesterForChild.midtermGrade")}
                  </th>
                  <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                    {t("gradesSemesterForChild.maxMidterm")}
                  </th>
                  <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                    {t("gradesSemesterForChild.finalGrade")}
                  </th>
                  <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                    {t("gradesSemesterForChild.maxFinal")}
                  </th>
                  <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                    {t("gradesSemesterForChild.subjectScore")}
                  </th>
                  <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                    {t("gradesSemesterForChild.maxSubjectScore")}
                  </th>
                  <th className="border-b border-r border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                    {t("gradesSemesterForChild.percentage")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {semesterDegrees?.length > 0 ? (
                  semesterDegrees.map((item, index) => {
                    const midtermGrade = item.midterm?.examGrade ?? "-";
                    const midtermMax = item.midterm?.finalDegree ?? "-";
                    const finalGrade = item.final?.examGrade ?? "-";
                    const finalMax = item.final?.finalDegree ?? "-";

                    const subjectScore =
                      (typeof midtermGrade === "number" ? midtermGrade : 0) +
                      (typeof finalGrade === "number" ? finalGrade : 0);
                    const maxSubjectScore =
                      (typeof midtermMax === "number" ? midtermMax : 0) +
                      (typeof finalMax === "number" ? finalMax : 0);

                    const percentage =
                      maxSubjectScore > 0
                        ? ((subjectScore / maxSubjectScore) * 100).toFixed(2)
                        : "-";

                    return (
                      <tr
                        key={item.subjectId}
                        className={`border-b border-[#E0AAEE] transition duration-200 hover:bg-[#F3E5F5] dark:hover:bg-[#4B3B7A] ${
                          index % 2 === 0
                            ? "bg-white dark:bg-[#281459]"
                            : "bg-[#F9F9F9] dark:bg-[#3B1E77]"
                        }`}
                      >
                        <td className="border-l border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                          {item.subjectName}
                        </td>
                        <td className="border-[#E0AAEE] px-4 py-4 text-center text-[#5e5b63] dark:text-[#D1D5DB]">
                          {midtermGrade}
                        </td>
                        <td className="border-[#E0AAEE] px-4 py-4 text-center text-[#5e5b63] dark:text-[#D1D5DB]">
                          {midtermMax}
                        </td>
                        <td className="border-[#E0AAEE] px-4 py-4 text-center text-[#5e5b63] dark:text-[#D1D5DB]">
                          {finalGrade}
                        </td>
                        <td className="border-[#E0AAEE] px-4 py-4 text-center text-[#5e5b63] dark:text-[#D1D5DB]">
                          {finalMax}
                        </td>
                        <td className="border-[#E0AAEE] px-4 py-4 text-center text-[#5e5b63] dark:text-[#D1D5DB]">
                          {subjectScore}
                        </td>
                        <td className="border-[#E0AAEE] px-4 py-4 text-center text-[#5e5b63] dark:text-[#D1D5DB]">
                          {maxSubjectScore}
                        </td>
                        <td className="border-r border-[#E0AAEE] px-4 py-4 text-center text-[#5e5b63] dark:text-[#D1D5DB]">
                          {percentage} %
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-12 text-center text-lg text-gray-500 dark:text-[#D1D5DB]"
                    >
                      <p className="py-16">
                        {error
                          ? error.message
                          : t("gradesSemesterForChild.noDegrees")}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md dark:border-[#AE45FB] dark:bg-[#281459]">
            <h3 className="text-center text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
              {t("gradesSemesterForChild.totalScore")}
            </h3>
            <p className="mt-2 text-center text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
              {totalScore} / {totalMaxScore}
            </p>
          </div>

          <div className="rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md dark:border-[#AE45FB] dark:bg-[#281459]">
            <h3 className="text-center text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
              {t("gradesSemesterForChild.degreeSubjects")}
            </h3>
            <p className="mt-2 text-center text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
              {degreeSubjectsCount}
            </p>
          </div>

          <div className="rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md dark:border-[#AE45FB] dark:bg-[#281459]">
            <h3 className="text-center text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
              {t("gradesSemesterForChild.overallPercentage")}
            </h3>
            <p className="mt-2 text-center text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
              {totalMaxScore > 0
                ? ((totalScore / totalMaxScore) * 100).toFixed(2) + "%"
                : "-"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
