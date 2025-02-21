// TeamDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam, getTeammates, updateTeam } from "../StudentRedux/teamSlice";
import { toast } from "react-toastify";

const TeamDetails = () => {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { team, loading, error } = useSelector((state) => state.teams);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTeamName, setUpdatedTeamName] = useState("");

  useEffect(() => {
    dispatch(getTeammates(teamId));
  }, [dispatch, teamId]);

  useEffect(() => {
    if (team) {
      setUpdatedTeamName(team.teamName);
    }
  }, [team]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await dispatch(deleteTeam(teamId)).unwrap();
        toast.success("Team deleted successfully! 🗑️");
        navigate("/student/activities/contests");
      } catch (error) {
        toast.error("Failed to delete team: " + error.message);
      }
    }
  };

  const handleUpdate = async () => {
    if (!updatedTeamName.trim()) {
      toast.error("Team name cannot be empty!");
      return;
    }

    try {
      await dispatch(updateTeam({ teamId, updatedData: { teamName: updatedTeamName } })).unwrap();
      toast.success("Team updated successfully! ✅");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update team: " + error.message);
    }
  };

  if (loading) {
    return <div className="w-full h-full flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center font-poppins">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
      <h2 className="text-2xl font-poppins font-bold text-center bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
        Team Details
      </h2>

      {team && (
        <div className="mt-4">
          {isEditing ? (
            <div className="mb-4">
              <label className="block text-gray-700 font-poppins">Team Name:</label>
              <input
                type="text"
                value={updatedTeamName}
                onChange={(e) => setUpdatedTeamName(e.target.value)}
                className="w-full p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB]"
              />
            </div>
          ) : (
            <p className="text-gray-700 font-poppins">
              <strong>Team Name:</strong> {team.teamName}
            </p>
          )}

          <p className="text-gray-700 font-poppins">
            <strong>Members:</strong>
          </p>
          <ul className="list-disc list-inside">
            {team.teammates.map((member, index) => (
              <li key={index} className="text-gray-700 font-poppins">
                {member.fullName} - {member.academic_number}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-4 py-2 rounded-md font-poppins hover:opacity-90"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md font-poppins hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white px-4 py-2 rounded-md font-poppins hover:opacity-90"
            >
              Edit Team
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md font-poppins hover:bg-red-600"
            >
              Delete Team
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;