import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const academicYears = [
  { id: 1, year: "2022-2023", color: "#68D391" },
  { id: 2, year: "2022-2023", color: "#63B3ED" },
  { id: 3, year: "2023-2024", color: "#F6AD55" },
  { id: 4, year: "2023-2024", color: "#FC8181" },
];

function EditAcademicYearForm() {
  const { id } = useParams(); // Get the ID from the URL
  const [formData, setFormData] = useState({
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    console.log("ID: ", id); // Log the ID to the console for debugging
    const year = academicYears.find((year) => year.id === parseInt(id)); // Find the academic year by ID
    if (year) {
      setFormData({
        startYear: year.year.split("-")[0], // Extract the start year
        endYear: year.year.split("-")[1], // Extract the end year
      });
    }
  }, [id]);

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
          Edit Year
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
              Update Year
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditAcademicYearForm;
