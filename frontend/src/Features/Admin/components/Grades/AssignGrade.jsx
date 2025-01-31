import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice";
import { assignGrade } from "../AdminRedux/AssignGradeSlice";
import GradeToggle from "./SelectPage";

function AssignGrade() {
  const [gradeName, setGradeName] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const dispatch = useDispatch();

  const { grades, loading: gradeLoading, error: gradeError } = useSelector((state) => state.grades);
  const { academicYears, loading: yearLoading, error: yearError } = useSelector((state) => state.academicYears);

  useEffect(() => {
    dispatch(fetchGrades());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  const handleAssignGrade = (e) => {
    e.preventDefault();

    if (!gradeName || !academicYear) {
      toast.error("Please select a grade and academic year");
      return;
    }

    const gradeData = { gradeName, academicYear };

    dispatch(assignGrade(gradeData))
      .unwrap()
      .then(() => {
        setGradeName("");
        setAcademicYear("");
      });
  };

  return (
    <>
    <GradeToggle/>
    <div className="w-[80%] mx-auto">
    <h2 className="text-2xl font-poppins text-[#244856] ">
           Grade Mangement
        </h2>
        <p className="mt-1 h-[4px] w-[230px] rounded-t-md bg-[#244856] "></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleAssignGrade}>
          {/* Grade Selection */}
          <div className="mt-4">
            <label className="block mb-2 font-poppins text-gray-700">
              Select Grade
            </label>
            <select
              name="grade"
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>Select Grade</option>
              {gradeLoading ? (
                <option>Loading grades...</option>
              ) : gradeError ? (
                <option>Error loading grades</option>
              ) : (
                grades.map((gradeItem) => (
                  <option key={gradeItem._id} value={gradeItem.gradeName}>
                    {gradeItem.gradeName}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Academic Year Selection */}
          <div className="mt-4">
            <label className="block mb-2 font-poppins text-gray-700">
              Select Academic Year
            </label>
            <select
              name="year"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>Select Academic Year</option>
              {yearLoading ? (
                <option>Loading academic years...</option>
              ) : yearError ? (
                <option>Error loading academic years</option>
              ) : (
                academicYears.map((year) => (
                  <option key={year.id} value={year.yearName}>
                    {year.startYear} - {year.endYear}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="p-2 px-6 bg-[#117C90] text-white rounded-md hover:bg-[#043B44] w-auto"
              disabled={gradeLoading || yearLoading}
            >
              {gradeLoading || yearLoading ? "Loading..." : "Assign Grade"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AssignGrade;
