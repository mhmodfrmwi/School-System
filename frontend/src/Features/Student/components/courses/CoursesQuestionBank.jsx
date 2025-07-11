import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  addToBookmark,
  fetchBookmarks,
  markQuestionAsViewed,
  clearError,
} from "../../components/StudentRedux/questionBankSlice";
import { fetchSubjects } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaEye, FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

const CoursesQuestionBank = () => {
  const { t ,i18n} = useTranslation();
  const role = sessionStorage.getItem("role");
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const itemsPerPage = 3;
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const { questions, bookmarks, loading, error } = useSelector(
    (state) => state.studentQuestionBank
  );
  const { subjects } = useSelector((state) => state.allSubjectsStudent);
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    if (subjectId) {
      Promise.all([
        dispatch(fetchQuestions(subjectId)),
        dispatch(fetchBookmarks()),
      ]).then(() => {
        setInitialLoading(false);
      }).catch(() => {
        setInitialLoading(false);
      });
    }
  }, [dispatch, subjectId]);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (subjects.length > 0 && subjectId) {
      const subject = subjects.find((subject) => subject.id === subjectId);
      if (subject) {
        setSubjectName(subject.subjectName);
      }
    }
  }, [subjectId, subjects]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: t("questionBank.error.title"),
        text: error,
        icon: "error",
        confirmButtonText: t("questionBank.error.confirmButton"),
      }).then(() => {
        dispatch(clearError());
      });
    }
  }, [error, dispatch, t]);

  const handleBookmark = (questionId) => {
    dispatch(addToBookmark(questionId));
  };

  const handleViewQuestion = (questionId) => {
    const question = questions.find((q) => q._id === questionId);
    if (question && !question.isViewed) {
      dispatch(markQuestionAsViewed(questionId));
    }
    navigate(`/student/question-details/${subjectId}/${questionId}`);
  };

  const bookmarkedQuestions = questions.filter((question) =>
    bookmarks?.some((bookmark) => bookmark?.question_id?._id === question._id)
  );

  const displayedQuestions = activeTab === "all" ? questions : bookmarkedQuestions;
  const totalPages = Math.ceil(displayedQuestions.length / itemsPerPage);

  const paginatedQuestions = displayedQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Show full-page loading during initial data fetch
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#13082F]">
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

      <div className="relative z-10 flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-12 mb-20">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white dark:bg-[#13082F] md:border-r border-gray-300 dark:border-[#E0AAEE] p-6 mt-2 md:h-[550px]">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative">
            {subjectName}
            <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
                  }`}></span>
          </h2>
          <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/videos/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">01</span>
                {t("questionBank.sidebar.videoLectures")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/materials/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">02</span>
                {t("questionBank.sidebar.courseMaterial")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/virtualrooms/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">03</span>
                {t("questionBank.sidebar.virtualRooms")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/assignments/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">04</span>
                {t("questionBank.sidebar.assignments")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/exams/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">05</span>
                {t("questionBank.sidebar.exams")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-[#BFBFBF] dark:bg-[#C459D9] text-white font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/questionbank/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">06</span>
                {t("questionBank.sidebar.questionBank")}
              </Button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
            {t("questionBank.title")}
          </h1>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant={activeTab === "all" ? "outline" : "solid"}
              className={`${
                activeTab === "all"
                  ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                  : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
              } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => setActiveTab("all")}
            >
              {t("questionBank.tabs.all")} ({questions.length})
            </Button>
            <Button
              variant={activeTab === "bookmarks" ? "outline" : "solid"}
              className={`${
                activeTab === "bookmarks"
                  ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                  : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
              } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => setActiveTab("bookmarks")}
            >
              {t("questionBank.tabs.bookmarks")} ({bookmarkedQuestions.length})
            </Button>
          </div>

          {/* Secondary Loading State (for actions after initial load) */}
          {loading && !initialLoading && (
            <div className="flex items-center justify-center text-center text-gray-500 dark:text-gray-300 mt-10">
              <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-[#C459D9] mb-4 mr-5" />
              <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                {t("questionBank.messages.loading")}
              </p>
            </div>
          )}

          {/* Content Area - only show when not in loading state */}
          {!loading && (
            <>
              {/* No Questions Message */}
              {activeTab === "all" && questions.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                    {t("questionBank.messages.noQuestions")}
                  </CardContent>
                </Card>
              )}
              {activeTab === "bookmarks" && bookmarkedQuestions.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                    {t("questionBank.messages.noBookmarks")}
                  </CardContent>
                </Card>
              )}

              {/* Question Cards */}
              {displayedQuestions.length > 0 && (
                <div className="space-y-4">
                  {paginatedQuestions.map((question, index) => (
                    <Card key={question._id} className="border border-gray-200 dark:border-none rounded-xl shadow-sm">
                      <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100 dark:bg-[#281459]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex items-center justify-center bg-pink-200 dark:bg-[#C459D9] rounded-full text-pink-600 dark:text-white font-bold">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </div>
                          <div>
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-300">
                              {question.questionText}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{question.questionType}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {t("questionBank.messages.teacher")}: {question.teacherId.fullName}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 text-gray-500">
                          <div
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-[#312A5E] rounded-full cursor-pointer"
                            onClick={() => handleBookmark(question._id)}
                          >
                            <FaBookmark
                              className={`${
                                bookmarks.some((bookmark) => bookmark?.question_id?._id === question._id)
                                  ? "text-yellow-500"
                                  : "text-gray-800 dark:text-gray-300"
                              }`}
                            />
                          </div>
                          <div
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-[#312A5E] rounded-full cursor-pointer"
                            onClick={() => handleViewQuestion(question._id)}
                          >
                            <FaEye
                              className={`${
                                question.isViewed ? "text-blue-500" : "text-gray-800 dark:text-gray-300"
                              }`}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {displayedQuestions.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-4 mb-4 mt-10">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-200 dark:bg-[#312A5E] text-gray-700 dark:text-gray-300 rounded-full disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  <span className="text-gray-800 dark:text-gray-300 font-medium">
                    {t("questionBank.pagination.page")} {currentPage} {t("questionBank.pagination.of")} {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-gray-200 dark:bg-[#312A5E] text-gray-700 dark:text-gray-300 rounded-full disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesQuestionBank;