import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/schedule1.png";
import img2 from "../../../../assets/icon.png";
import img3 from "../../../../assets/StudentIcon/schedulei.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentSchedule, setSelectedKid } from "../ParentRedux/ScheduleSlice";
import Loader from "@/ui/Loader";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";
import { useTranslation } from "react-i18next";

function Schedule() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedKid = useSelector((state) => state.parentSchedule.selectedKid) ||
        JSON.parse(localStorage.getItem('selectedKid'));
    const { schedule, loading } = useSelector(
        (state) => state.parentSchedule
    );


    const [timetable, setTimetable] = useState([]);
    const [semesterInfo, setSemesterInfo] = useState("");

    useEffect(() => {
        const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid'));
        if (kidFromStorage) {
            dispatch(setSelectedKid(kidFromStorage));
        }
    }, [dispatch]);


    useEffect(() => {
        if (selectedKid) {
            dispatch(fetchParentSchedule(selectedKid._id));

        }
    }, [dispatch, selectedKid]);

    const role = sessionStorage.getItem("role");

    useEffect(() => {
        if (schedule?.length > 0) {
            const formattedSchedule = formatSchedule(schedule);
            setTimetable(formattedSchedule);

            const { semester_id, academic_year_id } = schedule[0];
            setSemesterInfo(
                `${semester_id.semesterName}, ${academic_year_id.startYear}-${academic_year_id.endYear}`
            );
        }
    }, [schedule, i18n.language]);

    const translateDay = (englishDay) => {
        const daysMap = {
            Sunday: t("schedule.days.sunday"),
            Monday: t("schedule.days.monday"),
            Tuesday: t("schedule.days.tuesday"),
            Wednesday: t("schedule.days.wednesday"),
            Thursday: t("schedule.days.thursday"),
            Friday: t("schedule.days.friday"),
            Saturday: t("schedule.days.saturday"),
        };
        return daysMap[englishDay] || englishDay;
    };

    function formatSchedule(scheduleData) {
        const englishDays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const translatedDays = englishDays.map((day) => translateDay(day));
        let formatted = [[...translatedDays]];

        const timeSlots = [
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
        ];

        timeSlots.forEach((time) => {
            let row = [time];
            englishDays.forEach((englishDay) => {
                const session = scheduleData.find(
                    (s) => s.day_of_week === englishDay && s.start_time === time
                );
                if (session) {
                    const startTime = new Date(`1970-01-01T${session.start_time}:00Z`);
                    const endTime = new Date(`1970-01-01T${session.end_time}:00Z`);
                    const durationInMinutes = (endTime - startTime) / 60000;

                    const hours = Math.floor(durationInMinutes / 60);
                    const minutes = durationInMinutes % 60;

                    let durationText = "";
                    if (hours > 0 && minutes > 0) {
                        durationText = `${hours} ${hours > 1 ? t("schedule.duration.hours") : t("schedule.duration.hour")
                            } ${t("schedule.duration.and")} ${minutes} ${minutes > 1
                                ? t("schedule.duration.minutes")
                                : t("schedule.duration.minute")
                            }`;
                    } else if (hours > 0) {
                        durationText = `${hours} ${hours > 1 ? t("schedule.duration.hours") : t("schedule.duration.hour")
                            }`;
                    } else {
                        durationText = `${minutes} ${minutes > 1
                            ? t("schedule.duration.minutes")
                            : t("schedule.duration.minute")
                            }`;
                    }

                    row.push(
                        `${session.subject_id.subjectName} - ${session.teacher_id.fullName} (${durationText})`
                    );
                } else {
                    row.push("");
                }
            });
            formatted.push(row);
        });

        return formatted;
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#13082F]">
                <Loader role={role} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
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
            <section className="mx-auto mt-10 min-h-screen w-[95%] font-poppins ">

                <div className="relative z-10">
                    <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-3">
                        <div className="col-span-2 flex flex-col justify-between">
                            <div className="ml-4 ms-8 flex items-center py-4 md:ml-16 md:ms-14 lg:ms-20">
                                <button className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent md:text-2xl">
                                    {t("schedule.title")}
                                    <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
                                        }`}></span>
                                </button>
                            </div>
                            <div className="mb-10 me-10 ms-8 mt-7 flex items-center gap-8 md:ms-14 lg:ms-20">
                                <button
                                    className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] px-5 py-2 font-poppins text-lg font-medium text-white focus:outline-none"
                                    onClick={() => navigate("/parent/schedule")}
                                >
                                    {t("schedule.weeklySchedule")}
                                </button>
                                <button
                                    className="me-10 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text px-5 py-2 font-poppins text-lg font-medium text-transparent"
                                    onClick={() => navigate("/parent/exam-schedule")}
                                >
                                    {t("schedule.examSchedule")}
                                </button>
                            </div>
                        </div>
                        <img
                            src={img1}
                            className="col-span-1 mx-auto mt-10 w-72"
                            alt="Schedule"
                        />
                    </div>
                    <div className="mx-auto mb-20 w-[88%] rounded-xl border border-gray-200 dark:border-[#E0AAEE] font-poppins shadow-md">
                        <div className="overflow-x-auto">
                            {schedule.length === 0 ? (
                                <div className="my-16 flex flex-col items-center justify-center text-center font-poppins">
                                    <div className="flex w-3/4 flex-col items-center rounded-xl bg-gray-100 dark:bg-[#281459] p-6 font-poppins shadow-lg md:w-1/2">
                                        <img src={img3} alt="No Schedule" className="mb-4 w-1/4" />
                                        <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-800 dark:text-gray-300">
                                            {t("schedule.noSchedule.title")}
                                        </h2>
                                        <p className="font-poppins text-gray-600 dark:text-gray-400">
                                            {t("schedule.noSchedule.message")}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <table className="min-w-full table-auto bg-white dark:bg-[#312A5E] p-6 shadow-md">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-[#E0AAEE]">
                                            <th colSpan="8" className="px-2 py-3 text-right">
                                                <div className="ml-auto w-60 rounded-md bg-[#FFA4A4] dark:bg-[#C459D9] px-4 py-3 text-center font-poppins text-white">
                                                    {semesterInfo}
                                                </div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className="border-b border-gray-200 dark:border-[#E0AAEE] px-2 py-4 text-center text-gray-700 dark:text-gray-300">
                                                <img src={img2} className="mx-auto" alt="icon" />
                                            </th>
                                            {timetable.length > 0 &&
                                                timetable[0].map((day, index) => (
                                                    <th
                                                        key={index}
                                                        className="border-b border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-2 text-center text-gray-700 dark:text-gray-300"
                                                    >
                                                        {day}
                                                    </th>
                                                ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-[#F9F9F9] dark:bg-[#281459]">
                                        {timetable.slice(1).map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className="border-b border-gray-200 dark:border-[#E0AAEE]"
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className={`border-l border-gray-200 dark:border-[#E0AAEE] px-4 py-4 text-center font-poppins ${cellIndex === 0
                                                            ? "text-gray-800 dark:text-gray-300"
                                                            : "text-[#E47986] dark:text-[#C459D9]"
                                                            }`}
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

export default Schedule;