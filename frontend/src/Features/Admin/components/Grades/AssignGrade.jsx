import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../AdminRedux/gradeSlice"; // Assuming the slice is in gradeSlice.js
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice"; // Import the fetchAcademicYears action
import GradeToggle from "./SelectPage";

function AssignGrade() {
  const dispatch = useDispatch();
  const { grade, loading: gradeLoading, error: gradeError } = useSelector((state) => state.grades);
  const { academicYears, loading: yearLoading, error: yearError } = useSelector((state) => state.academicYears); // Access academicYears state

  useEffect(() => {
    dispatch(fetchGrades());
    dispatch(fetchAcademicYears()); // Dispatch the fetchAcademicYears action to get the academic years
  }, [dispatch]);

  return (
    <>
      <GradeToggle />
      <div className="w-[80%] mx-auto">
        <h2 className="text-2xl font-poppins text-[#244856] ">
          Grade management
        </h2>
        <p className="mt-1 h-[3px] w-[80px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[250px]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form>
          {/* Grade Selection */}
          <div className="mt-4">
            <label className="block mb-2 font-poppins text-gray-700">
              Select Grade
            </label>
            <select
              name="grade"
              className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select Grade
              </option>
              {gradeLoading ? (
                <option>Loading grades...</option>
              ) : gradeError ? (
                <option>Error loading grades</option>
              ) : (
                grade.map((gradeItem) => (
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
              className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select Academic Year
              </option>
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
            >
              Add Grade
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AssignGrade;
