import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherSchedule } from "../TeacherRedux/teacherScheduleSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import ScheduleToggle from "./SelectPage";

const WeeklySchedule = () => {
    const dispatch = useDispatch();
    const teacherSchedule = useSelector(state => state.teacherSchedule.teacherSchedule);
    const loading = useSelector(state => state.teacherSchedule.loading);
    const error = useSelector(state => state.teacherSchedule.error);

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const timeslots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"
    ];

    const semesterName = teacherSchedule?.[0]?.semester_id?.semesterName;
    const startYear = teacherSchedule?.[0]?.academic_year_id?.startYear;
    const endYear = teacherSchedule?.[0]?.academic_year_id?.endYear;

    useEffect(() => {
        dispatch(fetchTeacherSchedule());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (teacherSchedule.length === 0) {
        return (
            <>
                <ScheduleToggle />
                <div className="flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg mt-10">
                    <FontAwesomeIcon icon={faCalendar} className="text-6xl text-gray-400 mb-4" />
                    <p className="text-xl font-semibold text-gray-600 mb-2">No schedules Found</p>
                    <p className="text-gray-500 mb-4 text-center max-w-xl">
                        It seems like there are no schedules available at the moment. Please check back later .
                    </p>
                </div>
            </>
        );
    }
    if (error) return <p>{error}</p>;



    const calculateDuration = (start_time, end_time) => {
        const startTime = new Date(`1970-01-01T${start_time}:00Z`);
        const endTime = new Date(`1970-01-01T${end_time}:00Z`);
        const durationInMinutes = (endTime - startTime) / 60000;

        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;

        if (hours > 0 && minutes > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
    };



    return (
        <>
            <ScheduleToggle />

            <div className="flex flex-col p-4">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                        <div className="mx-auto w-full max-w-7xl px-4">
                            <div className="flex justify-between items-center my-2">
                                <div>
                                    <div className="text-lg sm:text-2xl font-poppins cursor-text text-[#105E6A] ms-4 py-1 font-bold">
                                        Weekly Schedule - {semesterName} ({startYear}-{endYear})
                                    </div>
                                    <p className="w-24 rounded-xl mb-4 border-t-4 border-[#117C90] ms-4"></p>
                                </div>
                                <button className="bg-gradient-to-r from-[#105E6A] to-[#117C90] font-poppins rounded-2xl px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-white">
                                    Export as PDF
                                </button>
                            </div>
                            <div className="overflow-x-auto p-4">
                                <table className="min-w-[800px] w-full border-collapse border border-gray-300 text-sm sm:text-base">
                                    <thead>
                                        <tr className="bg-[#105E6A] text-white">
                                            <th className="border border-gray-300 p-2 font-poppins">Time</th>
                                            {days.map(day => (
                                                <th key={day} className="border border-gray-300 p-2 font-poppins">{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeslots.map(time => (
                                            <tr key={time} className="bg-gray-100 even:bg-white">
                                                <td className="border border-gray-300 p-2 text-center font-poppins font-bold">{time}</td>
                                                {days.map(day => {
                                                    const scheduleItem = teacherSchedule.find(item =>
                                                        item.day_of_week === day &&
                                                        item.start_time === time
                                                    );

                                                    return (
                                                        <td key={`${day}-${time}`} className="border border-gray-300 p-2 text-center">
                                                            <div className="p-2 bg-white shadow-md rounded-lg font-poppins">
                                                                {scheduleItem ? (
                                                                    <>
                                                                        <p className="font-semibold">{scheduleItem.subject_id.subjectName}</p>
                                                                        <p className="text-xs">{scheduleItem.grade_id.gradeName} | {scheduleItem.class_id.className}</p>
                                                                        <p className="text-xs">{calculateDuration(scheduleItem.start_time, scheduleItem.end_time)}</p>
                                                                    </>
                                                                ) : (
                                                                    <p className="text-xs text-gray-500 font-poppins">No class</p>
                                                                )}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeeklySchedule;
