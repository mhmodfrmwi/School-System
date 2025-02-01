import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ActivityToggle from "./SelectPage";

const Contests = () => {
    const navigate = useNavigate();
    const [score] = useState([
        { id: 1, title: "Contest 1", coach: "Coach A", startDate: "2025-02-01", endDate: "2025-02-05", seats: 20, fees: 100, requirements: "None" },
        { id: 2, title: "Contest 2", coach: "Coach B", startDate: "2025-03-01", endDate: "2025-03-05", seats: 25, fees: 120, requirements: "Basic skills" },
        { id: 3, title: "Contest 3", coach: "Coach C", startDate: "2025-04-01", endDate: "2025-04-05", seats: 30, fees: 150, requirements: "Intermediate skills" },
        { id: 4, title: "Contest 4", coach: "Coach D", startDate: "2025-05-01", endDate: "2025-05-05", seats: 35, fees: 200, requirements: "Advanced skills" },
        { id: 5, title: "Contest 5", coach: "Coach E", startDate: "2025-06-01", endDate: "2025-06-05", seats: 40, fees: 250, requirements: "Expert skills" },
        { id: 6, title: "Contest 6", coach: "Coach F", startDate: "2025-07-01", endDate: "2025-07-05", seats: 45, fees: 300, requirements: "Professional level" } ]);


    const handleEdit = (contestId) => {
        navigate(`/teacher/contests/edit-activity-form/${contestId}`);
    };


    const handleDelete = (contestId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contest?");
        if (confirmDelete) {
            console.log("Contest deleted:", contestId);

        }
    };

    const handleAddActivity = () => {
        navigate("/teacher/contests/activity-form");
    };


    return (
        <>
            <ActivityToggle />
            <div className="col-span-2 flex flex-col justify-between ms-5">
                {/* العنوان */}
                <div className="text-xl sm:text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold ms-7 mt-5">
                    Contests & Activities
                </div>
                {/* الخط */}
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>
            </div>

            <div className="flex flex-col p-4">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                        {/* Table */}
                        <div className="mx-auto w-full max-w-7xl px-4">
                            {/* زر Add Activity */}
                            <div className="flex justify-end items-center my-6">
                                <button onClick={handleAddActivity} className="bg-gradient-to-r from-[#105E6A] to-[#117C90] rounded-2xl px-3 sm:px-4 py-1 sm:py-2 text-xs text-white sm:text-sm md:text-base">
                                    Add Activity
                                </button>
                            </div>

                            {/* الجدول مع شريط التمرير الأفقي */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg">
                                    <thead>
                                        <tr className="bg-[#105E6A] text-white text-xs sm:text-sm md:text-base">
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Title</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Coach</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Start Date</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">End Date</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Seats</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Fees</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Requirements</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {score.map(( index) => (
                                            <tr key={index} className="hover:bg-gray-100 text-xs sm:text-sm md:text-base">
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{index.title}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{index.coach}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{index.startDate}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{index.endDate}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{index.seats}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{index.fees}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2">{index.requirements}</td>
                                                <td className="border border-[#117C90] px-2 sm:px-4 py-2 flex justify-center space-x-2">
                                                    {/* أيقونة التعديل */}
                                                    <button
                                                        aria-label="Edit contest"
                                                        onClick={() => handleEdit(index.id)} // هنا يمكنك تمرير الـ ID الفعلي
                                                        className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                                    >
                                                        <i className="far fa-edit text-lg" />
                                                    </button>
                                                    {/* أيقونة الحذف */}
                                                    <button
                                                        aria-label="Delete contest"
                                                        onClick={() => handleDelete(index.id)} // هنا يمكنك تمرير الـ ID الفعلي
                                                        className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                                    >
                                                        <i className="far fa-trash-alt text-lg" />
                                                    </button>
                                                </td>
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

export default Contests;