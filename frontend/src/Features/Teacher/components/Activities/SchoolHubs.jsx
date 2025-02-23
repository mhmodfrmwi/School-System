import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherSchoolHubs } from "../TeacherRedux/schoolhubSlice"; 
import ActivityToggle from "./SelectPage";

const Activities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schoolHubs, loading, error } = useSelector((state) => state.teacherSchoolHub);

  useEffect(() => {
    dispatch(getTeacherSchoolHubs());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ActivityToggle />
      <div className="col-span-2 flex flex-col justify-between ms-5">
        <div className="text-2xl font-poppins cursor-text font-bold text-[#105E6A] ms-7 mt-5">
          School Hubs & Activities
        </div>
        <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>

        <div className="flex flex-col md:flex-row items-center justify-between mt-5 gap-4">
          <div className="flex flex-col sm:flex-row w-full md:w-2/3 gap-4">
            {schoolHubs.length > 0 ? (
              schoolHubs.map((hub) => (
                <div key={hub._id} className="flex flex-col w-full border rounded-lg p-4 text-center bg-[#F5F5F5] shadow-md">
                  <h3 className="font-bold font-poppins text-xl text-[#105E6A]">{hub.title}</h3>
                  <div className="flex flex-col items-center mt-2">
                    <p className="text-sm font-poppins">Contest Registration Start:</p>
                    <p className="text-sm font-semibold font-poppins">
                      {new Date(hub.registrationStart).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <p className="text-sm font-poppins">Contest Ends:</p>
                    <p className="text-sm font-semibold font-poppins">
                      {new Date(hub.registrationEnd).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <p className="text-sm font-poppins">Contest Date:</p>
                    <p className="text-sm font-semibold font-poppins">
                      {new Date(hub.contestDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <button
                      className="cursor-pointer font-poppins rounded-3xl bg-[#105E6A] px-5 py-2 text-lg font-medium text-white"
                      onClick={() => navigate(`/teacher/school-hubs/detailes/${hub._id}`)}
                    >
                      Details
                    </button>
                    <button
                      className="cursor-pointer font-poppins rounded-3xl text-[#117C90] border border-[#117C90] px-5 py-2 text-lg font-medium"
                      onClick={() => navigate(`/teacher/school-hubs/prizes/${hub._id}`)}
                    >
                      Prizes
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg mt-10">
                <p className="text-xl font-semibold text-gray-600 mb-2">No school hubs available.</p>
                <p className="text-gray-500 mb-4 text-center max-w-xl">
                  It seems like there are no school hubs available at the moment. Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activities;