import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const grades = [
  { id: 1, year: "2022-2023", gradeName: "grade one", color: "#68D391" },
  { id: 2, year: "2022-2023", gradeName: "grade two", color: "#63B3ED" },
  { id: 3, year: "2023-2024", gradeName: "grade three", color: "#F6AD55" },
  { id: 4, year: "2023-2024", gradeName: "grade four", color: "#FC8181" },
];

function EditGradeForm() {
  const { id } = useParams(); // Get the ID from the URL
  const [formData, setFormData] = useState({
    year: "",
    gradeName: "",
    color: "",
  });

  useEffect(() => {
    const grade = grades.find((grade) => grade.id === parseInt(id)); // Find the grade by ID
    if (grade) {
      setFormData({
        year: grade.year,
        gradeName: grade.gradeName,
        color: grade.color,
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
      year: "",
      gradeName: "",
      color: "",
    });
  };

  const uniqueYears = [...new Set(grades.map((grade) => grade.year))];
  const gradeNames = grades.filter((grade) => grade.year === formData.year);

  return (
    <>
      <div className="mb-6 ms-20 w-52 md:ms-24">
        <h2 className="font-poppins text-2xl font-bold text-[#043B44]">
          Edit Grade
        </h2>
        <p className="mt-1 h-[3px] w-[130px] rounded-2xl border-b-4 border-[#043B44] "></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-10 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-3 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="" disabled>
                  Select Year
                </option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Grade Name
              </label>
              <select
                name="gradeName"
                value={formData.gradeName}
                onChange={handleChange}
                className="w-full p-3 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
                disabled={!formData.year} // Disable until a year is selected
              >
                <option value="" disabled>
                  Select Grade Name
                </option>
                {gradeNames.map((grade) => (
                  <option key={grade.id} value={grade.gradeName}>
                    {grade.gradeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Color
              </label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-3 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-[#117C90] text-white rounded-full hover:bg-[#043B44] shadow-md"
            >
              Update Grade
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditGradeForm;
