import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSubmissionGrade } from "../../TeacherRedux/AssignmentSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditGradeModal = ({
  isOpen,
  onClose,
  submissionId,
  currentGrade,
  totalMarks,
}) => {
  const [grade, setGrade] = useState(currentGrade || "");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (grade && !isNaN(grade)) {
      if (parseFloat(grade) > totalMarks) {
        toast.error("Grade cannot exceed the total marks of the assignment");
        return;
      }
      dispatch(updateSubmissionGrade({ submissionId, grade }))
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update grade");
        });
    } else {
      toast.error("Please enter a valid grade.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-DarkManager2">
        <h2 className="mb-4 text-lg font-semibold text-[#244856] dark:text-white">
          {t("assignmentt.EditGrade")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">
              {t("assignmentt.Grade")}
            </label>
            <input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400 dark:bg-white dark:text-black"
            >
              {t("assignmentt.Cancel")}
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#117C90] px-4 py-2 text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              {t("assignmentt.Save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGradeModal;
