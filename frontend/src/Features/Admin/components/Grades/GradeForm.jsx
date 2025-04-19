import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postGrade } from "../AdminRedux/gradeSlice";
import GradeToggle from "./SelectPage";
import { useTranslation } from 'react-i18next';
function GradeForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    gradeName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postGrade(formData))
      .unwrap()
      .then(() => {
        setFormData({ gradeName: "" });
      })
      .catch((error) => {
        // Optionally handle error here (e.g., show a toast message)
      });
  };

  return (
    <>
      <GradeToggle />
      <div className="mx-auto my-10 w-[80%] font-poppins">
        <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        {t("grade.form.addTitle")}
        </h1>
        <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
        <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
          <form
            onSubmit={handleSubmit}
            className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {/* Grade Name */}
            <div className="mb-4 sm:col-span-2">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("grade.form.fields.enterName")}
              </label>
              <input
                type="text"
                name="gradeName"
                value={formData.gradeName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                placeholder={t("grade.form.placeholders.enterName")}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 mt-6 sm:col-span-2">
              <button
                type="submit"
                className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
              >
                 {t("grade.form.buttons.add")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default GradeForm;
