import React, { useState } from "react";
import { useDispatch } from "react-redux";

function CourseForm() {
  const [formData, setFormData] = useState({
    courseName: "",
    grade: "",
    term: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
          Add Course
        </h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-poppins text-gray-700">
                Course Name
              </label>
              <input
                type="number"
                name="startYear"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter start year"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-poppins text-gray-700">
                Grade
              </label>
              <input
                type="number"
                name="endYear"
                value={formData.grade}
                onChange={handleChange}
                className="w-full rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter end year"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block font-poppins text-gray-700">
              Select Term
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select term
              </option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
            </select>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-auto rounded-md bg-[#117C90] p-2 px-6 text-white hover:bg-[#043B44]"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CourseForm;
