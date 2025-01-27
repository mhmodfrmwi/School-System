import { useNavigate } from "react-router-dom";
import activityImage from "../../../../assets/activity3.png";


const Contests = () => {
    const navigate = useNavigate();

    return (
   <>
      <div className="col-span-2 flex flex-col justify-between ms-5">
        {/* العنوان */}
        <div className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-1 font-bold text-transparent ms-7 mt-5">
          Activities
        </div>
        {/* الخط */}
        <p className="w-24 rounded-xl mb-2 border-t-4 border-[#BC6FFB] ms-7"></p>

        {/* الأزرار */}
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
            Contests
          </button>
        </div>

      </div>
      
    </>
    );
};

export default Contests;