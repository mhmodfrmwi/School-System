import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeammatesByContestId, deleteTeam } from "../StudentRedux/teamSlice";
import { fetchStudentContests } from "../StudentRedux/contestSlice";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "@/ui/Loader";
import { useTranslation } from 'react-i18next';

const TeamDetails = () => {
  const { t } = useTranslation();
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teammates, loading, error } = useSelector((state) => state.teams);
  const { contests } = useSelector((state) => state.studentContests);


  useEffect(() => {
    dispatch(getTeammatesByContestId(teamId));
    dispatch(fetchStudentContests());
  }, [dispatch, teamId]);

  const contest = contests?.find((c) => c._id === teamId);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: t('teamDetails.deleteConfirmation.title'),
      text:t('teamDetails.deleteConfirmation.text'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FD813D",
      cancelButtonColor: "#BC6FFB",
      confirmButtonText: t('teamDetails.deleteConfirmation.confirm'),
    });

    if (result.isConfirmed) {
      try {
        const teamToDelete = teammates[0]?._id;
        if (!teamToDelete) {
          throw new Error("Team ID not found.");
        }

        await dispatch(deleteTeam(teamToDelete)).unwrap();
        Swal.fire({
          title: t('teamDetails.deleteConfirmation.successTitle'),
          text: t('teamDetails.deleteConfirmation.successText'),
          icon: "success",
          confirmButtonColor: "#FD813D",
        }).then(() => {
          navigate("/student/activities/contests");
        });
      } catch (error) {
        Swal.fire({
          title: t('teamDetails.deleteConfirmation.errorTitle'),
          text: error.message,
          icon: "error",
          confirmButtonColor: "#FD813D",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader role="student" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 font-poppins">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[90%] mx-auto mt-16 mb-20 min-h-[68vh]">
      {/* Header */}
      <div className="w-2/3 flex justify-between items-center mb-6 mx-auto">
        <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
        {t('teamDetails.title')}
          <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => navigate(-1)}
        >
          {t('teamDetails.back')}
        </Button>
      </div>

      {/* Content */}
      <div className="w-2/3 mx-auto p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
        <p className="mb-2 text-gray-700 font-poppins">
          <strong>{t('teamDetails.teamName')}:</strong> {teammates[0]?.teamName}
        </p>
        <p className="mb-4 text-gray-700 font-poppins">
          <strong>{t('teamDetails.contest')}:</strong> {contest?.title || "N/A"}
        </p>
        <p className="mb-4 text-gray-700 font-poppins">
          <strong>{t('teamDetails.teammates')}:</strong>
        </p>
        {teammates[0]?.teamMembers?.map((member) => {
          const isLeader = member.academic_number === teammates[0]?.leaderId?.academic_number;

          return (
            <p
              key={member.academic_number}
              className="p-2 border rounded-md bg-gray-100 mb-1 text-gray-700 font-poppins"
            >
              {member.fullName} ({member.academic_number}){" "}
              {isLeader && <span className="text-green-500">{t('teamDetails.leader')}</span>}
            </p>
          );
        })}

        <div className="flex space-x-4 mt-4">
          <Button
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:shadow-lg transition-shadow duration-300"
            onClick={handleDelete}
          >
            {t('teamDetails.deleteTeam')}
          </Button>
          <Button
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(`/student/activities/contests/edit-team/${teamId}`)}
          >
            {t('teamDetails.editTeam')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;