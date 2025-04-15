import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTeam, getTeammatesByContestId } from "../StudentRedux/teamSlice";
import { getTeammates } from "../StudentRedux/studentcontestSlice";
import { fetchStudentContests } from "../StudentRedux/contestSlice";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "@/ui/Loader";
import { useTranslation } from 'react-i18next';
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

const EditTeam = () => {
  const { t } = useTranslation();
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
        title: t('editTeam.error.title'),
        text: t('editTeam.maxMembers', { max: maxMembers }),
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
        title: t('editTeam.success.title'),
        text: t('editTeam.success.text'),
        icon: "success",
        confirmButtonColor: "#FD813D",
      }).then(() => {
        navigate("/student/activities/contests/teamdetails/" + teamId);
      });
    } catch (error) {
      Swal.fire({
        title: t('editTeam.error.title'),
        text: error.message || t('editTeam.error.text'),
        icon: "error",
        confirmButtonColor: "#FD813D",
      });
    }
  };

  if (teamLoading || studentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role="student" />
      </div>
    );
  }

  if (teamError || studentsError) {
    Swal.fire({
      title: t('editTeam.error.title'),
      text: teamError || studentsError || t('editTeam.error.text'),
      icon: "error",
      confirmButtonColor: "#FD813D",
    });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>
    <div className="flex flex-wrap font-poppins gap-6 w-[90%] mx-auto mt-16 mb-20 min-h-[68vh]">
      {/* Header */}
      <div className="w-2/3 flex justify-between items-center mb-6 mx-auto relative z-10">
        <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
          {t('editTeam.title')}
          <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => navigate(-1)}
        >
          {t('editTeam.back')}
        </Button>
      </div>

      {/* Form */}
      <div className="w-2/3 mx-auto p-6 bg-white dark:bg-[#281459] shadow-lg rounded-2xl border-2 border-pink-300 dark:border-[#E0AAEE] relative z-10">
        <form onSubmit={handleSubmit}>
          <label className="block mt-4 text-gray-700 dark:text-[#D1D5DB] font-poppins">{t('editTeam.teamName')}:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB] dark:focus:ring-[#AE45FB] bg-white dark:bg-[#3B1E77] text-gray-700 dark:text-[#D1D5DB] border-gray-300 dark:border-[#E0AAEE]"
          />

          <label className="block mt-4 text-gray-700 dark:text-[#D1D5DB] font-poppins">{t('editTeam.teamMembers')}:</label>

          {/* Leader */}
          {currentTeammates.length > 0 && (
            <div className="flex gap-2 mt-2">
              <p className="p-2 border rounded-md bg-gray-100 dark:bg-[#3B1E77] flex-1 text-gray-700 dark:text-[#D1D5DB] font-poppins dark:border-[#E0AAEE]">
                {currentTeammates[0].leaderId?.fullName} (
                {currentTeammates[0].leaderId?.academic_number}){" "}
                <span className="text-green-500">{t('editTeam.leader')}</span>
              </p>
            </div>
          )}

          {/* Other Members */}
          {teammatesList.map((member, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <select
                onChange={(e) => handleSelectChange(index, e)}
                required
                className="w-3/4 p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB] dark:focus:ring-[#AE45FB] bg-white dark:bg-[#3B1E77] text-gray-700 dark:text-[#D1D5DB] border-gray-300 dark:border-[#E0AAEE]"
                value={member._id || ""}
              >
                <option value="">{t('editTeam.selectMember')}</option>
                {allStudents.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.fullName} - {student.academic_number}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleRemoveTeammate(index)}
                className="text-red-500 dark:text-[#FF6B6B] hover:text-red-700 dark:hover:text-[#FF8787]"
              >
                {t('editTeam.remove')}
              </button>
            </div>
          ))}

          {teammatesList.length < maxMembers - 1 && ( // Subtract 1 to account for the leader
            <button
              type="button"
              onClick={handleAddTeammate}
              className="mt-3 text-gray-700 dark:text-[#D1D5DB] font-poppins hover:text-gray-800 dark:hover:text-[#E0AAEE]"
            >
              {t('editTeam.addMember')}
            </button>
          )}

          <Button
            type="submit"
            className="w-full mt-4 p-2 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white rounded-2xl font-poppins font-medium hover:opacity-90"
          >
            {t('editTeam.saveChanges')}
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditTeam;