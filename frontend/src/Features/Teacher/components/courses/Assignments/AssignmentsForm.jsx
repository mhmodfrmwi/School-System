import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAssignment } from "../../TeacherRedux/AssignmentSlice";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const AssignmentForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { classId, gradeSubjectSemesterId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    total_marks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dueDate = new Date(formData.due_date);
    const currentDate = new Date();

    if (dueDate < currentDate) {
      toast.error("Due date cannot be in the past.");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const created_by = decodedToken.id;
    const payload = {
      ...formData,
      created_by,
    };

    dispatch(createAssignment({ gradeSubjectSemesterId, classId, ...payload }))
      .unwrap()
      .then(() => {
        setFormData({
          title: "",
          description: "",
          due_date: "",
          total_marks: "",
        });
      })
      .catch((error) => {
        toast.error(error || "Failed to create assignment.");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          {t("assignmentt.UploadAssignment")}
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[240px]"></div>
      </div>

      <div className="mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md dark:bg-DarkManager2">
        <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
          <div>
            <label className="block font-medium">
              {t("tablesheader.Title")}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium">
              {t("tablesheader.Description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium">{t("assignmentt.Due")}</label>
            <input
              type="datetime-local"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium">
              {t("assignmentt.Marks")}
            </label>
            <input
              type="number"
              name="total_marks"
              value={formData.total_marks}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <button
            type="submit"
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {t("tablesheader.Upload")}
          </button>
        </form>
      </div>
    </>
  );
};

export default AssignmentForm;
