import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { postStudent } from "../AdminRedux/studentSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { toast } from "react-toastify";

function AddStudent() {
  const dispatch = useDispatch();
  const { grades } = useSelector((state) => state.grades);

  const [studentData, setStudentData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    grade: "",
    address: "",
  });

  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    dispatch(postStudent(studentData))
      .unwrap()
      .then(() => {
        toast.success("Student added successfully!");
        setStudentData({
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          password: "",
          dateOfBirth: "",
          gender: "",
          grade: "",
          address: "",
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(parsedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBulkUpload = async () => {
    if (excelData.length === 0) {
      toast.error("No data found in the uploaded file.");
      return;
    }

    let successCount = 0;
    let failedStudents = [];

    for (const student of excelData) {
      try {
        await dispatch(postStudent(student)).unwrap();
        successCount++;
      } catch (error) {
        failedStudents.push(student.fullName);
      }
    }

    if (successCount > 0 && failedStudents.length > 0) {
      toast.info(
        `${successCount} students added successfully. Waiting for ${failedStudents.length} students to be added.`,
      );
    } else if (successCount > 0) {
      toast.success(`${successCount} students added successfully!`);
    }

    if (failedStudents.length > 0) {
      toast.error(
        `Failed to add the following students: ${failedStudents.join(", ")}`,
      );
    }
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Add Student
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[160px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleAddStudent}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {Object.keys(studentData).map((key) => (
            <div className="mb-4" key={key}>
              <label className="text-md mb-2 block font-medium capitalize text-gray-700 dark:text-white">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {key === "gender" ? (
                <select
                  name={key}
                  value={studentData[key]}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              ) : key === "grade" ? (
                <select
                  name={key}
                  value={studentData[key]}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90]"
                >
                  <option value=""> Select Grade </option>
                  {grades.map((g, index) => (
                    <option key={index} value={g.gradeName}>
                      {g.gradeName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={
                    key === "password"
                      ? "password"
                      : key === "dateOfBirth"
                        ? "date"
                        : "text"
                  }
                  name={key}
                  value={studentData[key]}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:text-white dark:placeholder-white"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                />
              )}
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              Add Student
            </button>
          </div>
        </form>

        {/* Excel Upload Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Upload Excel File
          </h2>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="mt-2 block w-full"
          />
          <button
            onClick={handleBulkUpload}
            className="text-md mx-auto mt-4 block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            Upload Students
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
