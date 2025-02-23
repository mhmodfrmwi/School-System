import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSchoolHubs } from "../StudentRedux/schoolhubSlice";
import activityImage from "../../../../assets/activity2.png";

const PrizesActivity = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();
  const { schoolHubs = [], loading, error } = useSelector(
    (state) => state.studentSchoolHub || {}
  );



  useEffect(() => {
    dispatch(getStudentSchoolHubs());
  }, [dispatch]);


  const activity = schoolHubs.find((hub) => hub._id === id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!activity) return <div>No activity found.</div>;

  const { prizes } = activity;

  return (
    <>
      <div className="col-span-2 flex flex-col justify-between ms-5">

        <div className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-1 font-bold text-transparent ms-7 mt-5">
          Activities
        </div>

        <p className="w-24 rounded-xl mb-2 border-t-4 border-[#BC6FFB] ms-7"></p>


        <div className="mb-6 mt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium text-white focus:outline-none"
            onClick={() => navigate("/student/activities")}
          >
            School Hubs
          </button>

          <button
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent"
            onClick={() => navigate("/student/activities/contests")}
          >
            Contests
          </button>
        </div>


        <div className="flex flex-col items-center mt-5">
          <img
            src={activityImage}
            alt="Activities"
            className="mb-6 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
          />

          <div className="w-1/2 mx-auto flex justify-center flex-wrap gap-4 mt-4 p-4">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 font-poppins text-center  bg-[#F5F5F5] shadow-md shadow-purple-300 hover:shadow-lg hover:shadow-purple-300 transition-shadow duration-300"
                style={{ flex: "1 1 calc(50% - 1rem)" }}
              >
                <h3 className="font-bold font-poppins text-lg">Level {index + 1}</h3>
                <p className="text-sm mt-2">{prize}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrizesActivity;