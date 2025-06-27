import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAssignments,
    fetchCompletedAssignments,
    fetchMissedAssignments,
    fetchPendingAssignments,
    clearError,
} from "../../components/ParentRedux/AssignmentSlice";
import { fetchSubjects } from "../../components/ParentRedux/CoursesSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../ui/Loader";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";
import { useTranslation } from 'react-i18next';

const AssignmentsParent = () => {
    const { t, i18n } = useTranslation();
    const role = sessionStorage.getItem("role");
    const dispatch = useDispatch();
    const { subjectId } = useParams();
    const navigate = useNavigate();

    const {
        allAssignments = [],
        completedAssignments = [],
        missedAssignments = [],
        pendingAssignments = [],
        loadingAll,
        loadingCompleted,
        loadingMissed,
        loadingPending,
        error,
    } = useSelector((state) => state.assignmentsParent);

    const { subjects } = useSelector((state) => state.allSubjectsStudent);
    const [activeTab, setActiveTab] = useState("all");
    const [subjectName, setSubjectName] = useState("");
    const [currentPageAll, setCurrentPageAll] = useState(1);
    const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
    const [currentPageMissed, setCurrentPageMissed] = useState(1);
    const [currentPagePending, setCurrentPagePending] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setInitialLoading(true);
                const studentId = localStorage.getItem('selectedStudentId');
                if (!studentId) throw new Error("Student ID is required");
                if (!subjectId) throw new Error("Subject ID is required");

                await dispatch(fetchSubjects());

                const results = await Promise.allSettled([
                    dispatch(fetchAssignments(subjectId)),
                    dispatch(fetchCompletedAssignments()),
                    dispatch(fetchMissedAssignments(subjectId)),
                    dispatch(fetchPendingAssignments(subjectId))
                ]);

                results.forEach(result => {
                    if (result.status === 'rejected') {
                        console.error('Fetch error:', result.reason);
                    }
                });

                const currentSubject = subjects.find(subj => subj._id === subjectId);
                if (currentSubject) setSubjectName(currentSubject.name);
            } catch (error) {
                console.error("Data loading error:", error);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error'
                });
            } finally {
                setInitialLoading(false);
            }
        };

        fetchAllData();
    }, [dispatch, subjectId]);


    // useEffect(() => {
    //     console.log('All assignments:', allAssignments);
    //     console.log('Completed assignments:', completedAssignments);
    //     console.log('Missed assignments:', missedAssignments);
    //     console.log('Pending assignments:', pendingAssignments);
    // }, [allAssignments, completedAssignments, missedAssignments, pendingAssignments]);

    // Error handling
    useEffect(() => {
        if (error) {
            Swal.fire({
                title: t('assignments.alerts.error.title'),
                text: error,
                icon: "error",
                confirmButtonText: t('assignments.alerts.error.confirmButton'),
            }).then(() => {
                dispatch(clearError());
            });
        }
    }, [error, dispatch, t]);

    // Get current assignments based on active tab
    const getCurrentAssignments = () => {
        switch (activeTab) {
            case "all":
                return allAssignments;
            case "completed":
                return completedAssignments.map(submission => {
                    const { created_by, ...assignmentData } = submission.assignment_id;
                    return {
                        ...assignmentData,
                        submission_text: submission.submission_text,
                        submitted_at: submission.submitted_at,
                        grade: submission.grade,
                        _id: submission._id
                    };
                });
            case "missed":
                return missedAssignments;
            case "pending":
                return pendingAssignments;
            default:
                return [];
        }
    };

    // Get current page based on active tab
    const getCurrentPage = () => {
        switch (activeTab) {
            case "all":
                return currentPageAll;
            case "completed":
                return currentPageCompleted;
            case "missed":
                return currentPageMissed;
            case "pending":
                return currentPagePending;
            default:
                return 1;
        }
    };

    // Get loading state based on active tab
    const getLoadingState = () => {
        switch (activeTab) {
            case "all":
                return loadingAll;
            case "completed":
                return loadingCompleted;
            case "missed":
                return loadingMissed;
            case "pending":
                return loadingPending;
            default:
                return false;
        }
    };


    const handleTabChange = (tab) => {
        setActiveTab(tab);
        switch (tab) {
            case "all":
                setCurrentPageAll(1);
                break;
            case "completed":
                setCurrentPageCompleted(1);
                break;
            case "missed":
                setCurrentPageMissed(1);
                break;
            case "pending":
                setCurrentPagePending(1);
                break;
        }
    };



    // Pagination logic
    const currentAssignments = getCurrentAssignments();
    const currentPage = getCurrentPage();
    const loading = getLoadingState();

    const totalPages = Math.ceil(currentAssignments.length / itemsPerPage);
    const paginatedAssignments = currentAssignments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const nextPage = () => {
        if (currentPage < totalPages) {
            if (activeTab === "all") {
                setCurrentPageAll(prev => prev + 1);
            } else if (activeTab === "completed") {
                setCurrentPageCompleted(prev => prev + 1);
            } else if (activeTab === "missed") {
                setCurrentPageMissed(prev => prev + 1);
            } else if (activeTab === "pending") {
                setCurrentPagePending(prev => prev + 1);
            }
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            if (activeTab === "all") {
                setCurrentPageAll(prev => prev - 1);
            } else if (activeTab === "completed") {
                setCurrentPageCompleted(prev => prev - 1);
            } else if (activeTab === "missed") {
                setCurrentPageMissed(prev => prev - 1);
            } else if (activeTab === "pending") {
                setCurrentPagePending(prev => prev - 1);
            }
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
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
            {/* Background elements */}
            <div
                className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{ backgroundImage: `url(${backgroundStars})` }}
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
                                className="md:w-11/12 bg-[#BFBFBF] dark:bg-[#C459D9] text-white font-medium py-4 rounded-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                            >
                                <span className="text-white mr-2">02</span>
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
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
                        {t("parent.assignments.main.title")}
                    </h1>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <Button
                            variant={activeTab === "all" ? "outline" : "solid"}
                            className={`${activeTab === "all"
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                                } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => handleTabChange("all")}
                        >
                            {t("parent.assignments.main.allTab")} ({allAssignments.length})
                        </Button>
                        <Button
                            variant={activeTab === "completed" ? "outline" : "solid"}
                            className={`${activeTab === "completed"
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                                } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => handleTabChange("completed")}
                        >
                            {t("parent.assignments.main.completedTab")} ({completedAssignments.length})
                        </Button>
                        <Button
                            variant={activeTab === "pending" ? "outline" : "solid"}
                            className={`${activeTab === "pending"
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                                } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => handleTabChange("pending")}
                        >
                            {t("parent.assignments.main.pendingTab")} ({pendingAssignments.length})
                        </Button>
                        <Button
                            variant={activeTab === "missed" ? "outline" : "solid"}
                            className={`${activeTab === "missed"
                                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                                : "border border-gray-500 dark:border-[#E0AAEE] text-gray-800 dark:text-gray-300"
                                } px-4 md:px-6 py-2 rounded-full`}
                            onClick={() => handleTabChange("missed")}
                        >
                            {t("parent.assignments.main.missedTab")} ({missedAssignments.length})
                        </Button>
                    </div>

                    {loading && (
                        <div className="flex flex-col items-center justify-center mt-10">
                            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
                            <p className="text-gray-700 dark:text-gray-300">
                                {t("parent.assignments.main.loading")}
                            </p>
                        </div>
                    )}

                    {/* No Assignments Message */}
                    {!initialLoading && currentAssignments.length === 0 && !loading && !error && (
                        <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center dark:bg-[#281459]">
                            <CardContent className="text-center p-4 text-gray-600 dark:text-gray-300">
                                {activeTab === "all" && t("parent.assignments.main.noAssignments.all")}
                                {activeTab === "completed" && t("parent.assignments.main.noAssignments.completed")}
                                {activeTab === "pending" && t("parent.assignments.main.noAssignments.pending")}
                                {activeTab === "missed" && t("parent.assignments.main.noAssignments.missed")}
                            </CardContent>
                        </Card>
                    )}

                    {/* Assignment Cards */}

                    <div className="space-y-4">
                        {paginatedAssignments.map((assignment, index) => (
                            <Card key={assignment._id} className="border border-gray-200 dark:border-none rounded-xl shadow-sm">
                                <CardContent className="flex items-center justify-center p-4 bg-gray-100 dark:bg-[#281459]">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 flex items-center justify-center bg-pink-200 dark:bg-[#C459D9] rounded-full text-pink-600 dark:text-white font-bold">
                                            {index + 1 + (currentPage - 1) * itemsPerPage}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-300">
                                                {assignment.title}
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                                                <div>
                                                    <p className="text-gray-700 dark:text-gray-400">
                                                        <span className="font-medium text-gray-900 dark:text-gray-200">
                                                            {t("parent.assignments.main.assignmentCard.description")}:
                                                        </span> {assignment.description || t("parent.assignments.main.assignmentCard.notSpecified")}
                                                    </p>
                                                    {(activeTab === "all" || activeTab === "missed") && (
                                                        <p className="text-gray-700 dark:text-gray-400">
                                                            <span className="font-medium text-gray-900 dark:text-gray-200">
                                                                {t("parent.assignments.main.assignmentCard.createdBy")}:
                                                            </span> {assignment.created_by?.fullName || t("parent.assignments.main.assignmentCard.notSpecified")}
                                                        </p>
                                                    )}
                                                    {activeTab === "completed" && assignment.submission_text && (
                                                        <p className="text-gray-700 dark:text-gray-400">
                                                            <span className="font-medium text-gray-900 dark:text-gray-200">
                                                                {t("parent.assignments.main.assignmentCard.submission")}:
                                                            </span> {assignment.submission_text}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-gray-700 dark:text-gray-400">
                                                        <span className="font-medium text-gray-900 dark:text-gray-200">
                                                            {t("parent.assignments.main.assignmentCard.dueDate")}:
                                                        </span> {new Date(assignment.due_date).toLocaleString(i18n.language)}
                                                    </p>
                                                    {activeTab === "completed" && assignment.grade && (
                                                        <p className="text-gray-700 dark:text-gray-400">
                                                            <span className="font-medium text-gray-900 dark:text-gray-200">
                                                                {t("parent.assignments.main.assignmentCard.grade")}:
                                                            </span> {assignment.grade} / {assignment.total_marks}
                                                        </p>
                                                    )}
                                                    {activeTab === "completed" && assignment.submitted_at && (
                                                        <p className="text-gray-700 dark:text-gray-400">
                                                            <span className="font-medium text-gray-900 dark:text-gray-200">
                                                                {t("parent.assignments.main.assignmentCard.submittedAt")}:
                                                            </span> {new Date(assignment.submitted_at).toLocaleString(i18n.language)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>



                    {/* Pagination Controls */}
                    {currentAssignments.length > itemsPerPage && (
                        <div className="flex justify-center items-center gap-4 mb-4 mt-10">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="p-2 bg-gray-200 dark:bg-[#312A5E] text-gray-700 dark:text-gray-300 rounded-full disabled:opacity-50"
                            >
                                <FaChevronLeft />
                            </button>
                            <span className="text-gray-800 dark:text-gray-300 font-medium">
                                {t("parent.assignments.main.page")} {currentPage} {t("parent.assignments.main.of")} {totalPages}
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

export default AssignmentsParent;