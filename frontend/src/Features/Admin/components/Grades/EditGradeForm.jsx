import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchAcademicYears, editAcademicYear } from "../AdminRedux/academicYearSlice";
import { editGradeAsync } from "../AdminRedux/gradeSlice";

const EditGradeForm = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const grades = useSelector((state) => state.grades.grade);
  const academicYears = useSelector((state) => state.academicYears.academicYears);

  const [formData, setFormData] = useState({
    gradeName: "",
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    dispatch(fetchGrades());
    dispatch(fetchAcademicYears());

    const grade = grades.find((g) => g._id === id); 
    const academicYear = academicYears.find((year) => year._id === id); 

    if (grade && academicYear) {
      setFormData({
        gradeName: grade.gradeName,
        startYear: academicYear.startYear,
        endYear: academicYear.endYear,
      });
    }
  }, [id, grades, academicYears, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editGradeAsync({
        id,
        updatedGrade: { gradeName: formData.gradeName },
      })
    );

    dispatch(
      editAcademicYear({
        id,
        updatedAcademicYear: {
          startYear: formData.startYear,
          endYear: formData.endYear,
        },
      })
    );

    navigate("/admin/allgrades");
  };

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
            {/* Grade Name */}
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
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade._id} value={grade.gradeName}>
                    {grade.gradeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Year */}
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Start Year
              </label>
              <select
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                className="w-full p-3 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="">Select Start Year</option>
                {academicYears.map((year) => (
                  <option key={year._id} value={year.startYear}>
                    {year.startYear}
                  </option>
                ))}
              </select>
            </div>

            {/* End Year */}
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                End Year
              </label>
              <select
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                className="w-full p-3 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="">Select End Year</option>
                {academicYears.map((year) => (
                  <option key={year._id} value={year.endYear}>
                    {year.endYear}
                  </option>
                ))}
              </select>
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
};

export default EditGradeForm;
