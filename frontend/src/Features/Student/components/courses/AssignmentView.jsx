import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAssignmentById, submitAssignment, clearError } from "../../components/StudentRedux/assignmentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

const AssignmentView = () => {
  const { t } = useTranslation();
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();
  const { assignmentId, gradeSubjectSemesterId } = useParams();
  const navigate = useNavigate();
  const { currentAssignment, loadingAssignmentById, error } = useSelector((state) => state.assignments);
  const [submissionText, setSubmissionText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchAssignmentById(assignmentId));
  }, [dispatch, assignmentId]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: t("assignment.view.error.title"),
        text: error,
        icon: "error",
        confirmButtonText: t("assignment.view.error.confirmButton"),
      }).then(() => {
        dispatch(clearError());
      });
    }
  }, [error, dispatch, t]);

  const handleSubmit = async () => {
    if (!submissionText.trim()) {
      Swal.fire({
        title: t("assignment.view.error.title"),
        text: t("assignment.view.error.emptySubmission"),
        icon: "error",
        confirmButtonText: t("assignment.view.error.confirmButton"),
      });
      return;
    }

    const submissionData = {
      submission_text: submissionText,
    };

    const result = await dispatch(submitAssignment({ assignmentId, submissionData }));
    if (submitAssignment.fulfilled.match(result)) {
      Swal.fire({
        title: t("assignment.view.success.title"),
        text: t("assignment.view.success.submitted"),
        icon: "success",
        confirmButtonText: t("assignment.view.success.confirmButton"),
      }).then(() => {
        navigate(`/student/allcourses/assignments/${gradeSubjectSemesterId}`);
      });
      setIsSubmitted(true);
    }
  };

  if (loadingAssignmentById) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role={role} />
      </div>
    );
  }

  if (!currentAssignment) {
    return (
      <div className="flex items-center justify-center min-h-[68vh] bg-white dark:bg-[#13082F] relative">
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
        <div className="relative z-10 w-full max-w-2xl">
          <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm p-6 bg-white dark:bg-[#312A5E]">
            <CardContent className="border border-gray-200 dark:border-[#E0AAEE] rounded-lg dark:bg-[#281459]">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mb-4">
                {t("assignment.view.noAssignment")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t("assignment.view.noAssignmentFound")}
              </p>
            </CardContent>
          </Card>
        </div>
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
            {currentAssignment.title}
            <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
                  }`}></span>
          </h1>
          <Button
            variant="solid"
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(-1)}
          >
            {t("assignment.view.back")}
          </Button>
        </div>

        {/* Assignment Details */}
        <div className="w-full">
          <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm p-6 dark:bg-[#312A5E]">
            <CardContent className="p-3 border border-gray-200 dark:border-[#E0AAEE] rounded-lg dark:bg-[#281459]">
              <p className="text-gray-700 dark:text-gray-300 mb-6 font-semibold text-xl">
                {currentAssignment.description}
              </p>

              <div className="mb-6">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {t("assignment.view.dueDate")}: {new Date(currentAssignment.due_date).toLocaleString()}
                </p>
              </div>

              <div className="mt-6">
                <textarea
                  className="w-full p-3 border border-gray-300 dark:border-[#E0AAEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#C459D9] bg-white dark:bg-[#281459] text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
                  rows="6"
                  placeholder={t("assignment.view.enterAnswer")}
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  disabled={isSubmitted}
                />
              </div>

              <div className="mt-6">
                <Button
                  variant="solid"
                  className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? t("assignment.view.viewSubmission") : t("assignment.view.submitAssignment")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignmentView;