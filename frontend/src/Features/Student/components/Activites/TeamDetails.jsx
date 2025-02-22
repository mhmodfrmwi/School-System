import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeammatesByContestId, deleteTeam } from "../StudentRedux/teamSlice";
import { fetchStudentContests } from "../StudentRedux/contestSlice";

const TeamDetails = () => {
  const { teamId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teammates, loading, error } = useSelector((state) => state.teams);
  const { contests } = useSelector((state) => state.studentContests);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(getTeammatesByContestId(teamId));
    dispatch(fetchStudentContests());
  }, [dispatch, teamId]);

  const contest = contests?.find((c) => c._id === teamId);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        const teamToDelete = teammates[0]?._id;
        if (!teamToDelete) {
          throw new Error("Team ID not found.");
        }

        await dispatch(deleteTeam(teamToDelete)).unwrap();
        setSuccessMessage("Team deleted successfully! 🗑");
        setTimeout(() => {
          navigate("/student/activities/contests");
        }, 2000);
      } catch (error) {
        setErrorMessage("Failed to delete team: " + error.message);
      }
    }
  };

 
  if (loading) {
    return (
      <div className="max-w-lg mx-auto mt-32 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
        <div className="text-center text-gray-700 font-poppins">Loading...</div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-32 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
        <div className="text-center text-red-500 font-poppins">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
      <h2 className="text-2xl font-poppins font-bold text-center bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
        Team Details
      </h2>

      <p className="mb-2 text-gray-700 font-poppins">
        <strong>Team Name:</strong> {teammates[0]?.teamName}
      </p>
      <p className="mb-4 text-gray-700 font-poppins">
        <strong>Contest:</strong> {contest?.title || "N/A"}
      </p>
      <p className="mb-4 text-gray-700 font-poppins">
        <strong>Teammates:</strong>
      </p>
      {teammates[0]?.teamMembers?.map((member) => {
        const isLeader = member.academic_number === teammates[0]?.leaderId?.academic_number;

        return (
          <p
            key={member.academic_number}
            className="p-2 border rounded-md bg-gray-100 mb-1 text-gray-700 font-poppins"
          >
            {member.fullName} ({member.academic_number}){" "}
            {isLeader && <span className="text-green-500">(Leader)</span>}
          </p>
        );
      })}

      <div className="flex space-x-4 mt-4">
        <button
          className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 font-poppins"
          onClick={handleDelete}
        >
          Delete Team
        </button>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 font-poppins"
          onClick={() => navigate(`/student/activities/contests/edit-team/${teamId}`)}
        >
          Edit Team
        </button>
      </div>

     
      {successMessage && (
        <div className="mt-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded-md font-poppins text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded-md font-poppins text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;