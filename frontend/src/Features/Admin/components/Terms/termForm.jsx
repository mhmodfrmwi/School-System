import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice";
import { postTerm } from "../AdminRedux/termSlice";

function TermForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    term: "",
    year: "",
  });

  const [semesters, setSemesters] = useState([]);

  const academicYears = useSelector(
    (state) => state.academicYears.academicYears,
  );

  useEffect(() => {
    dispatch(fetchAcademicYears());

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/admin/semester",
        );
        const data = await response.json();
        const uniqueSemesters = [
          ...new Map(
            data.semesters.map((item) => [item.semesterName, item]),
          ).values(),
        ];
        setSemesters(uniqueSemesters);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        postTerm({
          semesterName: formData.term,
          academicYear: formData.year,
        }),
      );

      setFormData({ term: "", year: "" });
    } catch (error) {
      console.error("Error creating semester:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">Add Term</h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Term Name */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Term Name
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="">Select Term</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
            </select>
          </div>

          {/* Academic Year */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Academic Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Add Term
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TermForm;
