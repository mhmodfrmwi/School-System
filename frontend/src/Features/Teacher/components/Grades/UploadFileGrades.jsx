import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileGrades } from "../TeacherRedux/examScoreSlice";
import { toast } from "react-toastify";
import Loader from "@/ui/Loader";
import { useTranslation } from 'react-i18next';

const UploadFileGrades = () => {
  const { classId, gradeSubjectSemesterId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.examScores);

  const [file, setFile] = useState(null);
  const [examType, setExamType] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await dispatch(
        uploadFileGrades({ classId, gradeSubjectSemesterId, formData }),
      ).unwrap();

      toast.success(response.message || "File uploaded successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to upload file.");
    }

    setFile(null);
  };

  const handleGetStudentsGrades = () => {
    if (!examType.trim()) {
      toast.error("Please enter an exam type.");
      return;
    }
    navigate(
      `/teacher/exam-results/${classId}/${gradeSubjectSemesterId}/${examType}`,
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto w-[90%] max-w-4xl font-poppins rounded-lg bg-white p-6 shadow-lg">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="font-poppins text-2xl font-bold text-[#117C90] dark:text-DarkManager">
          {t('gradest.Gradestudents')}
        </h1>
        <div className="mt-2 h-1 w-24 rounded-full bg-[#117C90] dark:bg-DarkManager"></div>
      </div>

      {/* File Upload Section */}
      <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-600 dark:text-DarkManager">
        {t('gradest.UploadGradesFile')}
        </h2>
        <label
          className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all ${
            file
              ? "border-green-500 bg-green-50 text-green-700"
              : "border-gray-300 bg-gray-100 text-gray-500 hover:border-[#117C90] hover:bg-gray-200"
          }`}
        >
          {file ? (
            <span className="text-center font-medium">{file.name}</span>
          ) : (
            <>
              <span className="text-center">{t('gradest.Choosefile')}</span>
              <span className="mt-2 text-sm text-gray-400">
                (Excel, CSV, or PDF)
              </span>
            </>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".xlsx, .xls, .csv, .pdf"
          />
        </label>
        <button
          onClick={handleUpload}
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#105E6A] to-[#117C90] dark:bg-gradient-to-r dark:from-DarkManager dark:to-DarkManager px-4 py-2 font-poppins font-semibold text-white transition hover:opacity-90"
        >
        {t('tablesheader.Upload')}

        </button>
      </div>

      {/* Get Students Grades Section */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-600 dark:text-DarkManager">
          {t('gradest.GetStudentsGrades')}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full rounded-lg border border-[#117C90] p-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#117C90]  dark:text-DarkManager dark:focus:ring-DarkManager"
          >
            <option value="">{t('gradest.Selectexamtype')}</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
          </select>
          <button
            onClick={handleGetStudentsGrades}
            className="w-full rounded-lg bg-gradient-to-r from-[#105E6A] to-[#117C90] dark:bg-gradient-to-r dark:from-DarkManager dark:to-DarkManager px-4 py-2 font-poppins font-semibold text-white transition hover:opacity-90"
          >
          {t('gradest.GetStudentsGrades')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFileGrades;