import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { assignSubject } from "../AdminRedux/AssignSubjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchSemesters } from "../AdminRedux/AssignSubjectSlice";

function AssignSubject() {
  const [gradeName, setGradeName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semesterName, setSemesterName] = useState("");

  const dispatch = useDispatch();
  const { loading, semesters } = useSelector((state) => state.assignSubject);
  const { grade } = useSelector((state) => state.grades);
  const { subjects } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(fetchGrades());
    dispatch(fetchSubjects());
    dispatch(fetchSemesters());
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
    const selectedSemester = semesters.find((semester) => {
      return (
        `${semester.semesterName}, ${semester.academicYear_id.startYear}-${semester.academicYear_id.endYear}` ===
        e.target.value
      );
    });
    if (selectedSemester) {
      setSemesterName(selectedSemester.semesterName);
      setAcademicYear(
        `${selectedSemester.academicYear_id.startYear}-${selectedSemester.academicYear_id.endYear}`,
      );
    }
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Assign Subject
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleAssignSubject}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Subject Dropdown */}
          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700">
              Select Subject
            </label>
            <select
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
            <label className="text-md mb-2 block font-medium text-gray-700">
              Select Grade
            </label>
            <select
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Grade --</option>
              {grade?.map((grade, index) => (
                <option key={index} value={grade.gradeName}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Select Semester
            </label>
            <select
              value={`${semesterName}, ${academicYear}`}
              onChange={handleSemesterChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Semester --</option>
              {semesters.map((semester, index) => (
                <option
                  key={index}
                  value={`${semester.semesterName}, ${semester.academicYear_id.startYear}-${semester.academicYear_id.endYear}`}
                >
                  {semester.semesterName}, {semester.academicYear_id.startYear}-
                  {semester.academicYear_id.endYear}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
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
