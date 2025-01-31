import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postGrade } from "../AdminRedux/gradeSlice"; 
import GradeToggle from "./SelectPage"; 

function GradeForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    gradeName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postGrade(formData))
      .unwrap()
      .then(() => {
        setFormData({ gradeName: "" });
      })
      .catch((error) => {
        // Optionally handle error here (e.g., show a toast message)
      });
  };

  return (
    <>
      <GradeToggle />
      <div className="w-[80%] mx-auto my-10 font-poppins">
        <h1 className="text-2xl font-semibold text-[#244856] pl-5">Add Grade</h1>
        <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
        <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
            {/* Grade Name */}
            <div className="mb-4 sm:col-span-2">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Enter Grade Name
              </label>
              <input
                type="text"
                name="gradeName"
                value={formData.gradeName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter grade name"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
              >
                Add Grade
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default GradeForm;
