import { useState } from "react";
import ScheduleToggle from "./SelectPage";

const ExamSchedule = () => {
    const [exams] = useState([
        { id: 1, day: "Monday", year: "First Year", subject: "Mathematics", date: "2023-10-01", time: "09:00", location: "Room 101" },
        { id: 2, day: "Tuesday", year: "Second Year", subject: "Physics", date: "2023-10-02", time: "11:00", location: "Room 102" },
        { id: 3, day: "Wednesday", year: "Third Year", subject: "Chemistry", date: "2023-10-03", time: "13:00", location: "Room 103" },
        { id: 4, day: "Thursday", year: "Fourth Year", subject: "Biology", date: "2023-10-04", time: "15:00", location: "Room 104" },
        { id: 5, day: "Friday", year: "Fifth Year", subject: "History", date: "2023-10-05", time: "17:00", location: "Room 105" }
    ]);

    return (
        <>
            <ScheduleToggle />
            <div className="flex flex-col p-4">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                        <div className="mx-auto w-full max-w-7xl px-4">
                            <div className="flex justify-between items-center my-2">
                                <div>
                                    <div className="text-lg sm:text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold dark:text-DarkManager">
                                        Exam Schedule
                                    </div>
                                    <p className="w-24 rounded-xl mb-4 border-t-4 border-[#117C90] dark:border-DarkManager"></p>
                                </div>

                                <button className="bg-gradient-to-r from-[#105E6A] to-[#117C90] dark:from-DarkManager dark:to-DarkManager  rounded-2xl px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-white">
                                    Export as PDF
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg dark:border-DarkManager">
                                    <thead>
                                        <tr className="bg-[#105E6A] text-white text-xs sm:text-sm md:text-base dark:bg-DarkManager">
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Day</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Year</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Subject</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Date</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Time</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exams.map((exam) => (
                                            <tr key={exam.id} className="hover:bg-gray-100 text-xs sm:text-sm md:text-base dark:text-DarkManager">
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{exam.day}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{exam.year}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{exam.subject}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{exam.date}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{exam.time}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{exam.location}</td>
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

export default ExamSchedule;