import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAcademicYear } from "../AdminRedux/academicYearSlice";
import { useTranslation } from 'react-i18next';
const EditAcademicYearForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const academicYears = useSelector(
    (state) => state.academicYears.academicYears,
  );
  const [formData, setFormData] = useState({
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    const academicYear = academicYears.find((year) => year._id === id);
    if (academicYear) {
      setFormData({
        startYear: academicYear.startYear,
        endYear: academicYear.endYear,
      });
    }
  }, [id, academicYears]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editAcademicYear({ id, updatedAcademicYear: formData }))
      .unwrap()
      .then(() => {
        navigate("/admin/allacademicyears");
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="mx-auto my-10 w-[80%] font-poppins">
        <h2 className="pl-5 text-2xl font-semibold text-[#244856]">
        {t('academicYear.editForm.title')}
        </h2>
        <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
        <div className="mx-auto rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-poppins text-gray-700 dark:text-white">
                {t('academicYear.form.labels.startYear')}
                </label>
                <input
                  type="number"
                  name="startYear"
                  value={formData.startYear}
                  onChange={handleChange}
                  className="w-full rounded-full border p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:text-white dark:placeholder-white"
                  placeholder={t('academicYear.form.placeholders.startYear')}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block font-poppins text-gray-700 dark:text-white">
                {t('academicYear.form.labels.endYear')}
                </label>
                <input
                  type="number"
                  name="endYear"
                  value={formData.endYear}
                  onChange={handleChange}
                  className="w-full rounded-full border p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:text-white dark:placeholder-white"
                  placeholder={t('academicYear.form.placeholders.endYear')}
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-[#117C90] px-6 py-3 text-white shadow-md hover:bg-[#043B44] dark:bg-white dark:text-black"
              >
                 {t('academicYear.form.buttons.update')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAcademicYearForm;
