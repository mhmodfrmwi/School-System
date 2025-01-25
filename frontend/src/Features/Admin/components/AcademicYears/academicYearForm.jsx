import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAcademicYear } from "../AdminRedux/academicYearSlice";

function AcademicYearForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    startYear: "",
    endYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAcademicYear(formData));
    console.log("Form Submitted", formData);
    setFormData({
      startYear: "",
      endYear: "",
    });
  };

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Add Academic Year</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          {/* Start Year */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Start Year</label>
            <input
              type="number"
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Start Year (e.g., 2023)"
              required
            />
          </div>

          {/* End Year */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">End Year</label>
            <input
              type="number"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="End Year (e.g., 2024)"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
            >
              Add Year
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcademicYearForm;
