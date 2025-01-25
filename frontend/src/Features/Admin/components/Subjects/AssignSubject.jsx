import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { assignSubject } from "../AdminRedux/AssignSubjectSlice"; 
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchSemesters } from "../AdminRedux/AssignSubjectSlice";  // Import the fetchSemesters action

function AssignSubject() {
  const [gradeName, setGradeName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [academicYear, setAcademicYear] = useState("");  
  const [semesterName, setSemesterName] = useState("");  

  const dispatch = useDispatch();
  const { loading, semesters } = useSelector((state) => state.assignSubject);  // Get semesters from Redux store

  // Fetch grades, subjects, and semesters from Redux store
  const { grade } = useSelector((state) => state.grades);
  const { subjects } = useSelector((state) => state.subject);
  
  useEffect(() => {
    // Dispatch actions to fetch data
    dispatch(fetchGrades());
    dispatch(fetchSubjects());
    dispatch(fetchSemesters());  // Dispatch fetchSemesters
  }, [dispatch]);

  const handleAssignSubject = (e) => {
    e.preventDefault();

    if (!gradeName || !subjectName || !academicYear || !semesterName) {
      toast.error("Please fill in all fields");
      return;
    }

    const subjectData = { gradeName, subjectName, academicYear, semesterName };

    dispatch(assignSubject(subjectData))  
      .unwrap()
      .then(() => {
        setGradeName("");
        setSubjectName("");
        setAcademicYear("");
        setSemesterName("");  
      });
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = semesters.find(semester => semester.semesterName === e.target.value);
    setSemesterName(e.target.value);
    setAcademicYear(selectedSemester?.academicYear_id?.startYear?.toString());
  };

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Assign Subject</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleAssignSubject} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          {/* Subject Dropdown */}
          <div className="mb-4 sm:col-span-2">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.subjectName}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Dropdown */}
          <div className="mb-4 sm:col-span-2">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Select Grade
            </label>
            <select
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Grade --</option>
              {grade.map((grade, index) => (
                <option key={index} value={grade.gradeName}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="mb-4 sm:col-span-2">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Select Semester
            </label>
            <select
              value={semesterName}
              onChange={handleSemesterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Semester --</option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester.semesterName}>
                  {semester.semesterName}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden Academic Year Input */}
          <input
            type="hidden"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          />

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
              disabled={loading}
            >
              {loading ? "Loading..." : "Assign Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignSubject;
