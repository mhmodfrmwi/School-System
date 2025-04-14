import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postPdfMaterial } from "../TeacherRedux/PdfMaterialSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

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
    }));}

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
      <div className="flex flex-col w-[80%] mx-auto px-4 md:px-6 lg:px-0">
        <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          {t('tablesheader.UploadMaterial')}
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[190px]"></div>
      </div>
      <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-poppins font-medium">
            {t('tablesheader.Title')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">{t('tablesheader.Description')} </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">{t('tablesheader.Type')}</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full font-poppins px-4 py-2 border text-gray-600 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
            </select>
          </div>
          {formData.type !== "Link" && (
            <div>
              <label className="block font-poppins font-medium">
              {t('tablesheader.FileUrl')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fileUrl" 
                value={formData.fileUrl}
                onChange={handleChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-[#117C90] text-white font-poppins rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            {t('tablesheader.Upload')}
          </button>
        </form>
      </div>
    </>
  );
};

export default MaterialForm;
