import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTeam, getTeammatesByContestId } from "../StudentRedux/teamSlice";
import { getTeammates } from "../StudentRedux/studentcontestSlice"; 
import { fetchStudentContests } from "../StudentRedux/contestSlice";

const EditTeam = () => {
  const { teamId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teammates: currentTeammates, loading: teamLoading, error: teamError } = useSelector(
    (state) => state.teams
  );
  const { contests } = useSelector((state) => state.studentContests);
  const { students: allStudents, loading: studentsLoading, error: studentsError } = useSelector(
    (state) => state.studentcontest 
  );

  const [teamName, setTeamName] = useState("");
  const [teammatesList, setTeammatesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [maxMembers, setMaxMembers] = useState(1);

  useEffect(() => {
    dispatch(getTeammatesByContestId(teamId)); 
    dispatch(getTeammates()); 
    dispatch(fetchStudentContests()); 
  }, [dispatch, teamId]);

  useEffect(() => {
    if (currentTeammates.length > 0) {
      setTeamName(currentTeammates[0].teamName || "");

    
      const otherMembers = currentTeammates[0].teamMembers.filter(
        (member) => member.academic_number !== currentTeammates[0].leaderId?.academic_number
      );

      setTeammatesList(otherMembers); 
    }
  }, [currentTeammates]);

  useEffect(() => {
    const contest = contests?.find((c) => c._id === teamId);
    setMaxMembers(contest?.numberOfTeamMembers || 1);
  }, [contests, teamId]);

  const handleSelectChange = (index, event) => {
    const selectedStudent = allStudents.find((s) => s._id === event.target.value);
    if (selectedStudent) {
      const newTeammates = [...teammatesList];
      newTeammates[index] = {
        _id: selectedStudent._id,
        fullName: selectedStudent.fullName,
        academic_number: selectedStudent.academic_number,
      };
      setTeammatesList(newTeammates);
    }
  };

  const handleAddTeammate = () => {
    if (teammatesList.length < maxMembers) {
      setTeammatesList([...teammatesList, { _id: "", fullName: "", academic_number: "" }]);
    } else {
      setErrorMessage(`You cannot add more than ${maxMembers} members.`);
    }
  };

  const handleRemoveTeammate = (index) => {
    const newTeammates = teammatesList.filter((_, i) => i !== index);
    setTeammatesList(newTeammates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
     
      const teamToUpdate = currentTeammates[0]?._id; 
      if (!teamToUpdate) {
        throw new Error("Team ID not found.");
      }

  
      const updatedTeammates = teammatesList.map(({ fullName, academic_number }) => ({
        fullName,
        academic_number,
      }));

     
      await dispatch(
        updateTeam({
          teamId: teamToUpdate,
          updatedData: { teamName, teammates: updatedTeammates },
        })
      ).unwrap();

      setSuccessMessage("Team updated successfully! 🎉");
      setTimeout(() => {
        navigate("/student/activities/contests");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while updating the team.");
    }
  };

  if (teamLoading || studentsLoading) {
    return (
      <div className="max-w-lg mx-auto mt-32 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
        <div className="text-center text-gray-700 font-poppins">Loading...</div>
      </div>
    );
  }

  if (teamError || studentsError) {
    return (
      <div className="max-w-lg mx-auto mt-32 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
        <div className="text-center text-red-500 font-poppins">{teamError || studentsError}</div>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
      <h2 className="text-2xl font-poppins font-bold text-center bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
        Edit Your Team
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block mt-4 text-gray-700 font-poppins">Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          className="w-full p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB]"
        />

        <label className="block mt-4 text-gray-700 font-poppins">Team Members:</label>

     
        {currentTeammates.length > 0 && (
          <div className="flex gap-2 mt-2">
            <p className="p-2 border rounded-md bg-gray-100 flex-1 text-gray-700 font-poppins">
              {currentTeammates[0].leaderId?.fullName} (
              {currentTeammates[0].leaderId?.academic_number}){" "}
              <span className="text-green-500">(Leader)</span>
            </p>
          </div>
        )}

    
        {teammatesList.map((member, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <select
              onChange={(e) => handleSelectChange(index, e)}
              required
              className="w-3/4 p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB]"
              value={member._id || ""}
            >
              <option value="">Select Member</option>
              {allStudents.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.fullName} - {student.academic_number}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleRemoveTeammate(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}

        {teammatesList.length < maxMembers && (
          <button
            type="button"
            onClick={handleAddTeammate}
            className="mt-3 text-gray-700 font-poppins hover:text-gray-800"
          >
            + Add Member
          </button>
        )}

        <button
          type="submit"
          className="w-full mt-4 p-2 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white rounded-2xl font-poppins font-medium hover:opacity-90"
        >
          Save Changes
        </button>
      </form>

      {errorMessage && (
        <div className="mt-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded-md font-poppins text-center">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mt-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded-md font-poppins text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default EditTeam;