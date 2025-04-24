import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllStudentSubmissions, clearError } from "../../components/StudentRedux/assignmentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

const SubmissionView = () => {
  const { t,i18n } = useTranslation(); // Removed unused i18n
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const { studentSubmissions, loadingSubmissions, error } = useSelector((state) => state.assignments);

  useEffect(() => {
    dispatch(fetchAllStudentSubmissions());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: t("submission.view.error.title"),
        text: error,
        icon: "error",
        confirmButtonText: t("submission.view.error.confirmButton"),
      }).then(() => {
        dispatch(clearError());
      });
    }
  }, [error, dispatch, t]); // Added 't' to dependency array

  const submission = studentSubmissions.find(
    (submission) => submission.assignment_id?._id === assignmentId
  );

  if (loadingSubmissions) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role={role} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative">
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
      <div className="relative z-10 flex flex-wrap font-poppins gap-6 w-[90%] mx-auto mt-16 mb-20 min-h-[68vh]">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
            {submission ? submission.assignment_id?.title : t("submission.view.title")}
            <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
                  }`}></span>
          </h1>
          <Button
            variant="solid"
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(-1)}
          >
            {t("submission.view.back")}
          </Button>
        </div>

        {/* Submission Details */}
        {submission ? (
          <div className="w-full">
            <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm p-6 dark:bg-[#312A5E]">
              <CardContent className="p-6 border border-gray-200 dark:border-[#E0AAEE] rounded-lg dark:bg-[#281459]">
                <div className="mb-6">
                  <p className="text-lg font-semibold text-transparent bg-clip-text bg-[#fc9e6e] dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                    {t("submission.view.yourGrade")}:{" "}
                    {submission.grade !== undefined ? submission.grade : t("submission.view.notGraded")}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {submission.assignment_id?.description}
                </p>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("submission.view.dueDate")}:{" "}
                    {new Date(submission.assignment_id?.due_date).toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-[#FD813D]/10 via-[#CF72C0]/10 to-[#BC6FFB]/10 dark:from-[#CE4EA0]/10 dark:via-[#BF4ACB]/10 dark:to-[#AE45FB]/10 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
                    {t("submission.view.yourSubmission")}:
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {submission.submission_text}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="w-full">
            <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm p-6 dark:bg-[#281459]">
              <CardContent className="p-6 border border-gray-200 dark:border-[#E0AAEE] rounded-lg font-poppins flex flex-col items-center justify-center min-h-[38vh]">
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mb-4">
                  {t("submission.view.noSubmission")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("submission.view.noSubmissionFound")}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionView;