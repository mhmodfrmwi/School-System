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
    setFormData({
      startYear: "",
      endYear: "",
    });
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Add Academic Year
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Start Year */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Start Year
            </label>
            <input
              type="number"
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder="Start Year (e.g., 2023)"
              required
            />
          </div>

          {/* End Year */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              End Year
            </label>
            <input
              type="number"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder="End Year (e.g., 2024)"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
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
