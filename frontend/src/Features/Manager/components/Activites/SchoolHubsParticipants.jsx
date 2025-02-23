import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getParticipants } from "../ManagerRedux/participantSlice"; 

const SchoolHubsParticipant = () => {
  const dispatch = useDispatch();
  const { schoolHubId } = useParams(); 
  const { participants, loading, error } = useSelector((state) => state.participant);
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
            <h2 className="text-xl sm:text-2xl font-poppins text-[#105E6A] font-bold mb-2">
              Participants
            </h2>
            <p className="w-32 rounded-xl mb-4 border-t-4 border-[#117C90]"></p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg">
                <thead>
                  <tr className="bg-[#105E6A] font-poppins text-white text-xs sm:text-sm md:text-base">
                    <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Academic Number</th>
                    <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">First Name</th>
                    <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Phone</th>
                    <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Email</th>
                    <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Grade</th>
                    <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Class</th>
                  </tr>
                </thead>
                <tbody>
                  {participants && participants.length > 0 ? (
                    participants.map((participant) => (
                      <tr key={participant._id} className="hover:bg-gray-100 text-xs sm:text-sm md:text-base font-poppins">
                        <td className="border border-[#117C90] px-2 sm:px-4 py-2">{participant.studentId.academic_number}</td>
                        <td className="border border-[#117C90] px-2 sm:px-4 py-2">
                          {participant.studentId.fullName.split(" ")[0]}
                        </td>
                        <td className="border border-[#117C90] px-2 sm:px-4 py-2">{participant.studentId.phone}</td>
                        <td className="border border-[#117C90] px-2 sm:px-4 py-2">{participant.studentId.email}</td>
                        <td className="border border-[#117C90] px-2 sm:px-4 py-2">{participant.studentId.gradeId.gradeName}</td>
                        <td className="border border-[#117C90] px-2 sm:px-4 py-2">{participant.studentId.classId.className}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                    <td colSpan="6" className="py-4 px-6">
                      <div className="text-center py-4 px-6 font-poppins text-gray-500 font-semibold bg-gray-100 border  rounded-lg shadow-md">
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