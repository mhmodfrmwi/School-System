import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVirtualRooms,
  fetchCompletedRooms,
  fetchMissedRooms,
  markRoomAsViewed,
  clearError,
} from "../../components/StudentRedux/virtualRoomsSlice";
import { fetchSubjects } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from 'react-i18next';
const VirtualRoomsSection = () => {
  const { t } = useTranslation();
  const role = sessionStorage.getItem("role");
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [currentPageMissed, setCurrentPageMissed] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);

  const itemsPerPage = 3;
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { virtualRooms, completedRooms, missedRooms, loading, error } = useSelector(
    (state) => state.StudentvirtualRooms
  );
  const { subjects } = useSelector((state) => state.allSubjectsStudent);

  const [activeTab, setActiveTab] = useState("all");
  const [subjectName, setSubjectName] = useState("");

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
    if (subjectId) {
      Promise.all([
        dispatch(fetchVirtualRooms(subjectId)),
        dispatch(fetchCompletedRooms(subjectId)),
        dispatch(fetchMissedRooms(subjectId)),
      ])
        .then(() => {
          setInitialLoading(false);
        })
        .catch(() => {
          setInitialLoading(false);
        });
    }
  }, [dispatch, subjectId]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: t('virtualRooms.errors.title'),
        text: error,
        icon: "error",
        confirmButtonText: t('virtualRooms.errors.confirmButton'),
      }).then(() => {
        dispatch(clearError());
      });
    }
  }, [error, dispatch]);

  const handleViewRoom = (roomId) => {
    dispatch(markRoomAsViewed(roomId));
  };

  const currentPage =
    activeTab === "completed"
      ? currentPageCompleted
      : activeTab === "missed"
      ? currentPageMissed
      : currentPageAll;

  const displayedRooms =
    activeTab === "completed"
      ? completedRooms
      : activeTab === "missed"
      ? missedRooms
      : virtualRooms;

  const totalPages = Math.ceil(displayedRooms.length / itemsPerPage);

  const paginatedRooms = displayedRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      if (activeTab === "all") setCurrentPageAll(currentPageAll + 1);
      if (activeTab === "completed") setCurrentPageCompleted(currentPageCompleted + 1);
      if (activeTab === "missed") setCurrentPageMissed(currentPageMissed + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      if (activeTab === "all") setCurrentPageAll(currentPageAll - 1);
      if (activeTab === "completed") setCurrentPageCompleted(currentPageCompleted - 1);
      if (activeTab === "missed") setCurrentPageMissed(currentPageMissed - 1);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#13082F] bg-white">
        <Loader role={role} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative"
      style={{
        backgroundImage: "var(--background-image)",
      }}
    >
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
                onClick={() => navigate(`/student/allcourses/videos/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">01</span>  {t('virtualRooms.sidebar.videoLectures')}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/materials/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">02</span>  {t('virtualRooms.sidebar.courseMaterial')}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-[#BFBFBF] dark:bg-[#C459D9] text-white font-medium py-4 rounded-lg"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">03</span> {t('virtualRooms.sidebar.virtualRooms')}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/assignments/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">04</span>{t('virtualRooms.sidebar.assignments')}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/exams/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">05</span>{t('virtualRooms.sidebar.exams')}
              </Button>
            </li>
            <li>
              <Button
                variant="solid"
                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg"
                onClick={() => navigate(`/student/allcourses/questionbank/${subjectId}`)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">06</span> {t('virtualRooms.sidebar.questionBank')}
              </Button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">{t('virtualRooms.main.title')}</h1>

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
                {t('virtualRooms.main.allTab')} ({virtualRooms.length})
            </Button>

            <Button
              variant={activeTab === "completed" ? "outline" : "solid"}
              className={`${
                activeTab === "completed"
                  ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                  : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
              } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => {
                setActiveTab("completed");
              }}
            >
              {t('virtualRooms.main.completedTab')}  ({completedRooms?.length || 0})
            </Button>

            <Button
              variant={activeTab === "missed" ? "outline" : "solid"}
              className={`${
                activeTab === "missed"
                  ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                  : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
              } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => {
                setActiveTab("missed");
              }}
            >
               {t('virtualRooms.main.missedTab')}  ({missedRooms?.length || 0})
            </Button>
          </div>

          {/* Secondary Loading State (for actions after initial load) */}
          {loading && !initialLoading && (
            <div className="flex items-center justify-center text-center text-gray-500 dark:text-gray-300 mt-10">
              <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-[#C459D9] mb-4 mr-5" />
              <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold"> {t('virtualRooms.main.loading')}</p>
            </div>
          )}

          {/* No Virtual Rooms Message */}
          {!initialLoading && !loading && (
            <>
              {activeTab === "all" && virtualRooms.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                  {t('virtualRooms.main.noRooms')}
                  </CardContent>
                </Card>
              )}
              {activeTab === "completed" && completedRooms.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                  {t('virtualRooms.main.noCompleted')}
                  </CardContent>
                </Card>
              )}
              {activeTab === "missed" && missedRooms.length === 0 && (
                <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                  <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                  {t('virtualRooms.main.noMissed')}
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Virtual Room Cards */}
          {!initialLoading && !loading && displayedRooms.length > 0 && (
            <div className="space-y-4">
              {paginatedRooms.map((room, index) => (
                <Card key={room._id} className="border border-gray-200 dark:border-none rounded-xl shadow-sm">
                  <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100 dark:bg-[#281459]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-pink-200 dark:bg-[#C459D9] rounded-full text-pink-600 dark:text-white font-bold">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </div>
                      <div>
                        <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-300">{room.title}</h2>
                        <p className="text-md text-gray-700 dark:text-gray-400">{t('virtualRooms.main.teacher')}: {room.teacherId.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('virtualRooms.main.duration')}: {room.duration}</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">{new Date(room.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-gray-500">
                      <Button
                        variant="solid"
                        className={`text-white px-3 py-2 rounded-lg ${
                          room.status === "completed" || room.studentAttendanceStatus === "attended" || room.studentAttendanceStatus === "missed"
                            ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] cursor-not-allowed"
                            : "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                        }`}
                        disabled={room.status === "completed" || room.studentAttendanceStatus === "attended" || room.studentAttendanceStatus === "missed"}
                        onClick={() => {
                          if (
                            room.status !== "completed" &&
                            room.studentAttendanceStatus !== "attended" &&
                            room.studentAttendanceStatus !== "missed"
                          ) {
                            window.open(room.link, "_blank");
                            handleViewRoom(room._id);
                          }
                        }}
                      >
                        {room.studentAttendanceStatus === "attended"
                          ? t('virtualRooms.roomStatus.attended')
                          : room.studentAttendanceStatus === "missed"
                          ? t('virtualRooms.roomStatus.missed')
                          : room.status === "completed"
                          ? t('virtualRooms.roomStatus.completed')
                          : t('virtualRooms.roomStatus.enter')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!initialLoading && !loading && displayedRooms.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-4 mb-4 mt-10">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2 bg-gray-200 dark:bg-[#312A5E] text-gray-700 dark:text-gray-300 rounded-full disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <span className="text-gray-800 dark:text-gray-300 font-medium">
              {t('virtualRooms.main.page')} {currentPage} {t('virtualRooms.main.of')} {totalPages}
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
        </div>
      </div>
    </div>
  );
};

export default VirtualRoomsSection;