import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExams,
  startExamSession,
  fetchSessions,
  clearError,
  fetchUpcomingExams,
  fetchCompletedExams,
  fetchMissedExams,
} from "../../components/StudentRedux/examsSlice";
import { fetchSubjects } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

const ExamsSection = () => {
  const { t } = useTranslation();
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const { gradeSubjectSemesterId, classId } = useParams();
  const navigate = useNavigate();
  const {
    exams = [],
    upcomingExams = [],
    completedExams = [],
    missedExams = [],
    sessions,
    loading,
    error,
  } = useSelector((state) => state.exams);
  const { subjects } = useSelector((state) => state.allSubjectsStudent);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredExams, setFilteredExams] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [currentPageMissed, setCurrentPageMissed] = useState(1);
  const itemsPerPage = 3;

  // Fetch all required data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchSubjects()),
          dispatch(fetchSessions()),
          dispatch(fetchExams({ gradeSubjectSemesterId, classId })),
          dispatch(fetchUpcomingExams({ gradeSubjectSemesterId, classId })),
          dispatch(fetchCompletedExams({ gradeSubjectSemesterId, classId })),
          dispatch(fetchMissedExams({ gradeSubjectSemesterId, classId })),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [dispatch, gradeSubjectSemesterId, classId]);

  useEffect(() => {
    if (subjects.length > 0 && gradeSubjectSemesterId) {
      const subject = subjects.find((subject) => subject.id === gradeSubjectSemesterId);
      if (subject) {
        setSubjectName(subject.subjectName);
      }
    }
  }, [gradeSubjectSemesterId, subjects]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: t("exams.alerts.error.title"),
        text: error,
        icon: "error",
        confirmButtonText: t("exams.alerts.error.confirmButton"),
      }).then(() => {
        dispatch(clearError());
      });
    }
  }, [error, dispatch, t]);

  // Categorize and sort exams for the "All" tab
  const categorizeAndSortExams = useCallback(
    (exams) => {
      const now = new Date();

      return [...exams].sort((a, b) => {
        const aStart = new Date(a.start_time);
        const aEnd = new Date(a.end_time);
        const bStart = new Date(b.start_time);
        const bEnd = new Date(b.end_time);

        const isAActive = aStart <= now && aEnd > now;
        const isBActive = bStart <= now && bEnd > now;

        const aSession = sessions.find((session) => session.exam_id?._id === a._id);
        const bSession = sessions.find((session) => session.exam_id?._id === b._id);
        const isASubmittedOrExpired = aSession?.status === "Submitted" || aSession?.isExpired === true;
        const isBSubmittedOrExpired = bSession?.status === "Submitted" || bSession?.isExpired === true;

        if (isAActive && !isASubmittedOrExpired && !(isBActive && !isBSubmittedOrExpired)) return -1;
        if (isBActive && !isBSubmittedOrExpired && !(isAActive && !isASubmittedOrExpired)) return 1;

        if (aStart > now && bStart <= now) return -1;
        if (bStart > now && aStart <= now) return 1;

        if (isAActive && isASubmittedOrExpired && !(isBActive && isBSubmittedOrExpired)) return -1;
        if (isBActive && isBSubmittedOrExpired && !(isAActive && isASubmittedOrExpired)) return 1;

        return bEnd - aEnd;
      });
    },
    [sessions]
  );

  useEffect(() => {
    let examsToDisplay = [];
    if (activeTab === "all") {
      examsToDisplay = categorizeAndSortExams(exams);
    } else if (activeTab === "upcoming") {
      examsToDisplay = upcomingExams;
    } else if (activeTab === "completed") {
      examsToDisplay = completedExams;
    } else if (activeTab === "missed") {
      examsToDisplay = missedExams;
    }
    setFilteredExams(examsToDisplay);
  }, [activeTab, exams, upcomingExams, completedExams, missedExams, categorizeAndSortExams]);

  const handleStartExam = (exam) => {
    const now = new Date();
    const startTime = new Date(exam.start_time);
    const endTime = new Date(exam.end_time);

    if (now < startTime) {
      Swal.fire({
        title: t("exams.alerts.notStarted.title"),
        text: t("exams.alerts.notStarted.message"),
        icon: "warning",
        confirmButtonText: t("exams.alerts.notStarted.confirmButton"),
      });
      return;
    }

    if (now > endTime) {
      Swal.fire({
        title: t("exams.alerts.examEnded.title"),
        text: t("exams.alerts.examEnded.message"),
        icon: "error",
        confirmButtonText: t("exams.alerts.examEnded.confirmButton"),
      });
      return;
    }

    const session = sessions.find((session) => session.exam_id?._id === exam._id);

    if (session && session.status === "Expired") {
      Swal.fire({
        title: t("exams.alerts.sessionExpired.title"),
        text: t("exams.alerts.sessionExpired.message"),
        icon: "error",
        confirmButtonText: t("exams.alerts.sessionExpired.confirmButton"),
      });
      return;
    }

    dispatch(startExamSession(exam._id)).then((action) => {
      if (startExamSession.fulfilled.match(action)) {
        navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}/${exam._id}`);
      } else {
        if (action.payload === "You already have an active session for this exam") {
          Swal.fire({
            title: t("exams.alerts.activeSession.title"),
            text: t("exams.alerts.activeSession.message"),
            icon: "warning",
            confirmButtonText: t("exams.alerts.activeSession.confirmButton"),
          });
          navigate(`/student/allcourses/exams/${gradeSubjectSemesterId}/${exam._id}`);
        } else {
          Swal.fire({
            title: t("exams.alerts.error.title"),
            text: action.payload || t("exams.alerts.error.message"),
            icon: "error",
            confirmButtonText: t("exams.alerts.error.confirmButton"),
          });
        }
      }
    });
  };

  // Pagination logic
  const currentPage =
    activeTab === "all"
      ? currentPageAll
      : activeTab === "upcoming"
      ? currentPageUpcoming
      : activeTab === "completed"
      ? currentPageCompleted
      : currentPageMissed;
  const totalPagesAll = Math.ceil(filteredExams.length / itemsPerPage);
  const totalPagesUpcoming = Math.ceil(upcomingExams.length / itemsPerPage);
  const totalPagesCompleted = Math.ceil(completedExams.length / itemsPerPage);
  const totalPagesMissed = Math.ceil(missedExams.length / itemsPerPage);
  const totalPages =
    activeTab === "all"
      ? totalPagesAll
      : activeTab === "upcoming"
      ? totalPagesUpcoming
      : activeTab === "completed"
      ? totalPagesCompleted
      : totalPagesMissed;

  const paginatedExams =
    activeTab === "all"
      ? filteredExams.slice((currentPageAll - 1) * itemsPerPage, currentPageAll * itemsPerPage)
      : activeTab === "upcoming"
      ? upcomingExams.slice((currentPageUpcoming - 1) * itemsPerPage, currentPageUpcoming * itemsPerPage)
      : activeTab === "completed"
      ? completedExams.slice((currentPageCompleted - 1) * itemsPerPage, currentPageCompleted * itemsPerPage)
      : missedExams.slice((currentPageMissed - 1) * itemsPerPage, currentPageMissed * itemsPerPage);

  const nextPage = () => {
    if (activeTab === "all" && currentPageAll < totalPagesAll) {
      setCurrentPageAll(currentPageAll + 1);
    } else if (activeTab === "upcoming" && currentPageUpcoming < totalPagesUpcoming) {
      setCurrentPageUpcoming(currentPageUpcoming + 1);
    } else if (activeTab === "completed" && currentPageCompleted < totalPagesCompleted) {
      setCurrentPageCompleted(currentPageCompleted + 1);
    } else if (activeTab === "missed" && currentPageMissed < totalPagesMissed) {
      setCurrentPageMissed(currentPageMissed + 1);
    }
  };

  const prevPage = () => {
    if (activeTab === "all" && currentPageAll > 1) {
      setCurrentPageAll(currentPageAll - 1);
    } else if (activeTab === "upcoming" && currentPageUpcoming > 1) {
      setCurrentPageUpcoming(currentPageUpcoming - 1);
    } else if (activeTab === "completed" && currentPageCompleted > 1) {
      setCurrentPageCompleted(currentPageCompleted - 1);
    } else if (activeTab === "missed" && currentPageMissed > 1) {
      setCurrentPageMissed(currentPageMissed - 1);
    }
  };

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
            <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
          </h2>
          <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/videos/${gradeSubjectSemesterId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">01</span>
                {t("exams.sidebar.videoLectures")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/materials/${gradeSubjectSemesterId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">02</span>
                {t("exams.sidebar.courseMaterial")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/virtualrooms/${gradeSubjectSemesterId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">03</span>
                {t("exams.sidebar.virtualRooms")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/assignments/${gradeSubjectSemesterId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">04</span>
                {t("exams.sidebar.assignments")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-[#BFBFBF] dark:bg-[#C459D9] text-white font-medium py-4 rounded-lg"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">05</span>
                {t("exams.sidebar.exams")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/questionbank/${gradeSubjectSemesterId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">06</span>
                {t("exams.sidebar.questionBank")}
              </Button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
            {t("exams.main.title")}
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
              {t("exams.main.allTab")} ({exams.length})
            </Button>
            <Button
              variant={activeTab === "upcoming" ? "outline" : "solid"}
              className={`${
                activeTab === "upcoming"
                  ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                  : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
              } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => setActiveTab("upcoming")}
            >
              {t("exams.main.upcomingTab")} ({upcomingExams.length})
            </Button>
            <Button
              variant={activeTab === "completed" ? "outline" : "solid"}
              className={`${
                activeTab === "completed"
                  ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                  : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
              } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => setActiveTab("completed")}
            >
              {t("exams.main.completedTab")} ({completedExams.length})
            </Button>
            <Button
              variant={activeTab === "missed" ? "outline" : "solid"}
              className={`${
                activeTab === "missed"
                  ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                  : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
              } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => setActiveTab("missed")}
            >
              {t("exams.main.missedTab")} ({missedExams.length})
            </Button>
          </div>

          {/* Secondary Loading State (for actions after initial load) */}
          {loading && !initialLoading && (
            <div className="flex items-center justify-center text-center text-gray-500 dark:text-gray-300 mt-10">
              <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-[#C459D9] mb-4 mr-5" />
              <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                {t("exams.main.loading")}
              </p>
            </div>
          )}

          {/* Content Area - only show when not in loading state */}
          {!loading && (
            <>
              {/* No Exams Message */}
              {activeTab === "all" && filteredExams.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                    {t("exams.main.noExams.all")}
                  </CardContent>
                </Card>
              )}
              {activeTab === "upcoming" && upcomingExams.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                    {t("exams.main.noExams.upcoming")}
                  </CardContent>
                </Card>
              )}
              {activeTab === "completed" && completedExams.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                    {t("exams.main.noExams.completed")}
                  </CardContent>
                </Card>
              )}
              {activeTab === "missed" && missedExams.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                    {t("exams.main.noExams.missed")}
                  </CardContent>
                </Card>
              )}

              {/* Exam Cards */}
              {filteredExams.length > 0 && (
                <div className="space-y-4">
                  {paginatedExams.map((exam, index) => (
                    <Card key={exam._id} className="border border-gray-200 dark:border-none rounded-xl shadow-sm">
                      <CardContent className="flex items-center justify-center p-4 bg-gray-100 dark:bg-[#281459]">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 flex items-center justify-center bg-pink-200 dark:bg-[#C459D9] rounded-full text-pink-600 dark:text-white font-bold">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </div>
                          <div>
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-300">
                              {exam.title}
                            </h2>
                            <p className="text-md text-gray-700 dark:text-gray-400">
                              {t("exams.main.examCard.description")}: {exam.description}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                              {t("exams.main.examCard.createdBy")}: {exam.created_by.fullName}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                              {t("exams.main.examCard.duration")}: {exam.duration}{" "}
                              {t("exams.main.examCard.minutes")}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                              {t("exams.main.examCard.startTime")}:{" "}
                              {new Date(exam.start_time).toLocaleString()}
                              <span className="text-pink-600 dark:text-[#C459D9]"> | </span>
                              {t("exams.main.examCard.endTime")}:{" "}
                              {new Date(exam.end_time).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Start Exam */}
                        <div
                          className="ml-4"
                          title={
                            new Date() < new Date(exam.start_time)
                              ? t("exams.main.examCard.notStartedTooltip")
                              : new Date() > new Date(exam.end_time)
                              ? t("exams.main.examCard.endedTooltip")
                              : ""
                          }
                        >
                          <Button
                            variant="solid"
                            className="text-white bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-3 py-2 rounded-lg"
                            onClick={() => {
                              const session = sessions.find((session) => session.exam_id?._id === exam._id);
                              if (session?.status === "Submitted" || session?.isExpired === true) {
                                navigate(
                                  `/student/allcourses/exams/${gradeSubjectSemesterId}/result/${exam._id}`
                                );
                              } else {
                                handleStartExam(exam);
                              }
                            }}
                            disabled={
                              (new Date() > new Date(exam.end_time) &&
                                !sessions.find((session) => session.exam_id?._id === exam._id)) ||
                              new Date() < new Date(exam.start_time) ||
                              exam.type === "Offline"
                            }
                          >
                            {(() => {
                              if (exam.type === "Offline") return t("exams.main.examCard.offline");
                              const session = sessions.find((session) => session.exam_id?._id === exam._id);
                              if (session?.status === "Submitted") return t("exams.main.examCard.view");
                              if (session?.isExpired === true) return t("exams.main.examCard.view");
                              if (new Date() < new Date(exam.start_time))
                                return t("exams.main.examCard.notStarted");
                              if (new Date() > new Date(exam.end_time))
                                return t("exams.main.examCard.ended");
                              return t("exams.main.examCard.start");
                            })()}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {filteredExams.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-4 mb-4 mt-10">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-200 dark:bg-[#312A5E] text-gray-700 dark:text-gray-300 rounded-full disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  <span className="text-gray-800 dark:text-gray-300 font-medium">
                    {t("exams.main.page")} {currentPage} {t("exams.main.of")} {totalPages}
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

export default ExamsSection;