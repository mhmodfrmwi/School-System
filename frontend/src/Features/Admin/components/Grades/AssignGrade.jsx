import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../AdminRedux/gradeSlice"; 
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice"; 
import GradeToggle from "./SelectPage"; // Assuming this is your toggle component

function AssignGrade() {
  const dispatch = useDispatch();
  
  const { grade, loading: gradeLoading, error: gradeError } = useSelector((state) => state.grades);
  const { academicYears, loading: yearLoading, error: yearError } = useSelector((state) => state.academicYears); 

  useEffect(() => {
    dispatch(fetchGrades());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  return (
    <>
      <GradeToggle />
      <div className="w-[80%] mx-auto my-10 font-poppins">
        <h1 className="text-2xl font-semibold text-[#244856] pl-5">Grade Management</h1>
        <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
        <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
          <form>
            {/* Grade Selection */}
            <div className="mb-4 sm:col-span-2">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Select Grade
              </label>
              <select
                name="grade"
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
            <div className="mb-4 sm:col-span-2">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Select Academic Year
              </label>
              <select
                name="year"
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
              >
                Assign Grade
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AssignGrade;
