import ScheduleToggle from "./SelectPage";

const WeeklySchedule = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    const timeslots = [
        "08:00 - 08:45",
        "09:00 - 09:45",
        "10:00 - 10:45",
        "11:00 - 11:45",
        "12:00 - 12:45",
    ];
    const schedule = timeslots.map(time => (
        days.map(day => ({
            day,
            time,
            subject: "English language",
            grade: "Gr 1",
            section: "1A",
            stage: "Primary stage",
            teacher: "Ziyad Saed"
        }))
    )).flat();

    return (
        <>
            <ScheduleToggle />
            <div className="col-span-2 flex flex-col justify-between ms-5">
                <div className="flex justify-between items-center ms-7 mt-5">
                    <div className="text-lg sm:text-xl font-poppins cursor-text text-[#105E6A] py-1 font-bold">
                        Weekly Schedule  2024-10-20 to 2024-10-26
                    </div>
                    <button className="bg-gradient-to-r from-[#105E6A] to-[#117C90] rounded-2xl px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-white">
                        Export as PDF
                    </button>
                </div>
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>
            </div>

            <div className="flex flex-col p-4">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">

                        <div className="overflow-x-auto p-4">
                            <table className="min-w-[800px] w-full border-collapse border border-gray-300 text-sm sm:text-base">
                                <thead>
                                    <tr className="bg-[#105E6A] text-white">
                                        <th className="border border-gray-300 p-2">Time</th>
                                        {days.map(day => (
                                            <th key={day} className="border border-gray-300 p-2">{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeslots.map(time => (
                                        <tr key={time} className="bg-gray-100 even:bg-white">
                                            <td className="border border-gray-300 p-2 text-center font-bold">{time}</td>
                                            {days.map(day => (
                                                <td key={`${day}-${time}`} className="border border-gray-300 p-2 text-center">
                                                    <div className="p-2 bg-white shadow-md rounded-lg">
                                                        <p className="font-semibold">English language</p>
                                                        <p className="text-xs">Gr 1 | 1A | Primary stage</p>
                                                        <p className="text-xs font-bold">Ziyad Saed</p>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeeklySchedule;