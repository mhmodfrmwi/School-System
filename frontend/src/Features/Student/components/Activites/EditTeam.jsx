import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTeam, getTeammatesByContestId } from "../StudentRedux/teamSlice";
import { getTeammates } from "../StudentRedux/studentcontestSlice";
import { fetchStudentContests } from "../StudentRedux/contestSlice";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "@/ui/Loader";

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
    if (teammatesList.length < maxMembers - 1) { // Subtract 1 to account for the leader
      setTeammatesList([...teammatesList, { _id: "", fullName: "", academic_number: "" }]);
    } else {
      Swal.fire({
        title: "Limit Reached!",
        text: `The team cannot have more than ${maxMembers} members.`,
        icon: "error",
        confirmButtonColor: "#FD813D",
      });
    }
  };

  const handleRemoveTeammate = (index) => {
    const newTeammates = teammatesList.filter((_, i) => i !== index);
    setTeammatesList(newTeammates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      Swal.fire({
        title: "Success!",
        text: "Team updated successfully! 🎉",
        icon: "success",
        confirmButtonColor: "#FD813D",
      }).then(() => {
        navigate("/student/activities/contests/teamdetails/" + teamId);
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An error occurred while updating the team.",
        icon: "error",
        confirmButtonColor: "#FD813D",
      });
    }
  };

  if (teamLoading || studentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader role="student" />
      </div>
    );
  }

  if (teamError || studentsError) {
    Swal.fire({
      title: "Error!",
      text: teamError || studentsError || "An error occurred while fetching data.",
      icon: "error",
      confirmButtonColor: "#FD813D",
    });
  }

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[90%] mx-auto mt-16 mb-20 min-h-[68vh]">
      {/* Header */}
      <div className="w-2/3 flex justify-between items-center mb-6 mx-auto">
        <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
          Edit Your Team
          <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      {/* Form */}
      <div className="w-2/3 mx-auto p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
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

          {/* Leader */}
          {currentTeammates.length > 0 && (
            <div className="flex gap-2 mt-2">
              <p className="p-2 border rounded-md bg-gray-100 flex-1 text-gray-700 font-poppins">
                {currentTeammates[0].leaderId?.fullName} (
                {currentTeammates[0].leaderId?.academic_number}){" "}
                <span className="text-green-500">(Leader)</span>
              </p>
            </div>
          )}

          {/* Other Members */}
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

          {teammatesList.length < maxMembers - 1 && ( // Subtract 1 to account for the leader
            <button
              type="button"
              onClick={handleAddTeammate}
              className="mt-3 text-gray-700 font-poppins hover:text-gray-800"
            >
              + Add Member
            </button>
          )}

          <Button
            type="submit"
            className="w-full mt-4 p-2 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white rounded-2xl font-poppins font-medium hover:opacity-90"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;