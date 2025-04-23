import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDegreesAllYears } from "../StudentRedux/gradesStudentSlice";
import { useEffect } from "react";
import Loader from "@/ui/Loader";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

function GradesforAllYears() {
  const { t ,i18n} = useTranslation();
  const { allDegrees, loading } = useSelector((state) => state.studentGrades);
  const dispatch = useDispatch();
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    dispatch(getDegreesAllYears());
  }, [dispatch]);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="mt-16 mb-20 min-h-screen w-[95%] mx-auto bg-white dark:bg-[#13082F]">
        <Loader role={role} />
      </div>
    );
  }

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
    <section className="font-poppins min-h-screen w-[88%] mx-auto mt-16 pt-4 mb-20 ">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center mb-16 relative z-10">
        <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
          {t("gradesAllYears.title")}
          <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${
              i18n.language === 'ar' ? 'right-0' : 'left-0'
            }`}></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => navigate(-1)}
        >
          {t("gradesAllYears.back")}
        </Button>
      </div>

      {/* Table Section */}
      <div className="mx-auto font-poppins mb-20 relative z-10">
        <div>
          {allDegrees?.map((yearData) => (
            <div key={yearData.academicYear._id} className="mb-12">
              <div className="relative inline-flex items-center py-2 px-6 mb-2 bg-gray-100 dark:bg-[#281459] rounded-lg pl-6">
                {/* Vertical Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-l-lg"></div>

                {/* Academic Year Text */}
                <h2 className="text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">
                  {t("gradesAllYears.academicYear")} {yearData.academicYear.startYear} -{" "}
                  {yearData.academicYear.endYear}
                </h2>
              </div>
              {yearData?.semester ? (
                <div className="mb-4">
                  <h3 className="mt-4 mb-4 text-lg font-semibold text-[#5e5b63] dark:text-[#E0AAEE]">{yearData.semester}</h3>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="min-w-full table-auto bg-white dark:bg-[#281459] p-6 shadow-md">
                      <thead>
                        <tr>
                          <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                            {t("gradesAllYears.headers.subjectName")}
                          </th>
                          <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                            {t("gradesAllYears.headers.midtermDegree")}
                          </th>
                          <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                            {t("gradesAllYears.headers.maxMidtermDegree")}
                          </th>
                          <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                            {t("gradesAllYears.headers.finalDegree")}
                          </th>
                          <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                            {t("gradesAllYears.headers.maxFinalDegree")}
                          </th>
                          <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                            {t("gradesAllYears.headers.subjectScore")}
                          </th>
                          <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                            {t("gradesAllYears.headers.maxSubjectScore")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearData.grades?.length > 0 ? (
                          yearData.grades?.map((gradeData, index) => {
                            const scoreSubject =
                              (gradeData?.midterm?.examGrade || 0) +
                              (gradeData?.final?.examGrade || 0);
                            const maxScoreSubject =
                              (gradeData?.midterm?.finalDegree || 0) +
                              (gradeData?.final?.finalDegree || 0);

                            return (
                              <tr
                                key={gradeData.subjectId._id}
                                className={`border-b border-gray-200 dark:border-[#E0AAEE] ${
                                  index % 2 === 0
                                    ? "bg-white dark:bg-[#281459]"
                                    : "bg-[#F9F9F9] dark:bg-[#3B1E77]"
                                } hover:bg-[#F3E5F5] dark:hover:bg-[#4B3B7A] transition duration-200`}
                              >
                                <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                                  {gradeData.subjectName}
                                </td>
                                <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                                  {gradeData?.midterm?.examGrade ?? "-"}
                                </td>
                                <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                                  {gradeData?.midterm?.finalDegree ?? "-"}
                                </td>
                                <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                                  {gradeData?.final?.examGrade ?? "-"}
                                </td>
                                <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                                  {gradeData?.final?.finalDegree ?? "-"}
                                </td>
                                <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                                  {scoreSubject}
                                </td>
                                <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                                  {maxScoreSubject}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="px-4 py-12 text-center text-lg text-gray-500 dark:text-[#D1D5DB] border border-gray-200 dark:border-[#E0AAEE]"
                            >
                              <p className="py-16">{t("gradesAllYears.noDegreesTerm")}</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-12 text-center text-lg text-gray-500 dark:text-[#D1D5DB]"
                  >
                    <p className="py-16">{t("gradesAllYears.noDegreesYear")}</p>
                  </td>
                </tr>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}

export default GradesforAllYears;