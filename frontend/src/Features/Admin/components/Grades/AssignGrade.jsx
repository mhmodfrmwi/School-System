import React from "react";
import GradeToggle from "./SelectPage";

function AssignGrade() {

  return (
    <>
    <GradeToggle/>
      <div className="w-[80%] mx-auto">
        <h2 className="text-2xl font-poppins text-[#244856] ">
        Grade management
        </h2>
        <p className="mt-1 h-[3px] w-[80px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[250px]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form >
           {/* Term Selection */}
           <div className="mt-4">
           <label className="block mb-2 font-poppins text-gray-700">
             Select Grade
           </label>
           <select
             name="grade"
             value="select grade"
             className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
             required
           >
             <option value="" disabled>
               Select Grade
             </option>
             <option value="grade 1">Grade 1</option>
             <option value="grade 2">Grade 2</option>
           </select>
         </div>

           {/* Term Selection */}
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
             <option value="Term 1">2023/2024</option>
             <option value="Term 2">2024/2025</option>
           </select>
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

export default AssignGrade;
