import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSchoolHubs } from "../StudentRedux/schoolhubSlice";
import activityImage from "../../../../assets/activity1.png";

const DetailesActivity = () => {
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
  
      const { details, location } = activity;

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
            className="mb-4 w-full max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 w-full max-w-4xl">
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-pink-400">
              <h3 className="font-bold font-poppins text-lg">Location</h3>
              <p className="text-sm mt-2">{location}</p>
            </div>
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-purple-400">
              <h3 className="font-bold font-poppins text-lg">Details</h3>
              <p className="text-sm mt-2">{details}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailesActivity;
