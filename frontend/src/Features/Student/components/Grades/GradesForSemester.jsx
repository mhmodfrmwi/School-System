import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDegreesBySemester } from "../StudentRedux/gradesStudentSlice";
import Loader from "@/ui/Loader";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

function GradesForSemester() {
  const { t } = useTranslation();
  const { semesterDegrees, loading } = useSelector(
    (state) => state.studentGrades,
  );
  const role = sessionStorage.getItem("role");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDegreesBySemester());
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
    <section className="font-poppins min-h-screen w-[88%] mx-auto mt-16 pt-4 mb-20">
     

      {/* Header Section */}
      <div className="w-full flex justify-between items-center mb-16 relative z-10">
        <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
          {t("gradesSemester.title")}
          <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => navigate(-1)}
        >
          {t("gradesSemester.back")}
        </Button>
      </div>

      {/* Table Section */}
      <div className="mx-auto rounded-xl border border-gray-200 dark:border-[#E0AAEE] shadow-md font-poppins mb-20 relative z-10">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white dark:bg-[#281459] p-6 shadow-md">
            <thead>
              <tr>
                <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                  {t("gradesSemester.headers.subjectName")}
                </th>
                <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                  {t("gradesSemester.headers.midtermDegree")}
                </th>
                <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                  {t("gradesSemester.headers.maxMidtermDegree")}
                </th>
                <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                  {t("gradesSemester.headers.finalDegree")}
                </th>
                <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                  {t("gradesSemester.headers.maxFinalDegree")}
                </th>
                <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                  {t("gradesSemester.headers.subjectScore")}
                </th>
                <th className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center text-gray-700 dark:text-[#E0AAEE] bg-[#D6A3E1] dark:bg-[#3B1E77]">
                  {t("gradesSemester.headers.maxSubjectScore")}
                </th>
              </tr>
            </thead>
            <tbody>
              {semesterDegrees?.length > 0 ? (
                semesterDegrees?.map((item, index) => {
                  const scoreSubject =
                    (item.midterm?.examGrade || 0) +
                    (item.final?.examGrade || 0);
                  const maxScoreSubject =
                    (item.midterm?.finalDegree || 0) +
                    (item.final?.finalDegree || 0);

                  return (
                    <tr
                      key={item.subjectId}
                      className={`border-b border-gray-200 dark:border-[#E0AAEE] ${
                        index % 2 === 0
                          ? "bg-white dark:bg-[#281459]"
                          : "bg-[#F9F9F9] dark:bg-[#3B1E77]"
                      } hover:bg-[#F3E5F5] dark:hover:bg-[#4B3B7A] transition duration-200`}
                    >
                      <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                        {item.subjectName}
                      </td>
                      <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                        {item.midterm?.examGrade ?? "-"}
                      </td>
                      <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                        {item.midterm?.finalDegree ?? "-"}
                      </td>
                      <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                        {item.final?.examGrade ?? "-"}
                      </td>
                      <td className="border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins text-[#5e5b63] dark:text-[#D1D5DB]">
                        {item.final?.finalDegree ?? "-"}
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
                    className="px-4 py-12 text-center text-lg text-gray-500 dark:text-[#D1D5DB]"
                  >
                    <p className="py-16">{t("gradesSemester.noDegrees")}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </div>
  );
}

export default GradesForSemester;