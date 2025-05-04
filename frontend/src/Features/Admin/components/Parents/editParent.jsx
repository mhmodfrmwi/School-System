import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editParentAsync, fetchParents } from "../AdminRedux/parentSlice";
import { fetchStudents } from "../AdminRedux/studentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const EditParentForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { parents } = useSelector((state) => state.parents);
  const { students } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    students: [],
  });

  useEffect(() => {
    dispatch(fetchParents());
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    const parent = parents.find((parent) => parent._id === id);
    if (parent) {
      setFormData({
        fullName: parent.fullName,
        email: parent.email,
        phone: parent.phone,
        password: parent.password,
        gender: parent.gender,
        students: parent.parentStudents?.map((ps) => ps.student_id._id) || [],
      });
    }
  }, [id, parents]);

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
    if (formData.students.length <= 1) return;
    const updatedStudents = formData.students.filter((_, i) => i !== index);
    setFormData({ ...formData, students: updatedStudents });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      students: formData.students.filter((id) => id !== ""), // Remove empty selections
    };

    dispatch(editParentAsync({ id, updatedParent: updatedData }))
      .unwrap()
      .then(() => {
        navigate("/admin/allparents");
      })
      .catch((error) => {});
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <div className="mb-6">
        <h2 className="font-poppins text-2xl font-semibold text-[#244856]">
          {t("edit.parent")}
        </h2>
        <div className="mt-1 h-[4px] w-[155px] rounded-t-md bg-[#244856]"></div>
      </div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Personal Information */}
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700 dark:text-white">
              {t("formLabels.fullName")}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700 dark:text-white">
              {t("formLabels.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700 dark:text-white">
              {t("formLabels.phoneNumber")}
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700 dark:text-white">
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

          {/* Password Field */}
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700 dark:text-white">
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

          {/* Children/Students Section */}
          <div className="col-span-1 sm:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-[#244856] dark:text-white">
              {t("tableHeaders.children")}
            </h3>

            {formData.students.map((studentId, index) => (
              <div key={index} className="mb-4 flex items-center">
                <select
                  value={studentId}
                  onChange={(e) => handleStudentChange(index, e)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                  required={index === 0} // First student is required
                >
                  <option value="">{t("formLabels.SelectStudentID")}</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.fullName} ({student.academic_number})
                    </option>
                  ))}
                </select>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeStudent(index)}
                    className="ml-2 rounded-full p-2 text-[#117C90] hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addStudent}
              className="mt-2 flex items-center font-semibold text-[#117C90] dark:text-white"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              {t("studentHeader.add")}
            </button>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 flex justify-end gap-4 sm:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              {t("placeholders.SaveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditParentForm;
