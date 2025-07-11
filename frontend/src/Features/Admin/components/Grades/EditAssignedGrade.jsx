import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAssignedGrades,
  editAssignedGrade,
} from "../AdminRedux/AssignGradeSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
const EditAssignedGrade = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assignedGrades } = useSelector((state) => state.assignGrade);
  const { grades } = useSelector((state) => state.grades);
  const { academicYears } = useSelector((state) => state.academicYears);

  const [formData, setFormData] = useState({ gradeId: "", academicYear: "" });

  useEffect(() => {
    dispatch(fetchAssignedGrades());
    dispatch(fetchGrades());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  useEffect(() => {
    const selectedGrade = assignedGrades.find((grade) => grade._id === id);
    if (selectedGrade) {
      setFormData({
        gradeId: selectedGrade.gradeId?._id || "",
        academicYear: selectedGrade.academicYear_id?._id || "",
      });
    }
  }, [assignedGrades, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.gradeId || !formData.academicYear) {
      toast.error(t("grade.form.messages.error"));
      return;
    }

    // Find the selected grade and academic year
    const selectedGrade = grades.find(
      (grade) => grade._id === formData.gradeId,
    );
    const selectedYear = academicYears.find(
      (year) => year._id === formData.academicYear,
    );

    // Validate selections
    if (!selectedGrade || !selectedYear) {
      toast.error(t(t("grade.table.error")));
      return;
    }

    // Prepare the data to be sent
    const updatedData = {
      gradeName: selectedGrade.gradeName, // Use the gradeName from the selected grade
      academicYear: `${selectedYear.startYear}-${selectedYear.endYear}`, // Format the academic year
    };

    // Dispatch the editAssignedGrade action
    dispatch(editAssignedGrade({ id, updatedGrade: updatedData }))
      .unwrap()
      .then(() => {
        navigate(-1); // Navigate back after successful update
      })
      .catch((error) => {});
  };
  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
      {t("grade.form.editAssignTitle")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] dark:bg-[#117C90]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Grade Dropdown */}
          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("grade.form.fields.selectGrade")}
            </label>
            <select
              name="gradeId"
              value={formData.gradeId}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">{t("grade.form.placeholders.selectGrade")}</option>
              {grades.map((grade) => (
                <option key={grade._id} value={grade._id}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year Dropdown */}
          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("grade.form.fields.academicYear")}
            </label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">{t("grade.form.placeholders.selectYear")}</option>
              {academicYears.map((year) => (
                <option key={year._id} value={year._id}>
                  {year.startYear} - {year.endYear}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              {t("grade.form.buttons.update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssignedGrade;
