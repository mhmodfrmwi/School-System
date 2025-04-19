import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editGrade, fetchGrades } from "../AdminRedux/gradeSlice";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
const EditGradeForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { grades } = useSelector((state) => state.grades);

  const [formData, setFormData] = useState({
    gradeName: "",
  });

  // Fetch grades when the component loads
  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  // Set the form data if the grade is found
  useEffect(() => {
    const selectedGrade = grades.find((grade) => grade._id === id);
    if (selectedGrade) {
      setFormData({
        gradeName: selectedGrade.gradeName,
      });
    }
  }, [grades, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGrade = { gradeName: formData.gradeName };

    dispatch(editGrade({ id, updatedGrade }))
      .unwrap()
      .then(() => {
        toast.success(t("grade.form.messages.successUpdate"));
        navigate("/admin/allgrades");
      })
      .catch((error) => {});
  };

  return (
    <div className="mx-auto mt-10 w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">{t("grade.form.editTitle")}</h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form onSubmit={handleSubmit} className="m-6">
          <>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
              {t("grade.form.fields.enterName")}
              </label>
              <input
                type="text"
                name="gradeName"
                value={formData.gradeName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                placeholder={t("grade.form.placeholders.enterName")}
              />
            </div>
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
               {t("grade.form.buttons.save")}
            </button>
          </>
        </form>
      </div>
    </div>
  );
};

export default EditGradeForm;
