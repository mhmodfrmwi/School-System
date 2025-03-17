import React, { useEffect } from "react";
import Frame from "../../../../assets/Frame.png";
import ScheduleIcon from "../../../../assets/ScheduleIcon.png";
import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTeacherReward,
  getAllTeachersReward,
  getTeacherDailyReward,
  getTeacherPointsForTerm,
} from "../TeacherRedux/motivationTeacherSlice";
import about2 from "../../../../assets/about2.png";

const Motivation = () => {
  const dispatch = useDispatch();
  const {
    teacherReward,
    teacherPointsForTerm,
    teacherDailyReward,
    allTeachersReward,
  } = useSelector((state) => state.motivationTeacher);

  console.log(allTeachersReward);
  useEffect(() => {
    dispatch(getAllTeacherReward());
    dispatch(getTeacherPointsForTerm());
    dispatch(getAllTeachersReward());
    dispatch(getTeacherDailyReward());
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-center">
        <div
          className={`mt-4 flex w-[97%] items-center justify-between rounded-2xl p-6 shadow-lg ${
            teacherPointsForTerm.badge === "Green"
              ? "bg-green-500"
              : teacherPointsForTerm.badge === "Diamond"
                ? "bg-[#6a6969]"
                : teacherPointsForTerm.badge === "Gold"
                  ? "bg-yellow-500"
                  : "bg-green-500"
          }`}
        >
          <div className="flex items-center space-x-4">
            <img
              src={Frame}
              className="h-24 w-24 md:h-32 md:w-32"
              alt="Profile Frame"
            />
            <div className="flex flex-col">
              <h1 className="font-poppins text-xl font-semibold text-white md:text-2xl">
                {teacherPointsForTerm.badge}
              </h1>

              <img src={ScheduleIcon} className="h-6 w-6" alt="Schedule Icon" />
              <p className="mt-1 text-3xl text-white">
                {teacherPointsForTerm.totalPoints}
              </p>
            </div>
          </div>

          {/* Circular content on the most right */}
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-white text-gray-800 shadow-md md:h-36 md:w-36">
            <p className="font-poppins text-lg font-bold text-white md:text-xl">
              Score
            </p>

            <p className="font-poppins text-xs text-white md:text-sm">
              for all semesters
            </p>

            <p className="text-2xl font-extrabold text-white md:text-3xl">
              {teacherReward.totalPoints}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl p-6">
        <button className="py-2 font-poppins text-2xl font-bold text-[#117C90]">
          Points Summary
        </button>
        <p className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#117C90] text-[#117C90]"></p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-2xl p-3">
            <div className="rounded-2xl bg-gradient-to-r from-[#117C90] via-[#117C90] to-[#117C90] p-[3px]">
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
                <div>
                  <img
                    src={img1}
                    alt="notFound"
                    className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
                  />
                </div>

                <div>
                  <p
                    className={`font-poppins font-semibold ${
                      teacherDailyReward.badge === "Green"
                        ? "text-green-500"
                        : teacherDailyReward.badge === "Diamond"
                          ? "text-[#6a6969]"
                          : teacherDailyReward.badge === "Gold"
                            ? "text-yellow-500"
                            : "text-green-500"
                    }`}
                  >
                    Points Earned Today
                  </p>
                </div>
                <div>
                  <p
                    className={`font-poppins text-2xl font-extrabold ${
                      teacherDailyReward.badge === "Green"
                        ? "text-green-500"
                        : teacherDailyReward.badge === "Diamond"
                          ? "text-[#6a6969]"
                          : teacherDailyReward.badge === "Gold"
                            ? "text-yellow-500"
                            : "text-green-500"
                    }`}
                  >
                    {teacherDailyReward.totalDailyPoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl p-3">
            <div className="rounded-2xl bg-gradient-to-r from-[#117C90] via-[#117C90] to-[#117C90] p-[3px]">
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
                <div>
                  <img
                    src={img2}
                    alt="notFound"
                    className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
                  />
                </div>
                <div>
                  <p
                    className={`font-poppins font-semibold ${
                      teacherPointsForTerm.badge === "Green"
                        ? "text-green-500"
                        : teacherPointsForTerm.badge === "Diamond"
                          ? "text-[#6a6969]"
                          : teacherPointsForTerm.badge === "Gold"
                            ? "text-yellow-500"
                            : "text-green-500"
                    }`}
                  >
                    Score for this Semester
                  </p>
                </div>
                <div>
                  <p
                    className={`font-poppins text-2xl font-extrabold ${
                      teacherPointsForTerm.badge === "Green"
                        ? "text-green-500"
                        : teacherPointsForTerm.badge === "Diamond"
                          ? "text-[#6a6969]"
                          : teacherPointsForTerm.badge === "Gold"
                            ? "text-yellow-500"
                            : "text-green-500"
                    }`}
                  >
                    {teacherPointsForTerm.totalPoints}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl p-3">
            <div className="rounded-2xl bg-gradient-to-r from-[#117C90] via-[#117C90] to-[#117C90] p-[3px]">
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-md">
                <div>
                  <img
                    src={img3}
                    alt="notFound"
                    className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
                  />
                </div>
                <div>
                  <p
                    className={`font-poppins font-semibold ${
                      teacherReward.badges === "Green"
                        ? "text-green-500"
                        : teacherReward.badges === "Diamond"
                          ? "text-[#6a6969]"
                          : teacherReward.badges === "Gold"
                            ? "text-yellow-500"
                            : "text-green-500"
                    }`}
                  >
                    Score for all semesters
                  </p>
                </div>
                <div>
                  <p
                    className={`font-poppins text-2xl font-extrabold ${
                      teacherReward.badges === "Green"
                        ? "text-green-500"
                        : teacherReward.badges === "Diamond"
                          ? "text-[#6a6969]"
                          : teacherReward.badges === "Gold"
                            ? "text-yellow-500"
                            : "text-green-500"
                    }`}
                  >
                    {teacherReward.totalPoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 bg-white lg:grid-cols-2">
          <div className="">
            <button className="py-2 font-poppins text-2xl font-bold text-[#117C90]">
              Summary Of Your Score
            </button>

            <p className="mb-4 ms-1 w-16 rounded-xl border-t-4 border-[#117C90] sm:w-24"></p>

            <p className="mb-4 font-poppins text-sm text-gray-700 sm:text-base">
              Every member starts his/her journey with a green membership card.
              In each semester, you will start earning points from the first
              day. Your final score at the end of the semester will determine
              the type of card you deserve to use throughout the next semester
              as recognition for your efforts.
            </p>

            <section className="mb-4 flex items-center space-x-4">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#117C90] to-[#117C90] sm:h-4 sm:w-4"></div>
              <p className="font-poppins text-xs sm:text-sm">
                If your points are between <strong>0 and 250</strong> in your
                school, you will be eligible for the Learnova{" "}
                <strong className="text-base font-bold text-green-500 sm:text-lg">
                  Green
                </strong>{" "}
                Card.
              </p>
            </section>

            <section className="mb-4 flex items-center space-x-4">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#117C90] to-[#117C90] sm:h-4 sm:w-4"></div>
              <p className="font-poppins text-xs sm:text-sm">
                If your points are between <strong>251 to 400</strong> in your
                school, you will be eligible for the Learnova{" "}
                <strong className="text-base font-bold text-yellow-500 sm:text-lg">
                  Golden
                </strong>{" "}
                Card.
              </p>
            </section>

            <section className="mb-4 flex items-center space-x-4">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#117C90] to-[#117C90] sm:h-4 sm:w-4"></div>
              <p className="font-poppins text-xs sm:text-sm">
                If your points are <strong>401 or more</strong> in your school,
                you will be eligible for the Learnova{" "}
                <strong className="text-base font-bold text-[#6a6969] sm:text-lg">
                  Diamond
                </strong>{" "}
                Card.
              </p>
            </section>
          </div>
          <div className="flex items-center justify-center">
            <img src={about2} alt="Score Illustration" className="w-70 h-80" />
          </div>
        </div>
      </div>
      <div className="ms-6">
        <button className="cursor-text py-2 font-poppins text-2xl font-bold text-[#117C90]">
          Top Teachers
        </button>
        <p className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-[900px]">
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1]">
              <thead className="bg-[#117C90] text-white">
                <tr className="bg-[#117C90] text-white">
                  {" "}
                  {/* Use #117C90 as the background color */}
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Full Name
                  </th>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Academic Number
                  </th>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Total Points
                  </th>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Badge
                  </th>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    Subject
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTeachersReward.map((teacher, index) => (
                  <tr
                    key={teacher._id}
                    className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                  >
                    <td className="border border-[#117C90] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {teacher.fullName}
                    </td>
                    <td className="border border-[#117C90] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {teacher.academicNumber}
                    </td>
                    <td className="border border-[#117C90] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {teacher.totalPoints}
                    </td>
                    <td className="border border-[#117C90] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {teacher.badge}
                    </td>
                    <td className="border border-[#117C90] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {teacher.subject.subjectName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Motivation;
