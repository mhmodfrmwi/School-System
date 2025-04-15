import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolHubs } from "../ManagerRedux/schoolhubSlice";
import activityImage from "../../../../assets/TeacherIcon/img1.png";

const PrizesActivity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { schoolHubs, loading, error } = useSelector(
    (state) => state.schoolhub,
  );

  useEffect(() => {
    dispatch(getSchoolHubs());
  }, [dispatch]);

  const activity = schoolHubs.find((hub) => hub._id === id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!activity) return <div>No activity found.</div>;

  const { prizes } = activity;

  return (
    <>
      <div className="col-span-2 ms-5 flex flex-col justify-between">
        <div className="dark:text-DarkManager ms-7 mt-5 cursor-text py-1 font-poppins text-2xl font-bold text-[#105E6A]">
          Prizes
        </div>

        <p className="dark:border-DarkManager mb-2 ms-7 w-24 rounded-xl border-t-4 border-[#117C90]"></p>

        <div className="mt-5 flex flex-col items-center">
          <img
            src={activityImage}
            alt="Activities"
            className="mb-4 w-full max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl"
          />

          <div className="mx-auto mt-4 flex w-1/2 flex-wrap justify-center gap-4 p-4">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className="dark:shadow-DarkManager dark:bg-DarkManager2 rounded-lg border bg-[#F5F5F5] p-6 text-center font-poppins shadow-md shadow-[#105E6A] transition-shadow duration-300 hover:shadow-lg hover:shadow-[#117C90]"
                style={{ flex: "1 1 calc(50% - 1rem)" }}
              >
                <h3 className="font-poppins text-lg font-bold">
                  Level {index + 1}
                </h3>
                <p className="mt-2 text-sm">{prize}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrizesActivity;
