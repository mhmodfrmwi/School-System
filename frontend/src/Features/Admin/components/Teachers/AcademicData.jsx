import React, { useState } from "react";
import { toast } from "react-toastify";

function AcademicData() {
  const [academicData, setAcademicData] = useState({
    className: "",
    subjectName: "",
    teacherName: "",
    academicYear: "",
  });

  // Static class options
  const classOptions = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
  ];

  // Static subject options
  const subjectOptions = [
    "Math",
    "Science",
    "English",
    "History",
    "Geography",
  ];

  // Static teacher options
  const teacherOptions = [
    "Mr. John Doe",
    "Ms. Jane Smith",
    "Dr. Michael Brown",
    "Mrs. Emily Davis",
    "Mr. William Taylor",
  ];

  // Static academic year options
  const academicYearOptions = [
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027",
    "2027-2028",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicData({ ...academicData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Execute the required action when submitting
    toast.success("Academic data submitted successfully!");
    console.log(academicData);
  };

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Academic Data</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          {/* Select Class - Static options */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Class</label>
            <select
              name="className"
              value={academicData.className}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Class</option>
              {classOptions.map((cls, index) => (
                <option key={index} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Select Subject - Static options */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Subject</label>
            <select
              name="subjectName"
              value={academicData.subjectName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Select Teacher - Static options */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Teacher</label>
            <select
              name="teacherName"
              value={academicData.teacherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Teacher</option>
              {teacherOptions.map((teacher, index) => (
                <option key={index} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year - Static options */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Academic Year</label>
            <select
              name="academicYear"
              value={academicData.academicYear}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Academic Year</option>
              {academicYearOptions.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
            >
              Submit Academic Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcademicData;
