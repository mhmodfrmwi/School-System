import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSchoolHubs } from "../StudentRedux/schoolhubSlice";
import activityImage from "../../../../assets/activity1.png";
import Loader from "@/ui/Loader";
import Swal from "sweetalert2";

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

  // Display SweetAlert for errors
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  }, [error]);

  const activity = schoolHubs.find((hub) => hub._id === id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader role="student" />
      </div>
    );
  }

  if (!activity) return <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 mb-10">No activity found.</div>;

  const { details, location } = activity;

  return (
    <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16 relative mb-10">
      <div className="col-span-2 flex flex-col justify-between ms-5">
        {/* Updated Header */}
        <div className="mb-1">
          <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-3xl font-semibold text-transparent">
            Activities
            <span className="absolute bottom-[-9px] left-0 h-[4px] w-[100px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
          </h1>

          {/* Updated Buttons Section */}
          <div className="mb-2 mt-22 flex items-center gap-8">
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] py-2 text-lg font-medium text-white focus:outline-none mt-8"
              onClick={() => navigate(`/student/activities/detailes/${id}`)}
            >
              Details
            </button>
            <button
              className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 text-lg font-medium text-transparent mt-8"
              onClick={() => navigate(`/student/activities/prizes/${id}`)}
            >
              Prizes
            </button>
          </div>
        </div>

        {/* Activity Details Section */}
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
    </div>
  );
};

export default DetailesActivity;