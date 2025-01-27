import { useNavigate } from "react-router-dom";
import activityImage from "../../../../assets/activity2.png";

const DetailesActivity = () => {
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

        {/* الصورة */}
        <div className="flex flex-col items-center mt-5">
          <img
            src={activityImage}
            alt="Activities"
            className="mb-4 w-full max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-orange-400">
              <h3 className="font-bold font-poppins text-lg">Level 1</h3>
              <p className="text-sm mt-2">Certificate of Achievement.</p>
            </div>
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-purple-400">
              <h3 className="font-bold font-poppins text-lg">Level 2</h3>
              <p className="text-sm mt-2">Certificate and Silver Medal.</p>
            </div>
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-pink-400">
              <h3 className="font-bold font-poppins text-lg">Level 3</h3>
              <p className="text-sm mt-2">Certificate and Gold Medal.</p>
            </div>
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-blue-400">
              <h3 className="font-bold font-poppins text-lg">Level 4</h3>
              <p className="text-sm mt-2">
                Certificate, Gold Trophy, and a special prize.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailesActivity;
