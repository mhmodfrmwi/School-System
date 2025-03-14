import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileGrades } from "../TeacherRedux/examScoreSlice";
import { toast } from "react-toastify";
import Loader from "@/ui/Loader";

const UploadFileGrades = () => {
  const { classId, gradeSubjectSemesterId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-[90%]">
      <div className="mb-8 flex flex-col">
        <h1 className="font-poppins text-lg font-semibold text-[#117C90] sm:text-xl lg:text-2xl">
          Grades For Students
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#117C90] lg:h-[4px] lg:w-[140px]"></div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <label
          className={`w-64 cursor-pointer rounded-lg border-2 border-dashed p-3 text-center transition-all ${
            file
              ? "border-green-500 bg-green-100 text-green-700"
              : "border-gray-400 bg-gray-100 text-gray-500"
          }`}
        >
          {file ? file.name : "Choose a file"}
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={handleUpload}
          className="rounded-lg bg-gradient-to-r from-[#105E6A] to-[#117C90] px-4 py-2 font-poppins text-white transition hover:opacity-90"
        >
          Upload File
        </button>

        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full rounded-lg border border-[#117C90] p-2 text-center font-poppins focus:outline-none focus:ring-2 focus:ring-[#117C90]"
          >
            <option value="">Select exam type</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
          </select>

          <button
            onClick={handleGetStudentsGrades}
            className="rounded-lg bg-gradient-to-r from-[#105E6A] to-[#117C90] px-4 py-2 font-poppins text-white transition hover:opacity-90"
          >
            Get Students Grades
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFileGrades;