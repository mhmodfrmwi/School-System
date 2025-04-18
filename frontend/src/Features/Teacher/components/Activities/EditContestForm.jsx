import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests, updateContest } from "../TeacherRedux/ContestSlice";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";
import { useTranslation } from "react-i18next";

function EditActivityForm() {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { contests, status } = useSelector((state) => state.contests);
  const { classTeachers = [] } = useSelector(
    (state) => state.classTeachers || {},
  );

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    numberOfTeamMembers: "",
    requirements: "",
    subjectName: "",
    className: "",
    gradeName: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContests());
    }
    dispatch(fetchClassTeacher());
  }, [dispatch, status]);

  useEffect(() => {
    const selectedContest = contests.find((contest) => contest._id === id);
    if (selectedContest) {
      setFormData({
        title: selectedContest.title || "",
        startDate: selectedContest.startDate.split("T")[0] || "",
        endDate: selectedContest.endDate.split("T")[0] || "",
        numberOfTeamMembers: selectedContest.numberOfTeamMembers || "",
        requirements: selectedContest.requirements || "",
        subjectName: selectedContest.subjectId?.subjectName || "",
        className: selectedContest.classId?.className || "",
        gradeName: selectedContest.gradeId?.gradeName || "",
      });
    }
  }, [id, contests]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContest({ contestId: id, updatedData: formData }));
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        {t("activitiest.EditContest")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-DarkManager2">
        <form onSubmit={handleSubmit} className="m-6">
          {/* Contest Title */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("contests.table.headers.title")} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Start Date */}
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                {t("contests.table.headers.startDate")}
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                {t("contests.table.headers.endDate")}
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>

            {/* Subject Name */}
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                {t("contests.table.headers.subject")}
              </label>
              <select
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              >
                <option value="">Select Subject</option>
                {classTeachers.map((classTeacher) => (
                  <option
                    key={classTeacher.id}
                    value={classTeacher.subjectName}
                  >
                    {classTeacher.subjectName}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Name */}
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                {t("attendans.Class")}
              </label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              >
                <option value="">Select Class</option>
                {classTeachers.map((classTeacher) => (
                  <option key={classTeacher.id} value={classTeacher.className}>
                    {classTeacher.className}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade Name */}
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                {t("examst.Grade")}
              </label>
              <select
                name="gradeName"
                value={formData.gradeName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              >
                <option value="">Select Grade</option>
                {classTeachers.map((classTeacher) => (
                  <option key={classTeacher.id} value={classTeacher.gradeName}>
                    {classTeacher.gradeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Team Members */}
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                {t("contests.table.headers.teamMembers")}
              </label>
              <input
                type="number"
                name="numberOfTeamMembers"
                value={formData.numberOfTeamMembers}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("contests.table.headers.requirements")}
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              {t("tablesheader.Update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditActivityForm;
