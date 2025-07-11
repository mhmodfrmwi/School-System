import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamResults } from "../../TeacherRedux/ExamSlice";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const StudentResults = () => {
  const dispatch = useDispatch();
  const { examId } = useParams();
  const { t,i18n } = useTranslation();
  const { examResults, loading, error } = useSelector((state) => state.exam);
  const isRTL = i18n.language === 'ar';
  useEffect(() => {
    if (examId) {
      dispatch(fetchExamResults(examId));
    }
  }, [dispatch, examId]);

  const results = examResults[examId] || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col p-0">
      <div className="flex-1">
        <div className="mx-auto w-[400px] p-0 sm:w-[550px] md:w-full xl:w-full">
          <div className="m-auto flex w-[85%] flex-col">
            <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
              {t("examst.ExamResults")}{" "}
            </h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[170px]"></div>
          </div>
          <div className="relative m-auto w-[90%] px-4 font-poppins sm:px-6 lg:px-8">
            <div className="mt-7">
              <div className="overflow-x-auto">
                <table className="border-re min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-DarkManager">
                  <thead className="bg-[#117C90] text-white dark:bg-DarkManager">
                    <tr>
                      <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                        {t("assignmentt.StudentName")}
                      </th>
                      <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                        {t("assignmentt.Marks")}
                      </th>
                      <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                        {t("examst.Percentage")}
                      </th>
                      <th className={`px-3 py-2text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                        {t("assignmentt.Status")}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.length > 0 ? (
                      results.map((result, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:text-black dark:hover:bg-DarkManager/70`}
                        >
                          <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                            {result.student_id.fullName}
                          </td>
                          <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                            {result.total_marks}
                          </td>
                          <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                            {parseFloat(result.percentage).toFixed(2)}%
                          </td>
                          <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                            {result.status}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="w-full rounded-lg bg-[#F9FAFB] py-16 text-center shadow-lg dark:bg-DarkManager2"
                        >
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="mb-4 text-6xl text-gray-400"
                          />
                          <p className="mb-2 text-xl font-semibold text-gray-600 dark:text-white">
                            No Result Exams Found
                          </p>
                          <p className="mx-auto max-w-xl text-gray-500 dark:text-white">
                            It seems like there are no result exams available at
                            the moment.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
