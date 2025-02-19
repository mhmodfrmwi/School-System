import React, { useEffect } from "react";
import ActivityToggle from "./SelectPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchContests, deleteContest, clearMessage } from "../TeacherRedux/ContestSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Contests = () => {
    const navigate = useNavigate();
    const { contests, message, loading } = useSelector((state) => state.contests);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContests());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                dispatch(clearMessage());
            }, 5000);
        }
    }, [message, dispatch]);

    if (loading) {
        return <div className="w-full h-full"></div>;
    }

    const handleAddActivity = () => {
        navigate("/teacher/contests/activity-form");
    };

    const handleEdit = (id) => {
        navigate(`/teacher/contests/edit-activity-form/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this contest?")) {
            dispatch(deleteContest(id)).then(() => {
                dispatch(fetchContests());
            });
        }
    };

    const handleEnterParticipants = (id) => {
        navigate(`/teacher/contests/participants/${id}`);
    };

    return (
        <>
            <ActivityToggle />
            <div className="col-span-2 flex flex-col justify-between ms-5 ">
                <div className="flex justify-between items-center ms-7 mt-5">
                    <div className="flex-1 text-lg sm:text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold">
                        Contests
                    </div>

                    <button className="bg-gradient-to-r from-[#105E6A] to-[#117C90] font-poppins rounded-2xl px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-white"
                        onClick={handleAddActivity}>
                        Add Contest
                    </button>
                </div>
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>
            </div>


            <div className="flex flex-col p-4">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                        <div className="mx-auto w-full max-w-7xl px-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg">
                                    <thead>
                                        <tr className="bg-[#105E6A] font-poppins text-white text-xs sm:text-sm md:text-base">
                                            <th className="border  border-[#117C90] px-2 sm:px-4 py-2 text-left">Title</th>
                                            <th className="border  border-[#117C90] px-2 sm:px-4 py-2 text-left">Teacher</th>
                                            <th className="border  border-[#117C90] px-2 sm:px-4 py-2 text-left">Subject</th>
                                            <th className="border  border-[#117C90] px-2 sm:px-4 py-2 text-left">Start Date</th>
                                            <th className="border  border-[#117C90] px-2 sm:px-4 py-2 text-left">End Date</th>
                                            <th className="border  border-[#117C90] px-2 sm:px-4 py-2 text-left">Num of team members</th>
                                            <th className="border  border-[#117C90] px-2 sm:px-4 py-2 text-left">Requirements</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Participants</th>
                                            <th className="border  border-[#117C90] px-2 sm:px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contests.length > 0 ? (
                                            contests.map((contest) => (
                                                <tr key={contest._id || uuidv4()} className="hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins">
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">{contest.title}</td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">
                                                        {contest.teacherId?.fullName || "N/A"}
                                                    </td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">
                                                        {contest.subjectId?.subjectName || "N/A"}
                                                    </td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2 whitespace-nowrap">
                                                        {contest.startDate ? new Date(contest.startDate).toISOString().split('T')[0] : "N/A"}
                                                    </td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2 whitespace-nowrap">
                                                        {contest.endDate ? new Date(contest.endDate).toISOString().split('T')[0] : "N/A"}
                                                    </td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">{contest.numberOfTeamMembers}</td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">{contest.requirements}</td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2 text-center">
                                                        <button
                                                            onClick={() => handleEnterParticipants(contest._id)}
                                                            className="rounded-md bg-[#117C90] px-4 py-2 text-white text-md transition hover:bg-[#0E6B7A]">
                                                            Enter
                                                        </button>
                                                    </td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2 space-x-2 text-center">
                                                        <button
                                                            aria-label="Edit contest"
                                                            onClick={() => handleEdit(contest._id)}
                                                            className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                                        >
                                                            <i className="far fa-edit text-lg" />
                                                        </button>
                                                        <button
                                                            aria-label="Delete contest"
                                                            onClick={() => handleDelete(contest._id)}
                                                            className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                                        >
                                                            <i className="far fa-trash-alt text-lg" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center py-4 font-poppins text-gray-500 font-semibold">
                                                    No contests available
                                                </td>
                                            </tr>
                                        )}
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