import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchTeachers, editTeacher } from "../AdminRedux/teacherSlice";
import { useTranslation } from 'react-i18next';
const EditTeacherForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects } = useSelector((state) => state.subject);
  const { teachers } = useSelector((state) => state.teachers);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    subject: "",
    password: "",
  });

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    const teacherToEdit = teachers.find((teacher) => teacher._id === id);
    if (teacherToEdit) {
      setFormData({
        fullName: teacherToEdit.fullName,
        dateOfBirth: teacherToEdit.dateOfBirth,
        gender: teacherToEdit.gender,
        address: teacherToEdit.address,
        phone: teacherToEdit.phone,
        email: teacherToEdit.email,
        subject: teacherToEdit.subjectId ? teacherToEdit.subjectId._id : "", // Set the subject _id here
        password: teacherToEdit.password,
      });
    }
  }, [teachers, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Find the subject object based on the selected subject ID
    const selectedSubject = subjects.find(
      (subject) => subject._id === formData.subject,
    );

    const updatedTeacher = {
      ...formData,
      subject: selectedSubject ? selectedSubject.subjectName : "", // Use subject name here
    };

    dispatch(editTeacher({ id, updatedTeacher }))
      .unwrap()
      .then(() => {
        navigate("/admin/allteachers");
      })
      .catch((error) => {
        console.error("Error updating teacher", error);
      });
  };

  return (
    <div className="mx-auto mt-10 w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
      {t("edit.teacher")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form onSubmit={handleSubmit} className="m-6">
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
            {t("formLabels.fullName")}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:text-white dark:placeholder-white"
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
            {t("formLabels.gender")}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="" className="dark:text-white" disabled>
              {t("genderOptions.select")}
              </option>
              <option value="M">{t("genderOptions.male")}</option>
              <option value="F">{t("genderOptions.female")}</option>
            </select>
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
            {t("formLabels.subject")}
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="" className="dark:text-white" disabled>
              {t("formLabels.subject")}
              </option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {t("placeholders.SaveChanges")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherForm;
