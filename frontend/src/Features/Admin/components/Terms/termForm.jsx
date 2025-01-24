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

  const academicYears = useSelector((state) => state.academicYears.academicYears); 

  useEffect(() => {
    dispatch(fetchAcademicYears());

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/admin/semester");
        const data = await response.json();
        setSemesters(data.semesters);
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
  
    const selectedYear = academicYears.find(
      (year) => `${year.startYear} - ${year.endYear}` === formData.year
    );
    console.log("Selected Year:", selectedYear);
  
    if (!selectedYear) {
      alert("Invalid academic year selected. Please try again.");
      return;
    }
  
    try {
       await dispatch(
        postTerm({
          semesterName: formData.term, // تأكد من أن هذا الحقل صحيح
          academicYear: selectedYear._id,
        })
      );
  
      alert("Semester created successfully!");
      setFormData({ term: "", year: "" });
    } catch (error) {
      console.error("Error creating semester:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  };
  
  
  
  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-2xl font-bold text-[#043B44]">Add Term</h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-poppins text-gray-700">Term Name</label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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

          <div className="mb-4">
            <label className="mb-2 block font-poppins text-gray-700">Academic Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="">Select Year</option>
              {academicYears && academicYears.length > 0 ? (
                academicYears.map((year) => (
                  <option key={year._id} value={`${year.startYear} - ${year.endYear}`}>
                    {`${year.startYear} - ${year.endYear}`}
                  </option>
                ))
              ) : (
                <option disabled>No academic years available</option>
              )}
            </select>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="mt-8 rounded-3xl bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#117C90]"
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
