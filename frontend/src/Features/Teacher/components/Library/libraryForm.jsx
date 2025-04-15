import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postTeacherLibrary } from "../TeacherRedux/teacherLibrarySlice";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";
import { useTranslation } from 'react-i18next';

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
      !formData.gradeSubjectSemesterId
    ) {
      alert("Please fill in all the fields.");
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
      toast.success("Library item added successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto mb-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        {t('libraryt.AddLibraryItem')}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[150px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
            {t('libraryVideos.subjectsTitle')}

            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              {t('tablesheader.FileUrl')}
            </label>
            <input
              type="url"
              name="itemUrl"
              value={formData.itemUrl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter item URL"
              required
            />
          </div>

          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700">
            {t('libraryItem.description')}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
            {t('libraryItem.type')}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Type</option>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Grade Subject Semester ID
            </label>

            <select
              name="gradeSubjectSemesterId"
              value={formData.gradeSubjectSemesterId}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="">Select ID</option>
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
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
            {t('tablesheader.Upload')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LibraryForm;
