import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postTeacherLibrary } from "../TeacherRedux/teacherLibrarySlice";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";
import { useTranslation } from "react-i18next";

function LibraryForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { classTeachers = [] } = useSelector(
    (state) => state.classTeachers || {},
  );

  const [formData, setFormData] = useState({
    title: "",
    itemUrl: "",
    description: "",
    type: "",
    gradeSubjectSemesterId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    dispatch(fetchClassTeacher());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.itemUrl ||
      !formData.description ||
      !formData.type ||
      !formData.gradeSubjectSemesterId
    ) {
      toast.error(t("libraryItem.fillAllFields"));
      return;
    }

    try {
      await dispatch(postTeacherLibrary(formData));
      setFormData({
        title: "",
        itemUrl: "",
        description: "",
        type: "",
        gradeSubjectSemesterId: "",
      });
      toast.success(t("libraryItem.addSuccess"));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("libraryItem.addFailed");
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto mb-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856] dark:text-DarkManager">
        {t("libraryt.AddLibraryItem")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[150px] rounded-t-md bg-[#244856] dark:bg-DarkManager"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-DarkManager2">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("libraryVideos.subjectsTitle")}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:border-DarkManager dark:text-DarkManager dark:focus:ring-DarkManager"
              placeholder={t("libraryItem.enterTitle")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("tablesheader.FileUrl")}
            </label>
            <input
              type="url"
              name="itemUrl"
              value={formData.itemUrl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:border-DarkManager dark:bg-white dark:text-DarkManager dark:focus:ring-DarkManager"
              placeholder={t("libraryItem.enterUrl")}
              required
            />
          </div>

          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("libraryItem.description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:border-DarkManager dark:bg-white dark:text-DarkManager dark:focus:ring-DarkManager"
              placeholder={t("libraryItem.enterDescription")}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("libraryItem.type")}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:border-DarkManager dark:bg-white dark:text-DarkManager dark:focus:ring-DarkManager"
            >
              <option value="">{t("libraryItem.selectType")}</option>
              <option value="PDF">{t("libraryItem.pdf")}</option>
              <option value="Video">{t("libraryItem.video")}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("libraryItem.gradeSubjectSemester")}
            </label>
            <select
              name="gradeSubjectSemesterId"
              value={formData.gradeSubjectSemesterId}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:border-DarkManager dark:bg-white dark:text-DarkManager dark:focus:ring-DarkManager"
              required
            >
              <option value="">{t("libraryItem.selectId")}</option>
              {classTeachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {`${teacher.gradeName} - ${teacher.subjectName} - ${teacher.semesterName}`}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 mt-4 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-gradient-to-r from-[#105E6A] to-[#117C90] px-6 py-2 font-medium text-white transition hover:opacity-90 dark:from-DarkManager dark:to-DarkManager"
            >
              {t("tablesheader.Upload")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LibraryForm;
