import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../StudentRedux/teamSlice";
import { getTeammates } from "../StudentRedux/studentcontestSlice";
import { fetchStudentContests } from "../StudentRedux/contestSlice";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "@/ui/Loader";
import { useTranslation } from 'react-i18next';
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

const CreateTeam = () => {
  const { t } = useTranslation();
  const { contestId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const { contests, loading: contestsLoading } = useSelector((state) => state.studentContests);
  const { students, loading: studentsLoading, error: studentsError } = useSelector(
    (state) => state.studentcontest
  );

  const [teamName, setTeamName] = useState("");
  const [teammates, setTeammates] = useState([]);
  const [showTeammates, setShowTeammates] = useState(false);

  useEffect(() => {
    dispatch(fetchStudentContests());
    dispatch(getTeammates());
  }, [dispatch]);

  useEffect(() => {
    if (studentsError) {
      Swal.fire({
        title: t('createTeam.error.title'),
        text: studentsError,
        icon: "error",
        confirmButtonText: t('createTeam.error.confirmButton'),
      });
    }
  }, [studentsError, t]);

  const contest = contests.find((c) => c._id === contestId);
  const maxMembers = contest?.numberOfTeamMembers - 1 || 1;

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

    const teamData = { teamName, teammates };

    try {
      await dispatch(createTeam({ contestId, teamData })).unwrap();
      Swal.fire({
        title: t('createTeam.success.title'),
        text: t('createTeam.success.text'),
        icon: "success",
        confirmButtonText: t('createTeam.success.confirmButton'),
      }).then(() => {
        setTeamName("");
        setTeammates([]);
        navigate("/student/activities/contests");
      });
    } catch (error) {
      Swal.fire({
        title: t('createTeam.error.title'),
        text: error || error.message || t('createTeam.error.text'),
        icon: "error",
        confirmButtonText: t('createTeam.error.confirmButton'),
      });
    }
  };

  if (contestsLoading || studentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#13082F]">
        <Loader role={role} />
      </div>
    );
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
          {t('createTeam.title')}
          <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => navigate(-1)}
        >
          {t('createTeam.back')}
        </Button>
      </div>

      {/* Form */}
      <div className="w-2/3 mx-auto p-6 bg-white dark:bg-[#281459] shadow-lg rounded-2xl border-2 border-pink-300 dark:border-[#E0AAEE] relative z-10">
        <div className="p-6 rounded-lg h-full w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <label className="block mt-4 text-gray-700 dark:text-[#D1D5DB] font-poppins">{t('createTeam.teamName')}:</label>
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
              className="w-full p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB] dark:focus:ring-[#AE45FB] bg-white dark:bg-[#3B1E77] text-gray-700 dark:text-[#D1D5DB] border-gray-300 dark:border-[#E0AAEE]"
            />

            {showTeammates && (
              <>
                <label className="block mt-4 text-gray-700 dark:text-[#D1D5DB] font-poppins">{t('createTeam.teamMembers')}:</label>
                {teammates.map((member, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <select
                      onChange={(e) => handleSelectChange(index, e)}
                      required
                      className="w-3/4 p-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#BC6FFB] dark:focus:ring-[#AE45FB] bg-white dark:bg-[#3B1E77] text-gray-700 dark:text-[#D1D5DB] border-gray-300 dark:border-[#E0AAEE]"
                    >
                      <option value="">{t('createTeam.selectMember')}</option>
                      {students && students.length > 0 ? (
                        students.map((student) => (
                          <option key={student._id} value={student._id}>
                            {student.fullName} - {student.academic_number}
                          </option>
                        ))
                      ) : (
                        <option disabled>{t('createTeam.noStudents')}</option>
                      )}
                    </select>

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTeammate(index)}
                        className="text-red-500 dark:text-[#FF6B6B] font-poppins hover:text-red-700 dark:hover:text-[#FF8787]"
                      >
                        {t('createTeam.remove')}
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
                className="mt-3 text-gray-700 dark:text-[#D1D5DB] font-poppins hover:text-gray-800 dark:hover:text-[#E0AAEE]"
              >
                {t('createTeam.addMember')}
              </button>
            )}

            <Button
              type="submit"
              className="w-full mt-4 p-2 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white rounded-2xl font-poppins font-medium hover:opacity-90"
            >
              {t('createTeam.submit')}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateTeam;