import { useNavigate } from "react-router-dom";
import activityImage from "../../../../assets/activity3.png";
import React, { useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips, clearMessage } from "../../../Teacher/components/TeacherRedux/TripsSlice";
const Contests = () => {
  const navigate = useNavigate();
  const { trips, message, loading } = useSelector((state) => state.trips);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchTrips());
  }, [dispatch]);

  useEffect(() => {
      if (message) {
          setTimeout(() => {
              dispatch(clearMessage());
          }, 5000);
      }
  }, [message, dispatch]);


  if (loading) {
      return <div className="w-full h-full"></div>; 
  }

  return (
    <>
      <div className="col-span-2 flex flex-col justify-between ms-5">
        <div className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-1 font-bold text-transparent ms-7 mt-5">
          Activities
        </div>
        <p className="w-24 rounded-xl mb-2 border-t-4 border-[#BC6FFB] ms-7"></p>
        <div className="mb-6 mt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent"
            onClick={() => navigate("/student/activities")}
          >
            School Hubs
          </button>

          <button
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium text-white focus:outline-none"
            onClick={() => navigate("/student/activities/contests")}
          >
            Trips
          </button>
        </div>

      </div>


      {/* Table */}
      <div className="mx-auto w-full max-w-7xl px-4">
      <div className="flex justify-end items-center">  
        <img
          src={activityImage}
          className="h-30 w-30"
          alt="Schedule Icon"
        />
      </div>
      
      <div className="overflow-x-auto"> 
        <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
              <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Title</th>
              <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">coach</th>
              <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Start Date</th>
              <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">End Date</th>
              <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">number of seats</th>
              <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Fees</th>
              <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg"> Requirements</th>
              <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{index.title}</td>
                <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{index.coach}</td>
                <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{index.startDate}</td>
                <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{index.endDate}</td>
                <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{index.numberOfSeats}</td>
                <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{index.fees}</td>
                <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{index.requirements}</td>
                <td className="border flex items-center justify-center border-[#FFA4A4] px-4 py-2">
                  <button className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-2xl px-4 py-2 text-xs text-white sm:text-sm">
                    Enter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    </>
  );
};

export default Contests;