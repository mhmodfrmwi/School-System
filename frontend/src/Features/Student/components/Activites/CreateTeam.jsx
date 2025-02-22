import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../StudentRedux/teamSlice";
import { getTeammates } from "../StudentRedux/studentcontestSlice"; // جلب الطلاب المتاحين
import { fetchStudentContests } from "../StudentRedux/contestSlice";

const CreateTeam = () => {
  const { contestId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contests } = useSelector((state) => state.studentContests);
  const { students, loading: studentsLoading, error: studentsError } = useSelector(
    (state) => state.studentcontest // استخدام studentcontest بدل teams
  );

  const [teamName, setTeamName] = useState("");
  const [teammates, setTeammates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showTeammates, setShowTeammates] = useState(false);

  useEffect(() => {
    dispatch(fetchStudentContests());
    dispatch(getTeammates()); // جلب الطلاب المتاحين
  }, [dispatch]);

  const contest = contests.find((c) => c._id === contestId);
  const maxMembers = contest?.numberOfTeamMembers || 1;

  const handleSelectChange = (index, event) => {
    const selectedStudent = students.find((s) => s._id === event.target.value);
    if (selectedStudent) {
      const newTeammates = [...teammates];
      newTeammates[index] = {
        fullName: selectedStudent.fullName,
        academic_number: selectedStudent.academic_number,
      };
      setTeammates(newTeammates);
    }
  };

  const handleAddTeammate = () => {
    if (teammates.length < maxMembers) {
      setTeammates([...teammates, { fullName: "", academic_number: "" }]);
    }
  };

  const handleRemoveTeammate = (index) => {
    if (teammates.length > 1) {
      setTeammates(teammates.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const teamData = { teamName, teammates };

    try {
      await dispatch(createTeam({ contestId, teamData })).unwrap();
      setSuccessMessage("Team created successfully! 🎉");
      setTeamName("");
      setTeammates([]);
      setTimeout(() => {
        navigate("/student/activities/contests");
      }, 2000);
    } catch (error) {
      console.log("Server Error Response:", error);
      setErrorMessage(error);
    }
  };

  if (studentsLoading) {
    return <div className="w-full h-full flex justify-center items-center">Loading students...</div>;
  }

  if (studentsError) {
    return <div className="text-red-500 text-center font-poppins">{studentsError}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300">
      <h2 className="text-2xl font-poppins font-bold text-center bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
        Create Your Team
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block mt-4 text-gray-700 font-poppins">Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => {
            setTeamName(e.target.value);
            if (e.target.value.trim() !== "" && teammates.length === 0) {
              setTeammates([{ fullName: "", academic_number: "" }]);
              setShowTeammates(true);
            }
          }}
          required
          className="w-full p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB]"
        />

        {showTeammates && (
          <>
            <label className="block mt-4 text-gray-700 font-poppins">Team Members:</label>
            {teammates.map((member, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <select
                  onChange={(e) => handleSelectChange(index, e)}
                  required
                  className="w-3/4 p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB]"
                >
                  <option value="">Select Member</option>
                  {students && students.length > 0 ? (
                    students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.fullName} - {student.academic_number}
                      </option>
                    ))
                  ) : (
                    <option disabled>No students available</option>
                  )}
                </select>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTeammate(index)}
                    className="text-red-500 font-poppins hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </>
        )}

        {teammates.length < maxMembers && (
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
          Submit
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

export default CreateTeam;