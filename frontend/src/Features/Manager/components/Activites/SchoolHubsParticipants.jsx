import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getParticipants } from "../ManagerRedux/participantSlice";

const SchoolHubsParticipant = () => {
  const dispatch = useDispatch();
  const { schoolHubId } = useParams();
  const { participants, loading, error } = useSelector(
    (state) => state.participant,
  );
  useEffect(() => {
    if (schoolHubId) {
      dispatch(getParticipants(schoolHubId));
    }
  }, [dispatch, schoolHubId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
          <div className="mx-auto w-full max-w-7xl px-4">
            <h2 className="dark:text-DarkManager mb-2 font-poppins text-xl font-bold text-[#105E6A] sm:text-2xl">
              Participants
            </h2>
            <p className="dark:border-DarkManager mb-4 w-32 rounded-xl border-t-4 border-[#117C90]"></p>

            <div className="overflow-x-auto">
              <table className="dark:border-DarkManager min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg">
                <thead>
                  <tr className="dark:bg-DarkManager bg-[#105E6A] font-poppins text-xs text-white sm:text-sm md:text-base">
                    <th className="border border-[#117C90] px-2 py-2 text-left sm:px-4">
                      Academic Number
                    </th>
                    <th className="border border-[#117C90] px-2 py-2 text-left sm:px-4">
                      First Name
                    </th>
                    <th className="border border-[#117C90] px-2 py-2 text-left sm:px-4">
                      Phone
                    </th>
                    <th className="border border-[#117C90] px-2 py-2 text-left sm:px-4">
                      Email
                    </th>
                    <th className="border border-[#117C90] px-2 py-2 text-left sm:px-4">
                      Grade
                    </th>
                    <th className="border border-[#117C90] px-2 py-2 text-left sm:px-4">
                      Class
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {participants && participants.length > 0 ? (
                    participants.map((participant) => (
                      <tr
                        key={participant._id}
                        className="font-poppins text-xs hover:bg-gray-100 dark:text-black sm:text-sm md:text-base"
                      >
                        <td className="dark:border-DarkManager border border-[#117C90] px-2 py-2 sm:px-4">
                          {participant.studentId.academic_number}
                        </td>
                        <td className="dark:border-DarkManager border border-[#117C90] px-2 py-2 sm:px-4">
                          {participant.studentId.fullName.split(" ")[0]}
                        </td>
                        <td className="dark:border-DarkManager border border-[#117C90] px-2 py-2 sm:px-4">
                          {participant.studentId.phone}
                        </td>
                        <td className="dark:border-DarkManager border border-[#117C90] px-2 py-2 sm:px-4">
                          {participant.studentId.email}
                        </td>
                        <td className="dark:border-DarkManager border border-[#117C90] px-2 py-2 sm:px-4">
                          {participant.studentId.gradeId.gradeName}
                        </td>
                        <td className="dark:border-DarkManager border border-[#117C90] px-2 py-2 sm:px-4">
                          {participant.studentId.classId.className}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4">
                        <div className="rounded-lg border bg-gray-100 px-6 py-4 text-center font-poppins font-semibold text-gray-500 shadow-md">
                          No participants available
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
  );
};

export default SchoolHubsParticipant;
