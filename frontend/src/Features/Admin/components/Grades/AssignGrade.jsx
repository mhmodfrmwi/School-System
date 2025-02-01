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
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">Assign Grade</h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleAssignGrade}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
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

          {/* Academic Year Dropdown */}
          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Select Academic Year
            </label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Academic Year --</option>
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
          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
              disabled={gradeLoading || yearLoading}
            >
              {gradeLoading || yearLoading ? "Loading..." : "Assign Grade"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default AssignGrade;
