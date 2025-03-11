import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFile, uploadFileGrades } from "../TeacherRedux/examScoreSlice";
import { toast } from "react-toastify";
import Loader from "@/ui/Loader";

const UploadFileGrades = () => {
  const { classId, gradeSubjectSemesterId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadedFile, loading } = useSelector((state) => state.examScores);

  const scoreId = uploadedFile?.data?.subjectScore?._id;

  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Select a file");
    } else {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = dispatch(
          uploadFileGrades({ classId, gradeSubjectSemesterId, formData }),
        ).unwrap();

        toast.success(response.message || "File uploaded successfully!");
      } catch (err) {
        toast.error(err);
      }
      setFile("");
    }
  };

  const handleGetStudentsGrades = () => {
    if (scoreId) {
      navigate(`/teacher/exam-results/${scoreId}/${classId}`);
    } else {
      toast.error("No score ID available. Please upload a file first.");
    }
  };
  const handleRemoveFile = () => {
    if (scoreId) {
      dispatch(removeFile({ scoreId, classId }));
    } else {
      toast.error("No score ID available. Please upload a file first.");
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="rounded-lg p-4">
        <div className="mb-8 flex flex-col">
          <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
            Grades For Students
          </h1>
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            onClick={handleUpload}
            className="rounded bg-[#244856] p-2 text-lg text-white"
          >
            Upload File
          </button>

          <button
            onClick={handleRemoveFile}
            className="rounded bg-[#244856] p-2 text-lg text-white"
          >
            Remove File
          </button>

          <button
            onClick={handleGetStudentsGrades}
            className="rounded bg-[#244856] p-2 text-lg text-white"
          >
            Get Students Grades
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadFileGrades;
