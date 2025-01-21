import React, { useState } from "react";

function AcademicYearForm() {
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
    console.log("Form Submitted", formData);
    setFormData({
      startYear: "",
      endYear: "",
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 w-52 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
          Add Year
        </h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-10 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Start Year
              </label>
              <input
                type="number"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                className="w-full p-3 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Start Year (e.g., 2023)"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                End Year
              </label>
              <input
                type="number"
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                className="w-full p-3 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="End Year (e.g., 2024)"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-[#117C90] text-white rounded-full hover:bg-[#043B44] shadow-md"
            >
              Add Year
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AcademicYearForm;
