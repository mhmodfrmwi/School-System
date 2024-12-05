import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTermToServer, postTerm } from "../AdminRedux/termSlice";
import Swal from "sweetalert2";

function TermForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    term: "",
    startYear: "",
    endYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.term || !formData.startYear || !formData.endYear) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    try {
      const response = await dispatch(
        postTerm({
          term: formData.term,
          startYear: formData.startYear,
          endYear: formData.endYear,
        })
      );

      if (response.error) {
        throw new Error(response.error.message || "Failed to post term");
      }

      // Dispatch to add the term in local Redux store
      await dispatch(
        addTermToServer(formData.term, formData.startYear, formData.endYear)
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Term added successfully!",
      });

      // Reset form data after successful submission
      setFormData({
        term: "",
        startYear: "",
        endYear: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "An error occurred while submitting the form.",
      });
    }
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-2xl font-bold text-[#043B44]">
          Add Term
        </h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Term Name */}
          <div className="mb-4">
            <label className="mb-2 block font-poppins text-gray-700">
              Term Name
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="">Select Term</option>
              <option value="term 1">Term 1</option>
              <option value="term 2">Term 2</option>
            </select>
          </div>

          {/* Start Year and End Year */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-poppins text-gray-700">
                Start Year
              </label>
              <input
                type="number"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter start year"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-poppins text-gray-700">
                End Year
              </label>
              <input
                type="number"
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter end year"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
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
