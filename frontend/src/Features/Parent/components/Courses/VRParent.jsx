import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    fetchVirtualRooms,
    fetchCompletedRooms,
    fetchMissedRooms,
    fetchCompletedNotMissedRooms,
    clearError
} from "../../components/ParentRedux/VRSlice";
import { setSelectedKid } from "../../components/ParentRedux/MotivationSlice";
import { fetchSubjects, } from "../../components/ParentRedux/CoursesSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from 'react-i18next';

const VirtualRoomsParent = () => {
    const { t, i18n } = useTranslation();
    const role = sessionStorage.getItem("role");
    const [currentPageAll, setCurrentPageAll] = useState(1);
    const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
    const [currentPageMissed, setCurrentPageMissed] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const { subjects } = useSelector((state) => state.allSubjectsParent);
    const [activeTab, setActiveTab] = useState("all");
    const [subjectName, setSubjectName] = useState("");
    const itemsPerPage = 3;
    const dispatch = useDispatch();
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const selectedKid = useSelector((state) => state.motivationparent.selectedKid);
    const {
        virtualRooms,
        completedRooms,
        completedNotMissedRooms,
        missedRooms,
        loading,
        error
    } = useSelector((state) => state.virtualRoomsParent);
    useEffect(() => {
        const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid'));
        if (kidFromStorage) {
            dispatch(setSelectedKid(kidFromStorage));
        }
    }, [dispatch]);
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
        if (selectedKid?._id && subjectId) {
            setInitialLoading(true);
            Promise.all([
                dispatch(fetchVirtualRooms(subjectId)),
                dispatch(fetchCompletedRooms(subjectId)),
                dispatch(fetchMissedRooms(subjectId)),
                dispatch(fetchCompletedNotMissedRooms({subjectId, studentId: selectedKid._id})), 
            ])
                .then(() => setInitialLoading(false))
                .catch(() => setInitialLoading(false));
        }
    }, [dispatch, subjectId, selectedKid]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: t('virtualRooms.errors.title'),
                text: error,
                icon: "error",
                confirmButtonText: t('virtualRooms.errors.confirmButton'),
            }).then(() => dispatch(clearError()));
        }
    }, [error, dispatch, t]);

    const currentPage =
        activeTab === "completed"
            ? currentPageCompleted
            : activeTab === "missed"
                ? currentPageMissed
                : currentPageAll;

    const displayedRooms =
        activeTab === "completed"
            ? completedNotMissedRooms
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
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
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
                        {subjectName || t("exams.main.Subjects")}
                        <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}></span>
                    </h2>
                    <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
                        <li>
                            <Button
                                variant="solid"
                                className="md:w-11/12 bg-[#BFBFBF] dark:bg-[#C459D9] text-white font-medium py-4 rounded-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                            >
                                <span className="text-white mr-2">01</span>
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
                                className="md:w-11/12 bg-gray-100 dark:bg-[#281459] text-gray-700 dark:text-gray-300 font-medium py-4 rounded-lg hover:bg-gradient-to-r hover:from-[#FD813D20] hover:via-[#CF72C020] hover:to-[#BC6FFB20] dark:hover:from-[#CE4EA020] dark:hover:via-[#BF4ACB20] dark:hover:to-[#AE45FB20]"
                              onClick={() => navigate(`/parent/all-subjects/exams/${subjectId}`)}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] mr-2">03</span>
                                {t("exams.sidebar.exams")}
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
                    className={`${activeTab === "all"
                        ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                        : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                        } px-4 md:px-6 py-2 rounded-full`}
                    onClick={() => setActiveTab("all")}
                >
                    {t('virtualRooms.main.allTab')} ({virtualRooms.length})
                </Button>

                <Button
                    variant={activeTab === "completed" ? "outline" : "solid"}
                    className={`${activeTab === "completed"
                        ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                        : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                        } px-4 md:px-6 py-2 rounded-full`}
                    onClick={() => setActiveTab("completed")}
                >
                    {t('virtualRooms.main.completedTab')} ({completedNotMissedRooms?.length || 0}) {/* تم التعديل هنا */}
                </Button>

                <Button
                    variant={activeTab === "missed" ? "outline" : "solid"}
                    className={`${activeTab === "missed"
                        ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                        : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                        } px-4 md:px-6 py-2 rounded-full`}
                    onClick={() => setActiveTab("missed")}
                >
                    {t('virtualRooms.main.missedTab')} ({missedRooms?.length || 0})
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
                                                className={`text-white px-3 py-2 rounded-lg ${room.status === "completed" || room.studentAttendanceStatus === "attended" || room.studentAttendanceStatus === "missed"
                                                    ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] cursor-not-allowed"
                                                    : "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                                                    }`}
                                                disabled={room.status === "completed" || room.studentAttendanceStatus === "attended" || room.studentAttendanceStatus === "missed"}

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

export default VirtualRoomsParent;