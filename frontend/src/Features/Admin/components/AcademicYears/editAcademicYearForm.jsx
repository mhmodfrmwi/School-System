import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAcademicYear } from "../AdminRedux/academicYearSlice";  
const EditAcademicYearForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const academicYears = useSelector((state) => state.academicYears.academicYears);  
  const [formData, setFormData] = useState({
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    const academicYear = academicYears.find((year) => year._id === id); 
    if (academicYear) {
      setFormData({
        startYear: academicYear.startYear,
        endYear: academicYear.endYear,
      });
    }
  }, [id, academicYears]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editAcademicYear({ id, updatedAcademicYear: formData }));
    navigate("/admin/allacademicyears"); 
  };

  return (
    <>
      <div className="w-[80%] mx-auto my-10 font-poppins">
      <h2 className="text-2xl font-semibold text-[#244856] pl-5">Edit Year</h2>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="mx-auto bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
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
      </div>
  
    
    </>
  );
  
};

export default EditAcademicYearForm;
