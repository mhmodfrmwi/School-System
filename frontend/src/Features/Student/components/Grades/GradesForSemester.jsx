import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDegreesBySemester } from "../StudentRedux/gradesStudentSlice";
import Loader from "@/ui/Loader";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
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
          <div className=" mt-16 mb-20 min-h-screen w-[95%] mx-auto">
          <Loader role={role}/>
          </div>
        );
  }

  return (
    <section className="font-poppins min-h-screen w-[88%] mx-auto mt-16 pt-4 mb-20">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center mb-16">
            <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
            {t("gradesSemester.title")}
              <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
            </h1>
            <Button
              variant="solid"
              className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(-1)}
            >
              {t("gradesSemester.back")}
            </Button>
          </div>

      {/* Table Section */}
      <div className="mx-auto  rounded-xl border border-gray-200 shadow-md font-poppins mb-20">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white p-6 shadow-md">
            <thead>
              <tr>
                <th className="border-b border-l border-gray-200 px-4 py-4 text-center text-gray-700 bg-[#D6A3E1]">
                {t("gradesSemester.headers.subjectName")}
                </th>
                <th className="border-b border-l border-gray-200 px-4 py-4 text-center text-gray-700 bg-[#D6A3E1]">
                {t("gradesSemester.headers.midtermDegree")}
                </th>
                <th className="border-b border-l border-gray-200 px-4 py-4 text-center text-gray-700 bg-[#D6A3E1]">
                {t("gradesSemester.headers.maxMidtermDegree")}
                </th>
                <th className="border-b border-l border-gray-200 px-4 py-4 text-center text-gray-700 bg-[#D6A3E1]">
                {t("gradesSemester.headers.finalDegree")}
                </th>
                <th className="border-b border-l border-gray-200 px-4 py-4 text-center text-gray-700 bg-[#D6A3E1]">
                {t("gradesSemester.headers.maxFinalDegree")}
                </th>
                <th className="border-b border-l border-gray-200 px-4 py-4 text-center text-gray-700 bg-[#D6A3E1]">
                {t("gradesSemester.headers.subjectScore")}
                </th>
                <th className="border-b border-l border-gray-200 px-4 py-4 text-center text-gray-700 bg-[#D6A3E1]">
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
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                      } hover:bg-[#F3E5F5] transition duration-200`}
                    >
                      <td className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63]">
                        {item.subjectName}
                      </td>
                      <td className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63]">
                        {item.midterm?.examGrade ?? "-"}
                      </td>
                      <td className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63]">
                        {item.midterm?.finalDegree ?? "-"}
                      </td>
                      <td className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63]">
                        {item.final?.examGrade ?? "-"}
                      </td>
                      <td className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63]">
                        {item.final?.finalDegree ?? "-"}
                      </td>
                      <td className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63]">
                        {scoreSubject}
                      </td>
                      <td className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63]">
                        {maxScoreSubject}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-12 text-center text-lg text-gray-500"
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
  );
}

export default GradesForSemester;