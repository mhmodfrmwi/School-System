import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postPdfMaterial } from "../TeacherRedux/PdfMaterialSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const MaterialForm = () => {
  const dispatch = useDispatch();
  const { classId, gradeSubjectSemesterId } = useParams();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "PDF",
    fileUrl: "",
    class_id: classId,
    grade_subject_semester_id: gradeSubjectSemesterId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.type !== "Link" && !formData.fileUrl) {
      toast.error("File URL is required for this type");
      return;
    }
    console.log("Form Data:", formData);

    dispatch(postPdfMaterial(formData))
      .unwrap()
      .then(() => {
        setFormData({
          title: "",
          description: "",
          type: "PDF",
          fileUrl: "",
          class_id: classId,
          grade_subject_semester_id: gradeSubjectSemesterId,
        });
        toast.success("Material uploaded successfully!");
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          {t("tablesheader.UploadMaterial")}
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[190px]"></div>
      </div>
      <div className="mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md dark:bg-DarkManager2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.Title")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.Description")}{" "}
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.Type")}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
            >
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
            </select>
          </div>
          {formData.type !== "Link" && (
            <div>
              <label className="block font-poppins font-medium dark:text-white">
                {t("tablesheader.FileUrl")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {t("tablesheader.Upload")}
          </button>
        </form>
      </div>
    </>
  );
};

export default MaterialForm;
