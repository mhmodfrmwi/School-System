import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "@/ui/Loader";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";
import { useAllTermsGrades } from "../hooks/grades";

export default function GradesForAllSemesters() {
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
    allTermsGrades: allSemestersDegrees,
    isLoading,
    error,
  } = useAllTermsGrades(selectedKid?._id);

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

  const calculateTotals = (grades) => {
    let totalScore = 0;
    let totalMaxScore = 0;
    let degreeSubjectsCount = 0;

    grades?.forEach((item) => {
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

  return (
    <div className="relative min-h-screen bg-white p-8 font-poppins dark:bg-[#13082F]">
      <div
        className="absolute inset-0 h-screen bg-cover bg-no-repeat opacity-0 dark:opacity-100"
        style={{ backgroundImage: `url(${backgroundStars})` }}
      ></div>
      <div
        className="absolute inset-0 h-screen bg-cover bg-no-repeat opacity-0 dark:opacity-100"
        style={{ backgroundImage: `url(${backgroundWaves})` }}
      ></div>

      <section className="mx-auto mb-20 mt-16 min-h-screen w-[88%] pt-4 font-poppins">
        <div className="relative z-10 mb-8 flex flex-col">
          <h1 className="relative bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-2xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] md:text-3xl">
            {t("gradesAllSemesters.title")} - {selectedKid.fullName}
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
            {t("gradesAllSemesters.back")}
          </Button>
        </div>

        <div className="relative z-10 mx-auto mb-20 space-y-12">
          {allSemestersDegrees?.length > 0 ? (
            allSemestersDegrees.map((semesterData) => {
              const { totalScore, totalMaxScore, degreeSubjectsCount } =
                calculateTotals(semesterData.grades);

              return (
                <div
                  key={`${semesterData.academicYear._id}-${semesterData.semester}`}
                  className="rounded-xl border border-[#E0AAEE] shadow-md"
                >
                  <div className="relative mb-4 ml-4 mt-4 inline-flex items-center rounded-lg bg-gray-100 px-6 py-2 dark:bg-[#281459]">
                    <div className="absolute bottom-0 left-0 top-0 w-2 rounded-l-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"></div>
                    <h2 className="text-sm font-semibold text-[#5e5b63] dark:text-[#E0AAEE] md:text-lg">
                      {t("gradesAllSemesters.academicYear")}{" "}
                      {semesterData.academicYear.startYear}-
                      {semesterData.academicYear.endYear} -{" "}
                      {semesterData.semester}
                    </h2>
                  </div>

                  <div className="overflow-x-auto p-4">
                    <table className="mx-auto w-[350px] bg-white dark:bg-[#281459] sm:w-[550px] md:w-[900px] lg:px-0 xl:w-full">
                      <thead>
                        <tr>
                          <th className="border-b border-l border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                            {t("gradesAllSemesters.subjectName")}
                          </th>
                          <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                            {t("gradesAllSemesters.midtermGrade")}
                          </th>
                          <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                            {t("gradesAllSemesters.maxMidterm")}
                          </th>
                          <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                            {t("gradesAllSemesters.finalGrade")}
                          </th>
                          <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                            {t("gradesAllSemesters.maxFinal")}
                          </th>
                          <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                            {t("gradesAllSemesters.subjectScore")}
                          </th>
                          <th className="border-b border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                            {t("gradesAllSemesters.maxSubjectScore")}
                          </th>
                          <th className="border-b border-r border-[#E0AAEE] bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:bg-[#3B1E77] dark:text-[#E0AAEE]">
                            {t("gradesAllSemesters.percentage")}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {semesterData.grades?.length > 0 ? (
                          semesterData.grades.map((item, index) => {
                            const midtermGrade = item.midterm?.examGrade ?? "-";
                            const midtermMax = item.midterm?.finalDegree ?? "-";
                            const finalGrade = item.final?.examGrade ?? "-";
                            const finalMax = item.final?.finalDegree ?? "-";

                            const subjectScore =
                              (typeof midtermGrade === "number"
                                ? midtermGrade
                                : 0) +
                              (typeof finalGrade === "number" ? finalGrade : 0);
                            const maxSubjectScore =
                              (typeof midtermMax === "number"
                                ? midtermMax
                                : 0) +
                              (typeof finalMax === "number" ? finalMax : 0);

                            const percentage =
                              maxSubjectScore > 0
                                ? (
                                    (subjectScore / maxSubjectScore) *
                                    100
                                  ).toFixed(2)
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
                                {t("gradesAllSemesters.noDegrees")}
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Section */}
                  <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
                    <div className="rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md dark:border-[#AE45FB] dark:bg-[#281459]">
                      <h3 className="text-center text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
                        {t("gradesAllSemesters.totalScore")}
                      </h3>
                      <p className="mt-2 text-center text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
                        {totalScore} / {totalMaxScore}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md dark:border-[#AE45FB] dark:bg-[#281459]">
                      <h3 className="text-center text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
                        {t("gradesAllSemesters.degreeSubjects")}
                      </h3>
                      <p className="mt-2 text-center text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
                        {degreeSubjectsCount}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E0AAEE] bg-white p-6 shadow-md dark:border-[#AE45FB] dark:bg-[#281459]">
                      <h3 className="text-center text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
                        {t("gradesAllSemesters.overallPercentage")}
                      </h3>
                      <p className="mt-2 text-center text-2xl font-bold text-[#5e5b63] dark:text-[#E0AAEE]">
                        {totalMaxScore > 0
                          ? ((totalScore / totalMaxScore) * 100).toFixed(2) +
                            "%"
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-[#E0AAEE] p-8 text-center shadow-md">
              <p className="py-16 text-lg text-gray-500 dark:text-[#D1D5DB]">
                {error ? error.message : t("gradesAllSemesters.noSemesters")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
