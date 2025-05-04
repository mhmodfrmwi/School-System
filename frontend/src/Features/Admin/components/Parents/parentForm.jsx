import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postParent } from "../AdminRedux/parentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { fetchStudents } from "../AdminRedux/studentSlice";
import { useTranslation } from "react-i18next";

function ParentForm() {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    students: [""], // Initialize with one empty student
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStudentChange = (index, e) => {
    const { value } = e.target;
    const updatedStudents = [...formData.students];
    updatedStudents[index] = value;
    setFormData({ ...formData, students: updatedStudents });
  };

  const addStudent = () => {
    setFormData((prevState) => ({
      ...prevState,
      students: [...prevState.students, ""],
    }));
  };

  const removeStudent = (index) => {
    if (formData.students.length <= 1) return; // Don't remove the last student
    const updatedStudents = formData.students.filter((_, i) => i !== index);
    setFormData({ ...formData, students: updatedStudents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postParent(formData))
      .unwrap()
      .then(() => {
        setFormData({
          fullName: "",
          email: "",
          password: "",
          phone: "",
          gender: "",
          students: [""], // Reset to one empty student
        });
      })
      .catch((error) => {});
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        {t("parentHeader.add")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.fullName")}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.fullName")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.email")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.password")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.phoneNumber")}
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.phoneNumber")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.gender")}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            >
              <option value="">{t("genderOptions.select")}</option>
              <option value="M">{t("genderOptions.male")}</option>
              <option value="F">{t("genderOptions.female")}</option>
            </select>
          </div>

          {formData.students.map((student, index) => (
            <div key={index} className="relative mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                {t("formLabels.StudentName")} {index + 1}
              </label>
              <div className="flex items-center">
                <select
                  value={student}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="z-10 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                  required
                >
                  <option value="">{t("formLabels.SelectStudentID")}</option>
                  {students.map((AN, i) => (
                    <option key={i} value={AN.academic_number}>
                      {AN.fullName} ({AN.academic_number})
                    </option>
                  ))}
                </select>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeStudent(index)}
                    className="ml-2 rounded-full p-2 text-red-500 hover:bg-red-100"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2">
            <button
              type="button"
              onClick={addStudent}
              className="mt-2 flex items-center font-semibold text-[#117C90] dark:text-white"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              {t("studentHeader.add")}
            </button>
          </div>

          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              {t("parentHeader.add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParentForm;
