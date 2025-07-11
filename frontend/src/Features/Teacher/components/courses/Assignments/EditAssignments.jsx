import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  editAssignment,
  fetchAssignments,
} from "../../TeacherRedux/AssignmentSlice";
import { useTranslation } from "react-i18next";

const EditAssignment = () => {
  const { assignmentId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { assignment } = useSelector((state) => state.assignmentsTeacher);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    total_marks: "",
  });

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  useEffect(() => {
    if (assignment.length > 0) {
      const selectedAssignment = assignment.find((a) => a._id === assignmentId);
      if (selectedAssignment) {
        setFormData({
          title: selectedAssignment.title,
          description: selectedAssignment.description,
          due_date: new Date(selectedAssignment.due_date)
            .toISOString()
            .slice(0, 16),
          total_marks: selectedAssignment.total_marks,
        });
      }
    }
  }, [assignment, assignmentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate due date is in the future
    const dueDate = new Date(formData.due_date);
    const now = new Date();
    
    if (dueDate <= now) {
      toast.error("Please choose a future date and time");
      return;
    }

    dispatch(editAssignment({ assignmentId, updatedData: formData }))
      .unwrap()
      .then(() => {
        toast.success("Assignment updated successfully!");
        navigate(-1);
      })
      .catch((error) => {
        toast.error(error || "Failed to update assignment");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          {t("assignmentt.UpdateAssignment")}
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
            <label className="block font-medium">{t("assignmentt.Due")} </label>
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
            {t("tablesheader.Update")}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditAssignment;