import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAssignedSubjects, updateAssignedSubject } from "../AdminRedux/AssignSubjectSlice";  
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchSemesters } from "../AdminRedux/AssignSubjectSlice";  
import { toast } from "react-toastify";

const EditAssignedSubject = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  
  const [gradeName, setGradeName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [academicYear, setAcademicYear] = useState("");  
  const [semesterName, setSemesterName] = useState("");  

  const dispatch = useDispatch();
  const { assignedSubjects } = useSelector((state) => state.assignSubject);
  const { grade } = useSelector((state) => state.grades);
  const { subjects } = useSelector((state) => state.subject);
  const { semesters } = useSelector((state) => state.assignSubject);

  useEffect(() => {
    // Fetch the required data when the page loads
    dispatch(fetchAssignedSubjects());
    dispatch(fetchGrades());
    dispatch(fetchSubjects());
    dispatch(fetchSemesters());
  }, [dispatch]);

  useEffect(() => {
    // Find the subject by ID and set the form fields with the current data
    const subject = assignedSubjects.find((subject) => subject._id === id);
    if (subject) {
      const gradeObject = grade.find((g) => g._id === subject.grade);
      setGradeName(gradeObject ? gradeObject.gradeName : "");
      setSubjectName(subject.subject || "");
      setSemesterName(subject.term || "");

      // Set the academic year based on the selected semester
      const selectedSemester = semesters.find(semester => semester.semesterName === subject.term);
      if (selectedSemester) {
        setAcademicYear(selectedSemester.academicYear_id?.startYear?.toString() || "");
      }
    }
  }, [assignedSubjects, id, grade, semesters]);

  const handleUpdateSubject = (e) => {
    e.preventDefault();

    if (!gradeName || !subjectName || !academicYear || !semesterName) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedData = { gradeName, subjectName, academicYear, semesterName };

    dispatch(updateAssignedSubject({ id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Subject updated successfully!");
        navigate(-1);
        // navigate("/admin/allsubjects");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update subject");
      });
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = semesters.find(semester => semester.semesterName === e.target.value);
    setSemesterName(e.target.value);
    setAcademicYear(selectedSemester?.academicYear_id?.startYear?.toString() || ""); 
  };

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Assigned Subject</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleUpdateSubject} className="m-6">
          {/* Subject Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Grade
            </label>
            <select
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Semester
            </label>
            <select
              value={semesterName}
              onChange={handleSemesterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
          <button
            type="submit"
            className="px-6 py-2 bg-[#117C90] text-white rounded-md text-sm font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            Update Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAssignedSubject;
