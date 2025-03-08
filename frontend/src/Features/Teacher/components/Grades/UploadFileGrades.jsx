import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uploadFileGrades } from "../TeacherRedux/examScoreSlice";
import { toast } from "react-toastify";

const UploadFileGrades = () => {
  const { classId, gradeSubjectSemesterId } = useParams();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Select the file");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadFileGrades({ classId, gradeSubjectSemesterId, formData }));
    }
  };

  //   const handleRemoveFile = () => {
  //     dispatch(removeFile({ classId, gradeSubjectSemesterId }));
  //   };

  return (
    <div className="rounded-lg p-4">
      <div className="mb-8 flex flex-col">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Upload or Remove File
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

      <div className="ms-10 mt-10 grid grid-cols-1 gap-8 sm:ms-0 sm:grid-cols-2">
        <div className="">
          <button
            onClick={handleUpload}
            className="rounded bg-[#244856] p-2 text-lg text-white"
          >
            Upload File
          </button>
        </div>

        <button
          //   onClick={handleRemoveFile}
          className="w-52 rounded bg-[#244856] p-2 text-lg text-white sm:ms-auto"
        >
          Remove File
        </button>
      </div>
    </div>
  );
};

export default UploadFileGrades;
