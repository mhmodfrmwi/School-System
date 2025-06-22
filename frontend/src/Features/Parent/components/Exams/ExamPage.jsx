import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExams,
  fetchCompletedExams,
  fetchMissedExams,
  fetchUpcomingExams,
  fetchRunningExams,
  clearExamError
} from "../ParentRedux/ParentExamsSlice";
import { fetchSubjects } from "../../components/ParentRedux/CoursesSlice";

const ExamsParent = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { subjects } = useSelector((state) => state.allSubjectsParent);
  const [subjectName, setSubjectName] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [currentPageMissed, setCurrentPageMissed] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPageRunning, setCurrentPageRunning] = useState(1);
  const itemsPerPage = 3;

  // Redux state
  const dispatch = useDispatch();
  const {
    allExams,
    completedExams,
    missedExams,
    upcomingExams,
    runningExams,
    studentResults,
    loading,
    error
  } = useSelector((state) => state.parentExam);

  // Get selected student from parent state
  const selectedStudent = useSelector((state) => state.motivationparent.selectedKid);

  const [storedStudentId, setStoredStudentId] = useState(() => {
    return localStorage.getItem('selectedStudentId') || null;
  });

  useEffect(() => {
    if (selectedStudent?._id) {
      localStorage.setItem('selectedStudentId', selectedStudent._id);
      setStoredStudentId(selectedStudent._id);
    }
  }, [selectedStudent]);

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
    const studentIdToUse = selectedStudent?._id || storedStudentId;
    if (studentIdToUse && subjectId) {

      // Fetch all exams
      dispatch(fetchAllExams(subjectId))



      // Fetch completed exams
      dispatch(fetchCompletedExams(subjectId))


      // Fetch missed exams
      dispatch(fetchMissedExams(subjectId))
        .then((result) => {
          if (result.payload) {
            console.log("Missed exams data:", result.payload);
          }
          if (result.error) {
            console.error("Error fetching missed exams:", result.error);
          }
        });


      dispatch(fetchUpcomingExams(subjectId)).then((result) => {
        console.log("Upcoming exams data:", result.payload);
      });

      dispatch(fetchRunningExams(subjectId))  // Add this
        .then((result) => {
          console.log("Running exams data:", result.payload);
        });

    }
  }, [dispatch, selectedStudent, storedStudentId, subjectId]);

  // Filter exams based on active tab
  // const filteredExams = activeTab === "completed"
  //   ? allExams.filter(exam => exam.status === "completed" && exam.result)
  //   : activeTab === "missed"
  //     ? allExams.filter(exam => exam.status === "missed")
  //     : activeTab === "upcoming"
  //       ? allExams.filter(exam => exam.status === "upcoming")
  //       : allExams;


  const filteredExams =
    activeTab === "completed"
      ? completedExams
      : activeTab === "missed"
        ? missedExams
        : activeTab === "upcoming"
          ? upcomingExams
          : activeTab === "running"
            ? runningExams
            : allExams;

  // عدل دالة currentPage لتشمل upcoming exams
  const currentPage = activeTab === "all"
    ? currentPageAll
    : activeTab === "completed"
      ? currentPageCompleted
      : activeTab === "missed"
        ? currentPageMissed
        : activeTab === "upcoming"
          ? currentPageUpcoming
          : currentPageRunning;  // Add this case

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const paginatedExams = filteredExams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStartExam = (exam) => {
    if (exam.status !== "upcoming") {
      console.log(`Exam is ${exam.status} - cannot be started`);
      return;
    }

    console.log("Starting upcoming exam:", exam);
    // navigate(`/exam/${exam._id}`);
  };

  const nextPage = () => {
    if (activeTab === "all") {
      setCurrentPageAll(prev => Math.min(prev + 1, totalPages));
    } else if (activeTab === "completed") {
      setCurrentPageCompleted(prev => Math.min(prev + 1, totalPages));
    } else if (activeTab === "missed") {
      setCurrentPageMissed(prev => Math.min(prev + 1, totalPages));
    } else if (activeTab === "upcoming") {
      setCurrentPageUpcoming(prev => Math.min(prev + 1, totalPages));
    } else if (activeTab === "running") {  // Add this case
      setCurrentPageRunning(prev => Math.min(prev + 1, totalPages));
    }
  };

  const prevPage = () => {
    if (activeTab === "all") {
      setCurrentPageAll(prev => Math.max(prev - 1, 1));
    } else if (activeTab === "completed") {
      setCurrentPageCompleted(prev => Math.max(prev - 1, 1));
    } else if (activeTab === "missed") {
      setCurrentPageMissed(prev => Math.max(prev - 1, 1));
    } else if (activeTab === "upcoming") {
      setCurrentPageUpcoming(prev => Math.max(prev - 1, 1));
    } else if (activeTab === "running") {  // Add this case
      setCurrentPageRunning(prev => Math.max(prev - 1, 1));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t("exams.main.examCard.notSpecified");

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return t("exams.main.examCard.notSpecified");

      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleDateString(i18n.language, options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return t("exams.main.examCard.notSpecified");
    }
  };
  // Add this debug useEffect
  useEffect(() => {
    console.log("Current missed exams:", missedExams);
    console.log("Current active tab:", activeTab);
    console.log("Current filtered exams:", filteredExams);
  }, [missedExams, activeTab, filteredExams]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      console.error("Exam error:", error);
      const timer = setTimeout(() => {
        dispatch(clearExamError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);


  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative">
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{ backgroundImage: `url(${backgroundStars})` }}
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{ backgroundImage: `url(${backgroundWaves})` }}
      ></div>

      <div className="relative z-10 flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-12 mb-20">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white dark:bg-[#13082F] md:border-r border-gray-300 dark:border-[#E0AAEE] p-6 mt-2 md:h-[550px]">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative">
            {subjectName || t("exams.main.Subjects")}
            <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}></span>
          </h2>
          <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg hover:bg-gradient-to-r hover:from-[#FD813D20] hover:via-[#CF72C020] hover:to-[#BC6FFB20] dark:hover:from-[#CE4EA020] dark:hover:via-[#BF4ACB20] dark:hover:to-[#AE45FB20]"
                onClick={() => navigate(`/parent/all-subjects/virtualrooms/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">01</span>
                {t("exams.sidebar.virtualRooms")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg hover:bg-gradient-to-r hover:from-[#FD813D20] hover:via-[#CF72C020] hover:to-[#BC6FFB20] dark:hover:from-[#CE4EA020] dark:hover:via-[#BF4ACB20] dark:hover:to-[#AE45FB20]"
                onClick={() => navigate(`/parent/all-subjects/assignments/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">02</span>
                {t("exams.sidebar.assignments")}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-[#BFBFBF] dark:bg-[#C459D9] text-white font-medium py-4 rounded-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
              >
                <span className="text-white mr-2">03</span>
                {t("exams.sidebar.exams")}
              </Button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
            {t("exams.main.title")}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant={activeTab === "all" ? "outline" : "solid"}
              className={`${activeTab === "all"
                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#FD813D10] hover:via-[#CF72C010] hover:to-[#BC6FFB10] dark:hover:from-[#CE4EA010] dark:hover:via-[#BF4ACB10] dark:hover:to-[#AE45FB10]"
                } px-4 md:px-6 py-2 rounded-full transition-all duration-300`}
              onClick={() => setActiveTab("all")}
            >
              {t("exams.main.allTab")} ({allExams.length})
            </Button>
            <Button
              variant={activeTab === "completed" ? "outline" : "solid"}
              className={`${activeTab === "completed"
                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#FD813D10] hover:via-[#CF72C010] hover:to-[#BC6FFB10] dark:hover:from-[#CE4EA010] dark:hover:via-[#BF4ACB10] dark:hover:to-[#AE45FB10]"
                } px-4 md:px-6 py-2 rounded-full transition-all duration-300`}
              onClick={() => setActiveTab("completed")}
            >
              {t("exams.main.completedTab")} ({completedExams.length})
            </Button>
            <Button
              variant={activeTab === "upcoming" ? "outline" : "solid"}
              className={`${activeTab === "upcoming"
                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#FD813D10] hover:via-[#CF72C010] hover:to-[#BC6FFB10] dark:hover:from-[#CE4EA010] dark:hover:via-[#BF4ACB10] dark:hover:to-[#AE45FB10]"
                } px-4 md:px-6 py-2 rounded-full transition-all duration-300`}
              onClick={() => setActiveTab("upcoming")}
            >
              {t("exams.main.upcomingTab")} ({upcomingExams.length})
            </Button>
            <Button
              variant={activeTab === "running" ? "outline" : "solid"}
              className={`${activeTab === "running"
                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#FD813D10] hover:via-[#CF72C010] hover:to-[#BC6FFB10] dark:hover:from-[#CE4EA010] dark:hover:via-[#BF4ACB10] dark:hover:to-[#AE45FB10]"
                } px-4 md:px-6 py-2 rounded-full transition-all duration-300`}
              onClick={() => setActiveTab("running")}
            >
              {t("exams.main.runningTab")} ({runningExams.length})
            </Button>
            <Button
              variant={activeTab === "missed" ? "outline" : "solid"}
              className={`${activeTab === "missed"
                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#FD813D10] hover:via-[#CF72C010] hover:to-[#BC6FFB10] dark:hover:from-[#CE4EA010] dark:hover:via-[#BF4ACB10] dark:hover:to-[#AE45FB10]"
                } px-4 md:px-6 py-2 rounded-full transition-all duration-300`}
              onClick={() => setActiveTab("missed")}
            >
              {t("exams.main.missedTab")} ({missedExams.length})
            </Button>

          </div>

          {loading ? (
            <div className="flex items-center justify-center text-center text-gray-500 dark:text-gray-300 mt-10">
              <FaSpinner className="animate-spin text-4xl text-[#BC6FFB] dark:text-[#AE45FB] mb-4 mr-5" />
              <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                {t("exams.main.loading")}
              </p>
            </div>
          ) : (
            <>
              {filteredExams.length === 0 ? (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                    {activeTab === "all" && t("exams.main.noExams.all")}
                    {activeTab === "completed" && t("exams.main.noExams.completed")}
                    {activeTab === "upcoming" && t("exams.main.noExams.upcoming")}
                    {activeTab === "running" && t("exams.main.noExams.running")}
                    {activeTab === "missed" && t("exams.main.noExams.missed")}

                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="space-y-4">
                    {paginatedExams.map((exam, index) => {
                      const examResult = studentResults.find(result => result.exam_id._id === exam._id);

                      return (
                        <Card key={exam._id} className="border border-gray-200 dark:border-none rounded-xl shadow-sm">
                          <CardContent className="flex items-center justify-center p-4 bg-gray-100 dark:bg-[#281459]">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-10 h-10 flex items-center justify-center bg-pink-200 dark:bg-[#C459D9] rounded-full text-pink-600 dark:text-white font-bold">
                                {index + 1 + (currentPage - 1) * itemsPerPage}
                              </div>
                              <div className="flex-1">
                                <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-300">
                                  {exam.title}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                                  <div>
                                    <p className="text-gray-700 dark:text-gray-400">
                                      <span className="font-medium text-gray-900 dark:text-gray-200">{t("exams.main.examCard.description")}:</span> {exam.description || t("exams.main.examCard.notSpecified")}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400">
                                      <span className="font-medium text-gray-900 dark:text-gray-200">{t("exams.main.examCard.type")}:</span> {exam.type}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400">
                                      <span className="font-medium text-gray-900 dark:text-gray-200">{t("exams.main.examCard.instructor")}:</span> {exam.created_by?.fullName || t("exams.main.examCard.notSpecified")}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-700 dark:text-gray-400">
                                      <span className="font-medium text-gray-900 dark:text-gray-200">{t("exams.main.examCard.duration")}:</span> {exam.duration} {t("exams.main.examCard.minutes")}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400">
                                      <span className="font-medium text-gray-900 dark:text-gray-200">{t("exams.main.examCard.totalMarks")}:</span> {exam.total_marks}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400">
                                      <span className="font-medium text-gray-900 dark:text-gray-200">{t("exams.main.examCard.startTime")}:</span> {formatDate(exam.start_time)}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400">
                                      <span className="font-medium text-gray-900 dark:text-gray-200">{t("exams.main.examCard.endTime")}:</span> {formatDate(exam.end_time)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Result and Button */}
                            <div className="ml-4 flex flex-col items-end min-w-[180px]">
                              <Button
                                variant="solid"
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-default
    ${activeTab === "completed" || exam.status === "completed"
                                    ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                    : exam.status === "missed" || activeTab === "missed"
                                      ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white opacity-70"
                                      : exam.status === "running"
                                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                                        : "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                  }`}
                                onClick={() => {
                                  if (exam.status === "upcoming") {
                                    handleStartExam(exam);
                                  } else if (exam.status === "running") {
                                    console.log("Joining running exam:", exam);
                                  }
                                }}
                              >
                                {activeTab === "completed"
                                  ? t("exams.main.examCard.completed")
                                  : activeTab === "missed"
                                    ? t("exams.main.missedTab") // في تبويب Missed يظهر "Missed" فقط
                                    : exam.status === "completed"
                                      ? `${t("exams.main.examCard.completed")} (${examResult?.percentage || exam.result?.percentage || 0}%) - ${t(`exams.main.examCard.${(examResult?.grade || exam.result?.grade)?.toLowerCase() || 'pass'}`)}`
                                      : exam.status === "missed"
                                        ? t("exams.main.missedTab")
                                        : exam.status === "running"
                                          ? t("exams.main.runningTab")
                                          : t("exams.main.upcomingTab")}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamsParent;