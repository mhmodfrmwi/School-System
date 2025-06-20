import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/schedule1.png";
import img2 from "../../../../assets/icon.png";
import img3 from "../../../../assets/StudentIcon/schedulei.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchGradeSemesterExams,
    setSelectedKid
} from "../ParentRedux/ExamScheduleSlice";
import { fetchParentSchedule } from "../ParentRedux/ScheduleSlice"; 
import Loader from "@/ui/Loader";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

function ParentExamSchedule() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const selectedKid = useSelector((state) => state.parentExamSchedule.selectedKid) ||
        JSON.parse(localStorage.getItem('selectedKid'));

    const {
        gradeSemesterExams,
        loading,
        error
    } = useSelector((state) => state.parentExamSchedule);

    const { schedule } = useSelector((state) => state.parentSchedule);

    const [examTable, setExamTable] = useState([]);
    const [semesterInfo, setSemesterInfo] = useState("");

    useEffect(() => {
        const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid'));
        if (kidFromStorage) {
            dispatch(setSelectedKid(kidFromStorage));

        
            dispatch(fetchParentSchedule(kidFromStorage._id));
        }
    }, [dispatch]);

    useEffect(() => {
        if (schedule.length > 0 && selectedKid) {
            const firstScheduleItem = schedule[0];
            const gradeId = firstScheduleItem?.grade_id?._id;
            const semesterId = firstScheduleItem?.semester_id?._id;

            if (gradeId && semesterId) {
                dispatch(fetchGradeSemesterExams({ gradeId, semesterId }));
            }
        }
    }, [schedule, selectedKid, dispatch]);

    useEffect(() => {
        if (gradeSemesterExams.length > 0) {
            const examsToDisplay = gradeSemesterExams;
            const semester = selectedKid?.semester_id?.semesterName || "";
            const academicYear = selectedKid?.academic_year_id
                ? `${selectedKid.academic_year_id.startYear}-${selectedKid.academic_year_id.endYear}`
                : "";

            const formattedExams = formatExams(examsToDisplay);
            setExamTable(formattedExams);
            setSemesterInfo(`${semester}, ${academicYear}`);
        } else {
            setExamTable([]);
            setSemesterInfo("");
        }
    }, [gradeSemesterExams, selectedKid, i18n.language]);

    function formatExams(examData) {
        const headers = [
            t("parent.examSchedule.headers.subject"),
            t("parent.examSchedule.headers.examDate"),
            t("parent.examSchedule.headers.startTime"),
            t("parent.examSchedule.headers.endTime"),

        ];

        const formatted = [headers];

        examData.forEach((exam) => {
            formatted.push([
                exam.subject || "--",
                exam.exam_date ? new Date(exam.exam_date).toLocaleDateString() : "--",
                exam.start_time || "--",
                exam.end_time || "--",

            ]);
        });

        return formatted;
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#13082F]">
                <Loader role="parent" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#13082F]">
                <div className="text-red-500 text-xl p-4 rounded-lg bg-red-100 dark:bg-red-900">
                    {error}
                </div>
            </div>
        );
    }

    const hasExams = examTable.length > 1;

    return (
        <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
            <div
                className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{ backgroundImage: `url(${backgroundStars})` }}
            ></div>
            <div
                className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{ backgroundImage: `url(${backgroundWaves})` }}
            ></div>

            <section className="mx-auto mt-10 min-h-screen w-[95%] font-poppins">
                <div className="relative z-10">
                    <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-3">
                        <div className="col-span-2 flex flex-col justify-between">
                            <div className="ml-4 ms-8 flex items-center py-4 md:ml-16 md:ms-14 lg:ms-20">
                                <button className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent md:text-2xl">
                                    {t("parent.examSchedule.title")} - {selectedKid?.fullName
                                        || ""}
                                    <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}></span>
                                </button>
                            </div>
                            <div className="mb-10 me-10 ms-8 mt-7 flex items-center gap-8 md:ms-14 lg:ms-20">
                                <button
                                    className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text px-5 py-2 font-poppins text-lg font-medium text-transparent"
                                    onClick={() => navigate("/parent/schedule")}
                                >
                                    {t("schedule.weeklySchedule")}
                                </button>
                                <button
                                    className="me-10 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-5 py-2 font-poppins text-lg font-medium text-white focus:outline-none"
                                    onClick={() => navigate("/parent/exam-schedule")}
                                >
                                    {t("examSchedule.examSchedule")}
                                </button>
                            </div>
                        </div>
                        <img
                            src={img1}
                            className="col-span-1 mx-auto mt-10 w-72"
                            alt="Schedule"
                        />
                    </div>
                    <div className="mx-auto mb-20 w-[88%] rounded-xl border border-gray-200 font-poppins shadow-md dark:border-[#E0AAEE]">
                        <div className="overflow-x-auto">
                            {!hasExams ? (
                                <div className="my-16 flex flex-col items-center justify-center text-center font-poppins">
                                    <div className="flex w-3/4 flex-col items-center rounded-xl bg-gray-100 dark:bg-[#281459] p-6 font-poppins shadow-lg md:w-1/2">
                                        <img src={img3} alt="No Exams" className="mb-4 w-1/4" />
                                        <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-800 dark:text-gray-300">
                                            {t("parent.examSchedule.noExams.title")}
                                        </h2>
                                        <p className="font-poppins text-gray-600 dark:text-gray-400">
                                            {t("parent.examSchedule.noExams.message")}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <table className="min-w-full table-auto bg-white p-6 shadow-md dark:bg-[#312A5E]">
                                    <thead>
                                        <tr>
                                            {examTable[0].map((header, index) => (
                                                <th
                                                    key={index}
                                                    className="border-b border-l border-gray-200 bg-[#D6A3E1] px-4 py-4 text-center text-gray-700 dark:border-[#E0AAEE] dark:bg-[#C459D9] dark:text-gray-300"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examTable.slice(1).map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className={`border-b border-gray-200 dark:border-[#E0AAEE] ${rowIndex % 2 === 0
                                                        ? "bg-white dark:bg-[#281459]"
                                                        : "bg-[#F9F9F9] dark:bg-[#281459]"
                                                    } transition duration-200 hover:bg-[#F3E5F5] dark:hover:bg-[#3A2A7A]`}
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="border-l border-gray-200 px-4 py-4 text-center font-poppins text-[#5e5b63] dark:border-[#E0AAEE] dark:text-gray-300"
                                                    >
                                                        {cell || "--"}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ParentExamSchedule;