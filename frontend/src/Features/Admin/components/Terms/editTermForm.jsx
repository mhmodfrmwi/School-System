import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice";
import { editTermAsync } from "../AdminRedux/termSlice"; // Assuming update action

function EditTermForm({ termId }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    term: "",
    year: "",
  });

  const [semesters, setSemesters] = useState([]);

  const academicYears = useSelector(
    (state) => state.academicYears.academicYears
  );

  useEffect(() => {
    dispatch(fetchAcademicYears());

    const fetchData = async () => {
      try {
        // Fetch semesters
        const response = await fetch(
          "http://localhost:4000/api/v1/admin/semester"
        );
        const data = await response.json();
        const uniqueSemesters = [
          ...new Map(
            data.semesters.map((item) => [item.semesterName, item])
          ).values(),
        ];
        setSemesters(uniqueSemesters);

        // Fetch term data to edit
        const termResponse = await fetch(
          `http://localhost:4000/api/v1/admin/term/${termId}`
        );
        const termData = await termResponse.json();

        // Pre-fill the form
        setFormData({
          term: termData.semesterName,
          year: `${termData.academicYear.startYear} - ${termData.academicYear.endYear}`,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, termId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        editTermAsync({
          termId,
          semesterName: formData.term,
          academicYear: formData.year,
        })
      );

      alert("Term updated successfully!");
    } catch (error) {
      console.error("Error updating term:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Term</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6"
        >
          {/* Term Name */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Term Name
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="">Select Term</option>
              {semesters.map((semester) => (
                <option key={semester._id} value={semester.semesterName}>
                  {semester.semesterName}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Academic Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              {academicYears && academicYears.length > 0 ? (
                academicYears.map((year) => (
                  <option
                    key={year._id}
                    value={`${year.startYear} - ${year.endYear}`}
                  >
                    {`${year.startYear} - ${year.endYear}`}
                  </option>
                ))
              ) : (
                <option disabled>No academic years available</option>
              )}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
            >
              Update Term
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTermForm;