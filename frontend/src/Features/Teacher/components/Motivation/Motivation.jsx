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
import { useTranslation } from 'react-i18next';

const Motivation = () => {
  const { t } = useTranslation();
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
              alt={t('motivation.profileFrame')}
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
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-white text-gray-800 shadow-md md:h-36 md:w-36 dark:text-white">
            <p className="font-poppins text-lg font-bold text-white md:text-xl">
              {t('motivation.score')}
            </p>
            <p className="font-poppins text-xs text-white md:text-sm">
              {t('motivation.forAllSemesters')}
            </p>
            <p className="text-2xl font-extrabold text-white md:text-3xl">
              {teacherReward.totalPoints}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl p-6">
        <button className="py-2 font-poppins text-2xl font-bold text-[#117C90] dark:text-DarkManager">
          {t('points.title')}
        </button>
        <p className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#117C90] text-[#117C90] dark:border-DarkManager"></p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-2xl p-3">
            <div className="rounded-2xl bg-gradient-to-r from-[#117C90] to-[#117C90] p-[3px] dark:from-DarkManager dark:to-DarkManager">
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
                    {t('points.todayPoints')}
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
            <div className="rounded-2xl bg-gradient-to-r from-[#117C90] to-[#117C90] p-[3px] dark:from-DarkManager dark:to-DarkManager">
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
                    {t('points.semesterPoints')}
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
            <div className="rounded-2xl bg-gradient-to-r from-[#117C90] to-[#117C90] p-[3px] dark:from-DarkManager dark:to-DarkManager">
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
                    {t('points.allPoints')}
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
          <div>
            <button className="py-2 font-poppins text-2xl font-bold text-[#117C90] dark:text-DarkManager">
              {t('motivation.summaryTitle')}
            </button>
            <p className="mb-4 ms-1 w-16 rounded-xl border-t-4 border-[#117C90] sm:w-24 dark:border-DarkManager"></p>
            <p className="mb-4 font-poppins text-sm text-gray-700 sm:text-base">
              {t('motivationteacher.motidesc')}
            </p>
            <section className="mb-4 flex items-center space-x-4 dark:text-DarkManager">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#117C90] to-[#117C90] sm:h-4 sm:w-4"></div>
              <p className="font-poppins text-xs sm:text-sm">
                {t('motivationteacher.content01')}
                <strong>{t('motivationteacher.content05')}</strong>
                {t('motivationteacher.content02')}
                <strong className="text-base font-bold text-green-500 sm:text-lg">
                  {t('motivationteacher.content03')}
                </strong>
                {t('motivationteacher.content04')}
              </p>
            </section>
            <section className="mb-4 flex items-center space-x-4 dark:text-DarkManager">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#117C90] to-[#117C90] sm:h-4 sm:w-4"></div>
              <p className="font-poppins text-xs sm:text-sm">
                {t('motivationteacher.content11')}
                <strong>{t('motivationteacher.content15')}</strong>
                {t('motivationteacher.content12')}
                <strong className="text-base font-bold text-yellow-500 sm:text-lg">
                  {t('motivationteacher.content13')}
                </strong>
                {t('motivationteacher.content14')}
              </p>
            </section>
            <section className="mb-4 flex items-center space-x-4 dark:text-DarkManager">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#117C90] to-[#117C90] sm:h-4 sm:w-4"></div>
              <p className="font-poppins text-xs sm:text-sm">
                {t('motivationteacher.content21')}
                <strong>{t('motivationteacher.content25')}</strong>
                {t('motivationteacher.content22')}
                <strong className="text-base font-bold text-[#6a6969] sm:text-lg">
                  {t('motivationteacher.content23')}
                </strong>
                {t('motivationteacher.content24')}
              </p>
            </section>
          </div>
          <div className="flex items-center justify-center">
            <img src={about2} alt="Score Illustration" className="w-70 h-80" />
          </div>
        </div>
      </div>
      <div className="ms-6">
        <button className="cursor-text py-2 font-poppins text-2xl font-bold text-[#117C90] dark:text-DarkManager">
          {t('motivationteacher.TopTeachers')}
        </button>
        <p className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#117C90] dark:border-DarkManager"></p>
      </div>

      <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-[900px]">
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-DarkManager">
              <thead className="bg-[#117C90] text-white dark:bg-DarkManager">
                <tr>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('table.fullName')}
                  </th>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('table.academicNumber')}
                  </th>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('table.totalPoints')}
                  </th>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('table.badge')}
                  </th>
                  <th className="border border-[#117C90] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('motivationteacher.Subject')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTeachersReward.map((teacher, index) => (
                  <tr
                    key={teacher._id}
                    className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:hover:bg-DarkManager/70 dark:text-black`}
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