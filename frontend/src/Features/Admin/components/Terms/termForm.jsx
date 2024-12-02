import React, { useState } from "react";

function TermForm() {
  const [formData, setFormData] = useState({
    startYear: "",
    endYear: "",
    term: "",
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
      term: "",
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
          Add Term
        </h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Year Selection */}
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
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter start year"
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
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter end year"
                required
              />
            </div>
          </div>

          {/* Term Selection */}
          <div className="mt-4">
            <label className="block mb-2 font-poppins text-gray-700">
              Select Term
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select term
              </option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full p-2 bg-[#117C90] text-white rounded-md hover:bg-[#043B44]"
            >
              Add Term
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TermForm;
