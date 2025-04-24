import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../TeacherRedux/participantsSlice";
import { useTranslation } from "react-i18next";

const Participants = () => {
  const { contestId } = useParams();
  const { t ,i18n} = useTranslation();
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.participants);
  const isRTL = i18n.language === "ar";
  useEffect(() => {
    if (!contestId) {
      console.error("Contest ID is undefined");
      return;
    }
    dispatch(fetchTeams(contestId));
  }, [dispatch, contestId]);

  if (loading) {
    return <div className="h-full w-full"></div>;
  }

  if (error) {
    return <div className="text-center font-poppins text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="col-span-2 ms-5 flex flex-col justify-between">
        <div className="ms-7 mt-5 flex items-center justify-between">
          <div className="flex-1 cursor-text py-1 font-poppins text-lg font-bold text-[#105E6A] dark:text-DarkManager sm:text-2xl">
            {t("activitiest.Participants")}
          </div>
        </div>
        <p className="mb-2 ms-7 w-36 rounded-xl border-t-4 border-[#117C90] dark:border-DarkManager"></p>
      </div>

      <div className="flex flex-col p-4 font-poppins">
        <div className="flex-1">
          <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
            <div className="mx-auto w-full max-w-7xl px-4">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg dark:border-DarkManager">
                  <thead>
                    <tr className="bg-[#105E6A] font-poppins text-xs text-white dark:bg-DarkManager sm:text-sm md:text-base">
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("teamDetails.teamName")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("teamDetails.leader")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("teamDetails.teammates")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.length > 0 ? (
                      teams.map((team) => (
                        <tr
                          key={team._id}
                          className="font-poppins text-xs hover:bg-gray-100 dark:text-black sm:text-sm md:text-base"
                        >
                          <td className="border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-4">
                            {team.teamName}
                          </td>
                          <td className="border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-4">
                            {team.leaderId?.fullName || "N/A"}
                          </td>
                          <td className="border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-4">
                            {team.teamMembers.length > 0 ? (
                              <ol className="list-decimal pl-5">
                                {team.teamMembers.map((member, index) => (
                                  <li key={member._id} className="py-1">
                                    {member.fullName} ({member.academic_number})
                                  </li>
                                ))}
                              </ol>
                            ) : (
                              <span className="italic text-gray-500">
                                No members
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="py-6 text-center">
                          <div className="inline-block rounded-lg bg-gray-100 px-12 py-4 text-gray-500 shadow-md">
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
