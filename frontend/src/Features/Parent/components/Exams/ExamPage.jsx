import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

const ExamsParent = () => {
  const { t, i18n } = useTranslation();
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();
  const { gradeSubjectSemesterId } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [currentPageMissed, setCurrentPageMissed] = useState(1);
  const itemsPerPage = 3;

  // Mock data for UI rendering
  const subjectName = "Subject Name";
  const exams = [];
  const upcomingExams = [];
  const completedExams = [];
  const missedExams = [];
  const sessions = [];
  const filteredExams = [];
  const paginatedExams = [];
  const loading = false;
  const totalPages = 1;
  const currentPage = 1;

  const handleStartExam = (exam) => {
    console.log("Start exam:", exam);
  };

  const nextPage = () => {
    if (activeTab === "all") setCurrentPageAll(prev => Math.min(prev + 1, totalPages));
    else if (activeTab === "upcoming") setCurrentPageUpcoming(prev => Math.min(prev + 1, totalPages));
    else if (activeTab === "completed") setCurrentPageCompleted(prev => Math.min(prev + 1, totalPages));
    else if (activeTab === "missed") setCurrentPageMissed(prev => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    if (activeTab === "all") setCurrentPageAll(prev => Math.max(prev - 1, 1));
    else if (activeTab === "upcoming") setCurrentPageUpcoming(prev => Math.max(prev - 1, 1));
    else if (activeTab === "completed") setCurrentPageCompleted(prev => Math.max(prev - 1, 1));
    else if (activeTab === "missed") setCurrentPageMissed(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
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

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center text-center text-gray-500 dark:text-gray-300 mt-10">
              <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-[#C459D9] mb-4 mr-5" />
              <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                {t("exams.main.loading")}
              </p>
            </div>
          )}

          {/* Content Area */}
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
                    <Card key={index} className="border border-gray-200 dark:border-none rounded-xl shadow-sm">
                      <CardContent className="flex items-center justify-center p-4 bg-gray-100 dark:bg-[#281459]">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 flex items-center justify-center bg-pink-200 dark:bg-[#C459D9] rounded-full text-pink-600 dark:text-white font-bold">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </div>
                          <div>
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-300">
                              Exam Title
                            </h2>
                            <p className="text-md text-gray-700 dark:text-gray-400">
                              {t("exams.main.examCard.description")}: Exam description
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                              {t("exams.main.examCard.createdBy")}: Instructor Name
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                              {t("exams.main.examCard.duration")}: 60 {t("exams.main.examCard.minutes")}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                              {t("exams.main.examCard.startTime")}: {new Date().toLocaleString()}
                              <span className="text-pink-600 dark:text-[#C459D9]"> | </span>
                              {t("exams.main.examCard.endTime")}: {new Date().toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="ml-4">
                          <Button
                            variant="solid"
                            className="text-white bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-3 py-2 rounded-lg"
                            onClick={() => handleStartExam({})}
                          >
                            {t("exams.main.examCard.start")}
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

export default ExamsParent;