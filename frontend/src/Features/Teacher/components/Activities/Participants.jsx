import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../TeacherRedux/participantsSlice";
import { useTranslation } from 'react-i18next';

const Participants = () => {
    const { contestId } = useParams();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { teams, loading, error } = useSelector((state) => state.participants);

    useEffect(() => {
        if (!contestId) {
            console.error("Contest ID is undefined");
            return;
        }
        dispatch(fetchTeams(contestId));
    }, [dispatch, contestId]);

    if (loading) {
        return <div className="w-full h-full"></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center font-poppins">{error}</div>;
    }

    return (
        <>
            <div className="col-span-2 flex flex-col justify-between ms-5 ">
                <div className="flex justify-between items-center ms-7 mt-5">
                    <div className="flex-1 text-lg sm:text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold">
                        {t('activitiest.Participants')}
                    </div>
                </div>
                <p className="w-36 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>
            </div>

            <div className="flex flex-col p-4 font-poppins">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                        <div className="mx-auto w-full max-w-7xl px-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg">
                                    <thead>
                                        <tr className="bg-[#105E6A] font-poppins text-white text-xs sm:text-sm md:text-base">
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">{t('teamDetails.teamName')}</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">{t('teamDetails.leader')}</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">{t('teamDetails.teammates')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teams.length > 0 ? (
                                            teams.map((team) => (
                                                <tr key={team._id} className="hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins">
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">{team.teamName}</td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">
                                                        {team.leaderId?.fullName || "N/A"}
                                                    </td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">
                                                        {team.teamMembers.length > 0 ? (
                                                            <ol className="list-decimal pl-5">
                                                                {team.teamMembers.map((member, index) => (
                                                                    <li key={member._id} className="py-1">
                                                                        {member.fullName} ({member.academic_number})
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        ) : (
                                                            <span className="text-gray-500 italic">No members</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center py-6">
                                                    <div className="bg-gray-100 text-gray-500 py-4 px-12 rounded-lg shadow-md inline-block">
                                                         No teams available
                                                    </div>
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

export default Participants;
