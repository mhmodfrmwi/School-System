import React, { useEffect } from "react";
import ActivityToggle from "./SelectPage";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContests,
  deleteContest,
  clearMessage,
} from "../TeacherRedux/ContestSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

const Contests = () => {
  const navigate = useNavigate();
  const { contests, message, loading } = useSelector((state) => state.contests);
  const dispatch = useDispatch();
  const { t ,i18n} = useTranslation();
  const isRTL = i18n.language === "ar";
  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  }, [message, dispatch]);

  if (loading) {
    return <div className="h-full w-full"></div>;
  }

  const handleAddActivity = () => {
    navigate("/teacher/contests/activity-form");
  };

  const handleEdit = (id) => {
    navigate(`/teacher/contests/edit-activity-form/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contest?")) {
      dispatch(deleteContest(id)).then(() => {
        dispatch(fetchContests());
      });
    }
  };

  const handleEnterParticipants = (id) => {
    navigate(`/teacher/contests/participants/${id}`);
  };

  return (
    <>
      <ActivityToggle />
      <div className="flex flex-col p-4">
        <div className="flex-1">
          <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
            <div className="mx-auto w-full max-w-7xl px-4 mb-0">
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="dark:text-Da\\\\ cursor-text py-1 font-poppins text-lg font-bold text-[#105E6A] dark:text-DarkManager sm:text-2xl">
                    {t("contests.title")}
                  </div>
                  <p className="mb-4 w-24 rounded-xl border-t-4 border-[#117C90] dark:border-DarkManager"></p>
                </div>
                <button
                  className="rounded-2xl bg-gradient-to-r from-[#105E6A] to-[#117C90] px-3 py-1 font-poppins text-xs text-white dark:to-DarkManager sm:px-4 sm:py-2 sm:text-sm"
                  onClick={handleAddActivity}
                >
                  {t("activitiest.AddContest")}
                </button>
              </div>

              <div className="overflow-x-auto ">
              <table className="min-w-full  mt-0 table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:border-DarkManager">
                <thead className="bg-[#117C90] text-white dark:bg-DarkManager">
                    <tr className="bg-[#105E6A] font-poppins text-xs text-white dark:bg-DarkManager sm:text-sm md:text-base">
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("contests.table.headers.title")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("contests.table.headers.teacher")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("contests.table.headers.subject")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("contests.table.headers.startDate")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("contests.table.headers.endDate")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("contests.table.headers.teamMembers")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("contests.table.headers.requirements")}
                      </th>
                      <th className={`border border-[#117C90] px-2 py-2 text-${isRTL ? 'right' : 'left'} sm:px-4`}>
                        {t("contests.table.headers.action")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                     {contests.length > 0 ? (
                    contests.map((item, index) => (
                      <tr
                        key={item._id}
                        className={`${
                          index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                        } hover:bg-[#117C90]/70 dark:hover:bg-DarkManager/70`}
                      >
                          <td className="border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-4">
                            {item.title}
                          </td>
                          <td className="border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-4">
                            {item.teacherId?.fullName || "N/A"}
                          </td>
                          <td className="border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-4">
                            {item.subjectId?.subjectName || "N/A"}
                          </td>
                          <td className="whitespace-nowrap border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-4">
                            {item.startDate
                              ? new Date(item.startDate)
                                  .toISOString()
                                  .split("T")[0]
                              : "N/A"}
                          </td>
                          <td className="whitespace-nowrap border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-4">
                            {item.endDate
                              ? new Date(item.endDate)
                                  .toISOString()
                                  .split("T")[0]
                              : "N/A"}
                          </td>
                          <td className="dark:border-DarkManagerpx-2 border border-[#117C90] py-2 dark:border-DarkManager sm:px-4">
                            {item.numberOfTeamMembers}
                          </td>
                          <td className="border border-[#117C90] px-2 py-2 dark:border-DarkManager sm:px-2">
                            {item.requirements}
                          </td>
                          <td className={`border border-[#117C90] px-2 py-2 text-center dark:border-DarkManager sm:px-4 ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                            <button
                              aria-label="Edit contest"
                              onClick={() => handleEdit(item._id)}
                              className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-DarkManager"
                            >
                              <i className="far fa-edit text-lg" />
                            </button>
                            <button
                              aria-label="Edit contest"
                              onClick={() =>
                                handleEnterParticipants(item._id)
                              }
                              className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-DarkManager"
                            >
                              <i className="far fa-chart-bar text-lg" />
                            </button>
                            <button
                              aria-label="Delete contest"
                              onClick={() => handleDelete(item._id)}
                              className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                            >
                              <i className="far fa-trash-alt text-lg" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="py-4 text-center font-poppins font-semibold text-gray-500"
                        >
                          No contests available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contests;
