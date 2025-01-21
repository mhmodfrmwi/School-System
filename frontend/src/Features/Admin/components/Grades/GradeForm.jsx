import React from "react";
import GradeToggle from "./SelectPage";
function GradeForm() {

  return (
    <>
    <GradeToggle/>
      <div className="w-[80%] mx-auto">
        <h2 className="text-2xl font-poppins text-[#244856] ">
          Add Grade
        </h2>
        <p className="mt-1 h-[3px] w-[80px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[130px]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form >
          {/* Year Selection */}
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
              Grade Name
              </label>
              <input
                name="Grade Name"
                className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter grade nane"
                required
              />
            </div>
          
          {/* Submit Button (Smaller Width) */}
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

export default GradeForm;
