import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editGrade, fetchGrades } from "../AdminRedux/gradeSlice";
import { toast } from "react-toastify";
import Loader from "@/ui/Loader"; // Import the Loader component

const EditGradeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { grades, loading } = useSelector((state) => state.grades);

  const [formData, setFormData] = useState({
    gradeName: "",
  });

  // Fetch grades when the component loads
  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  // Set the form data if the grade is found
  useEffect(() => {
    const selectedGrade = grades.find((grade) => grade._id === id);
    if (selectedGrade) {
      setFormData({
        gradeName: selectedGrade.gradeName,
      });
    }
  }, [grades, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGrade = { gradeName: formData.gradeName };

    dispatch(editGrade({ id, updatedGrade }))
      .unwrap()
      .then(() => {
        toast.success("Grade updated successfully");
        navigate("/admin/allgrades");
      })
      .catch((error) => {
       
      });
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Grade</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="m-6">
          {loading ? (
            <Loader /> // Display the Loader while loading
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Grade Name
                </label>
                <input
                  type="text"
                  name="gradeName"
                  value={formData.gradeName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  placeholder="Enter grade name"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-[#117C90] text-white rounded-md text-sm font-medium hover:bg-[#0f6b7c] transition mx-auto block"
              >
                Save Changes
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditGradeForm;
